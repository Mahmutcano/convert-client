import { deDE, enUS } from "@clerk/localizations";

export const localizations: {
    en: typeof enUS;
    de: typeof deDE;
  } = {
    en: enUS,
    de: deDE,
  };
  

export type SupportedLocale = keyof typeof localizations;