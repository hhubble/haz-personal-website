import { mkdirSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawnSync } from "node:child_process";

const baseDir = join(tmpdir(), "haz-website-vercel");
const env = {
  ...process.env,
  XDG_CONFIG_HOME: process.env.XDG_CONFIG_HOME ?? join(baseDir, "config"),
  XDG_CACHE_HOME: process.env.XDG_CACHE_HOME ?? join(baseDir, "cache"),
  XDG_DATA_HOME: process.env.XDG_DATA_HOME ?? join(baseDir, "data"),
};

mkdirSync(env.XDG_CONFIG_HOME, { recursive: true });
mkdirSync(env.XDG_CACHE_HOME, { recursive: true });
mkdirSync(env.XDG_DATA_HOME, { recursive: true });

const result = spawnSync("next-on-pages", [], {
  cwd: process.cwd(),
  env,
  stdio: "inherit",
});

if (result.status !== 0) {
  process.exit(result.status ?? 1);
}
