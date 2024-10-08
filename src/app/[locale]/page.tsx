import FooterSection from '@/components/shared/footer-section'
import HeroSection from '@/components/shared/hero-section'
import { Spinner } from '@/components/ui/spinner'
import React, { Suspense, type FC } from 'react'


type HomePageProps = {
  params: {
    locale: string
  }
}
const HomePage: FC<HomePageProps> = () => {
  return (
    <div>
      <Suspense fallback={<Spinner />}>
        <HeroSection />
      </Suspense>
      <Suspense fallback={<Spinner />}>
        <FooterSection />
      </Suspense>
    </div>
  )
}
export default HomePage