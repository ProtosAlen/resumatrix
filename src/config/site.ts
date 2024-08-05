import * as translations from '../locales/en/site.json'; // Replace with your language file path

interface TranslatedSiteConfig {
  name: string;
  description: string;
  navItems: { label: string; href: string }[];
  navMenuItems: { label: string; href: string }[];
  links: { [key: string]: string };
}

export type SiteConfig = TranslatedSiteConfig;

export const siteConfig: TranslatedSiteConfig = {
  name: translations.name,
  description: translations.description,
  navItems: translations.navItems,
  navMenuItems: translations.navMenuItems,
  links: {
    github: translations.links?.github || "https://github.com/nextui-org/nextui",
    twitter: translations.links?.twitter || "https://twitter.com/getnextui",
    docs: translations.links?.docs || "https://nextui-docs-v2.vercel.app",
    discord: translations.links?.discord || "https://discord.gg/9b6yyZKmH4",
    sponsor: translations.links?.sponsor || "https://patreon.com/jrgarciadev",
  },
};
