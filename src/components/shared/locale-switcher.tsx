'use client'

import * as React from "react"
import { ChevronsUpDown } from "lucide-react"
import { usePathname, useRouter } from "@/lib/i18nNavigation"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Button } from "../ui/button"
import { useTranslations } from "next-intl"

export default function LocaleSwitcher() {
  const t = useTranslations('Components');

  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("en")
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (newLocale: string) => {
    const currentPath = pathname || "/"; // Geçerli yol mevcut değilse kök yolu kullan
    router.push(currentPath, { locale: newLocale }); // Yolu ve yeni dili ayarlıyoruz
    router.refresh(); // Sayfayı yeniliyoruz
    setValue(newLocale); // Seçilen dilin güncellenmesi
    setOpen(false); // Popover'ı kapat
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
          {localeOptions.find((localeOption) => localeOption.value === value)?.label || "Türkçe"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[180px] p-2">
        <ul className="space-y-1">
          {localeOptions.map((localeOption) => (
            <li
              key={localeOption.value}
              onClick={() => handleChange(localeOption.value)}
              className="cursor-pointer px-2 py-1 hover:bg-gray-100 rounded-md"
            >
              {localeOption.label}
            </li>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  )
}
