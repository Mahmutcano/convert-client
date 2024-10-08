'use client'

import * as React from "react"
import { ChevronsUpDown } from "lucide-react"
import { usePathname, useRouter } from "@/lib/i18nNavigation"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Button } from "../ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../ui/command"
import { useTranslations } from "next-intl"

export default function LocaleSwitcher() {
  const t = useTranslations('Components');

  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("en")
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (newLocale: string) => {
    router.push(pathname, { locale: newLocale });
    router.refresh();
    setValue(newLocale); // Seçilen dilin güncellenmesi
  };

  const localeOptions = [
    { value: 'en', label: t("english") },
    { value: 'tr', label: t("turkish") }
  ];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[180px] justify-between cursor-pointer"
        >
          {value
            ? localeOptions.find((localeOption) => localeOption.value === value)?.label
            : "Türkçe"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[180px] p-0">
        <Command>
          <CommandInput placeholder={t('search_language')} />
          <CommandList>
            <CommandEmpty>{t('not_language')}</CommandEmpty>
            <CommandGroup>
              {localeOptions.map((localeOption) => (
                <CommandItem
                  key={localeOption.value}
                  value={localeOption.value}
                  onSelect={() => {
                    handleChange(localeOption.value);
                    setOpen(false);
                  }}
                  className="cursor-pointer"
                >
                  {localeOption.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
