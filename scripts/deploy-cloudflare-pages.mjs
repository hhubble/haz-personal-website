import { spawnSync } from "node:child_process";

const projectName = process.env.CLOUDFLARE_PAGES_PROJECT || "haz-personal-website";
const branch = process.env.CLOUDFLARE_PAGES_BRANCH || "main";
const productionBranch = process.env.CLOUDFLARE_PAGES_PRODUCTION_BRANCH || "main";
const outputDir = ".vercel/output/static";
const defaultSecretIds = [
  "whatsapp-use/shared/cloudflare-workers",
  "pally/shared/cloudflare-dns",
  "whatsapp-use/shared/cloudflare-dns",
];

const secretIds = process.env.CLOUDFLARE_SECRET_ID
  ? [process.env.CLOUDFLARE_SECRET_ID]
  : defaultSecretIds;

function run(command, args, options = {}) {
  const result = spawnSync(command, args, {
    cwd: process.cwd(),
    env: options.env ?? process.env,
    encoding: "utf8",
    stdio: options.capture ? "pipe" : "inherit",
  });

  if (options.allowFailure) {
    return result;
  }

  if (result.status !== 0) {
    const stderr = result.stderr ? `\n${result.stderr}` : "";
    throw new Error(`${command} ${args.join(" ")} failed.${stderr}`);
  }

  return result;
}

function readSecret(secretId) {
  const result = run(
    "aws",
    [
      "--region",
      process.env.AWS_REGION ?? "us-east-1",
      "secretsmanager",
      "get-secret-value",
      "--secret-id",
      secretId,
      "--query",
      "SecretString",
      "--output",
      "text",
    ],
    { capture: true, allowFailure: true },
  );

  if (result.status !== 0 || !result.stdout.trim()) {
    return null;
  }

  return result.stdout.trim();
}

function parseSecret(secretString) {
  try {
    return JSON.parse(secretString);
  } catch {
    return { token: secretString };
  }
}

function firstString(record, keys) {
  for (const key of keys) {
    const value = record[key];
    if (typeof value === "string" && value.trim()) {
      return value.trim();
    }
  }

  return null;
}

function getCloudflareCredentials() {
  const tokenKeys = [
    "CLOUDFLARE_API_TOKEN",
    "cloudflareApiToken",
    "apiToken",
    "api_token",
    "token",
    "CLOUDFLARE_API_KEY",
    "apiKey",
    "api_key",
  ];
  const accountKeys = [
    "CLOUDFLARE_ACCOUNT_ID",
    "cloudflareAccountId",
    "accountId",
    "account_id",
  ];

  for (const secretId of secretIds) {
    const secretString = readSecret(secretId);

    if (!secretString) {
      continue;
    }

    const parsed = parseSecret(secretString);
    const token = firstString(parsed, tokenKeys);

    if (token) {
      return {
        secretId,
        token,
        accountId: firstString(parsed, accountKeys),
      };
    }
  }

  throw new Error(
    `No Cloudflare API token field found in candidate secrets: ${secretIds.join(", ")}`,
  );
}

function main() {
  const credentials = getCloudflareCredentials();
  const env = {
    ...process.env,
    CLOUDFLARE_API_TOKEN: credentials.token,
  };

  if (credentials.accountId) {
    env.CLOUDFLARE_ACCOUNT_ID = credentials.accountId;
  }

  console.log(`Using Cloudflare token from AWS secret: ${credentials.secretId}`);
  console.log(`Building Cloudflare Pages output for ${projectName}...`);
  run("npm", ["run", "pages:build"], { env });

  console.log(`Ensuring Cloudflare Pages project exists: ${projectName}`);
  const createResult = run(
    "npx",
    [
      "wrangler",
      "pages",
      "project",
      "create",
      projectName,
      "--production-branch",
      productionBranch,
    ],
    { env, capture: true, allowFailure: true },
  );

  if (createResult.status !== 0) {
    const combinedOutput = `${createResult.stdout}\n${createResult.stderr}`;
    if (!/already exists|project.*exists/i.test(combinedOutput)) {
      process.stdout.write(createResult.stdout);
      process.stderr.write(createResult.stderr);
      throw new Error("Failed to create or confirm Cloudflare Pages project.");
    }
  }

  console.log(`Deploying ${outputDir} to Cloudflare Pages branch ${branch}...`);
  run(
    "npx",
    [
      "wrangler",
      "pages",
      "deploy",
      outputDir,
      "--project-name",
      projectName,
      "--branch",
      branch,
    ],
    { env },
  );
}

main();
