import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Marquee from '@/components/Marquee'
import WorkSection from '@/components/WorkSection'
import WhatAreYouLookingFor from '@/components/WhatAreYouLookingFor'
import ReposSection from '@/components/ReposSection'
import ContactSection from '@/components/ContactSection'
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
        <Marquee id="after-hero" className="hero-next" />
        <RevealOnScroll direction="up">
          <WorkSection />
        </RevealOnScroll>
        <RevealOnScroll direction="up">
          <WhatAreYouLookingFor />
        </RevealOnScroll>
        <Marquee />
        <RevealOnScroll direction="up">
          <ReposSection />
        </RevealOnScroll>
        <RevealOnScroll direction="up">
          <ContactSection />
        </RevealOnScroll>
      </main>
      <Footer />
    </>
  )
}
