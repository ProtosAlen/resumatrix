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
    github: "https://github.com/ProtosAlen/resumatrix",
    twitter: "",
    docs: "",
    discord: "",
    sponsor: "",
  },
};
