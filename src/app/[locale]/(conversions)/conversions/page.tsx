import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { useTranslations } from 'next-intl'
import React, { type FC } from 'react'
import { getConversionsTools } from "@/utils/conversionsSelection";


type ConversionsToolsProps = {
  params: {
    locale: string
  }
}
const ConversionsTools: FC<ConversionsToolsProps> = () => {
  const t = useTranslations('ConversionsTools');

  const ConversionsTools = getConversionsTools(t);

  return (
    <section className="w-full py-24 md:py-32 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-6 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">{t('ourServices')}</h1>
            <h1 className="max-w-[700px] text-muted-foreground md:text-sm/relaxed">
              {t('learnMore')}
            </h1>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {ConversionsTools.map((service: any, index: any) => (
              <Link key={index} href={service.link}>
                <Card className="h-full w-full max-w-[250px] block hover:bg-primary/10">
                  <CardContent className="flex flex-row items-center justify-between gap-4 p-4">
                    <div className="space-y-2 text-left">
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
  )
}
export default ConversionsTools