export const siteMetadata = {
  name: "Harry \"Haz\" Hubble",
  title: "Harry \"Haz\" Hubble | The Diary",
  // TODO: Replace with final public metadata description.
  description:
    "[PLACEHOLDER COPY] Personal website for Harry \"Haz\" Hubble, co-founder and CEO of Pally.",
  // TODO: Replace with the production domain before launch.
  url: "https://haz.example.com",
  // TODO: Replace with a real Open Graph image.
  image: "/og-placeholder.svg",
  imageAlt: "[PLACEHOLDER COPY] Portrait placeholder for Harry \"Haz\" Hubble.",
};

export const navigation = [
  { href: "/entries", label: "entries" },
  { href: "/work", label: "work" },
  { href: "/about", label: "about" },
];

export const socials = [
  // TODO: Replace placeholder social URLs with verified public profiles.
  { label: "X", href: "https://x.com/placeholder" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/placeholder" },
  { label: "GitHub", href: "https://github.com/placeholder" },
];

export const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  // TODO: Confirm preferred public display name.
  name: "Harry \"Haz\" Hubble",
  // TODO: Confirm exact public title.
  jobTitle: "Co-founder and CEO",
  worksFor: {
    "@type": "Organization",
    // TODO: Confirm official organization name and URL.
    name: "Pally",
    url: "https://pally.com",
  },
  // TODO: Replace all placeholder URLs with verified public profile URLs.
  sameAs: [
    "https://www.linkedin.com/in/placeholder",
    "https://x.com/placeholder",
    "https://github.com/placeholder",
    "https://www.crunchbase.com/person/placeholder",
  ],
  url: siteMetadata.url,
  image: `${siteMetadata.url}${siteMetadata.image}`,
};
