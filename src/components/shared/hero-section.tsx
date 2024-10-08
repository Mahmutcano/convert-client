// HeroSection.js
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { useTranslations } from 'next-intl';
import { getServices } from "@/utils/heroSelection";

export default function HeroSection() {
  const t = useTranslations('Hero');

  const services = getServices(t);

  return (
    <section className="w-full py-24 md:py-24 lg:py-32">
      <div className="container px-10 md:px-12">
        <div className="flex flex-col items-center justify-center space-y-6 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">{t('ourServices')}</h1>
            <h1 className="max-w-[700px] text-muted-foreground md:text-sm/relaxed">
              {t('learnMore')}
            </h1>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {services.map((service: any, index: any) => (
              <Link key={index} href={service.link}>
                <Card className="h-full w-full max-w-[250px] block hover:bg-primary/10">
                  <CardContent className="flex flex-row items-center justify-between gap-4 p-4">
                    <div className="space-y-2 text-left">
                      <service.icon className="h-4 w-4 text-primary" />
                      <h3 className="text-lg font-semibold">{service.title}</h3>
                      <p className="text-muted-foreground text-sm">{service.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
      
    </section>
  );
}
