import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Marquee from '@/components/Marquee'
import WorkSection from '@/components/WorkSection'
import WhatAreYouLookingFor from '@/components/WhatAreYouLookingFor'
import ReposSection from '@/components/ReposSection'
import Footer from '@/components/Footer'
import RevealOnScroll from '@/components/RevealOnScroll'

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <RevealOnScroll direction="up">
          <Hero />
        </RevealOnScroll>
        <Marquee />
        <RevealOnScroll direction="up">
          <WorkSection />
        </RevealOnScroll>
        <Marquee />
        <RevealOnScroll direction="up">
          <WhatAreYouLookingFor />
        </RevealOnScroll>
        <RevealOnScroll direction="up">
          <ReposSection />
        </RevealOnScroll>
      </main>
      <Footer />
    </>
  )
}
