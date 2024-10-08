import { FacebookIcon, InstagramIcon, LinkedinIcon, MailIcon, MapPinIcon, PhoneIcon, TwitterIcon } from 'lucide-react';
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React from 'react';
import { useTranslations } from 'next-intl';
import { getServices } from '@/utils/heroSelection';

type Props = {};

const FooterSection = (props: Props) => {
  const t = useTranslations('Footer');

  return (
    <footer className="bg-muted w-full py-12 lg:py-24">
      <div className="container max-w-7xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        <div className="grid gap-4">
          <Link href="#" className="flex items-center gap-2" prefetch={false}>
            <span className="font-semibold text-xl tracking-tight">{t('company_name')}</span>
          </Link>
          <p className="text-muted-foreground">{t('tagline')}</p>
          <div className="flex gap-4">
            <Link href="#" className="text-muted-foreground hover:text-primary" prefetch={false}>
              <TwitterIcon className="h-6 w-6" />
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary" prefetch={false}>
              <FacebookIcon className="h-6 w-6" />
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary" prefetch={false}>
              <InstagramIcon className="h-6 w-6" />
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary" prefetch={false}>
              <LinkedinIcon className="h-6 w-6" />
            </Link>
          </div>
        </div>

        <div className="grid gap-2">
          <h4 className="font-semibold">{t('navigation')}</h4>
          <nav className="grid gap-1">
            {getServices(t).map((service: any) => (
              <Link key={service.link} href={service.link} className="text-muted-foreground hover:text-primary" prefetch={false}>
                {service.title}
              </Link>
            ))}
          </nav>
        </div>

        <div className="grid gap-2">
          <h4 className="font-semibold">{t('contact')}</h4>
          <div className="grid gap-1 text-muted-foreground">
            <div className="flex items-center gap-2">
              <MapPinIcon className="h-5 w-5" />
              <span>Ankara, Çankaya, Oran Mahallesi</span>
            </div>
            <div className="flex items-center gap-2">
              <PhoneIcon className="h-5 w-5" />
              <span>+905384439701</span>
            </div>
            <div className="flex items-center gap-2">
              <MailIcon className="h-5 w-5" />
              <span>ozgancan9@gmail.com</span>
            </div>
          </div>
        </div>

        <div className="grid gap-2">
          <h4 className="font-semibold">{t('subscribe')}</h4>
          <p className="text-muted-foreground">{t('subscribe_description')}</p>
          <form className="flex gap-2">
            <Input type="email" placeholder={t('email_placeholder')} className="flex-1" />
            <Button type="submit">{t('subscribe_button')}</Button>
          </form>
        </div>
      </div>

      <div className="container max-w-7xl mt-8 pt-8 border-t border-muted-foreground/20 flex justify-between items-center text-sm text-muted-foreground">
        <p>&copy; 2024 {t('company_name')}. {t('rights_reserved')}</p>
        <nav className="flex gap-4">
          <Link href="/privacy-policy" className="hover:text-primary" prefetch={false}>
            {t('privacy_policy')}
          </Link>
          <Link href="/terms-of-service" className="hover:text-primary" prefetch={false}>
            {t('terms_of_service')}
          </Link>
          <Link href="/sitemap" className="hover:text-primary" prefetch={false}>
            Sitemap
          </Link>
        </nav>
      </div>
    </footer>
  );
};

export default FooterSection;
