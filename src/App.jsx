import {
  useEffect,
  useState,
} from 'react'
import { submitContactForm } from './api'
import i18n from './i18n'
import { LastSection } from '@/components/sections/lastSection/LastSection'
import { getBenefits } from './api'

import { usePageScroll } from '@/hooks/usePageScroll'
import { SecondSection } from './components/sections/secondSection/SecondSection'
import { FirstSection } from './components/sections/firstSection/FirstSection'

const SECTIONS = [
  'home',
  'about',
  'benefits',
  'join',
]

function App() {
  const { isDesktop, activeIndex } =
    usePageScroll(SECTIONS)

  return (
    <main
      className={
        isDesktop
          ? 'h-screen w-full overflow-hidden relative'
          : ''
      }
    >
      <div
        className={
          isDesktop
            ? 'w-full h-full'
            : ''
        }
        style={
          isDesktop
            ? {
                transform: `translateY(-${activeIndex * 100}vh)`,
                transition:
                  'transform 0.8s cubic-bezier(0.25, 1, 0.5, 1)',
              }
            : {}
        }
      >
        <FirstSection />
        <SecondSection />
        <section
          id="benefits"
          className="h-screen w-full bg-green-500"
        >
          <h1 className="text-9xl">
            Third Section
          </h1>
          <a href="#join">join</a>
        </section>
        <LastSection />
      </div>
    </main>
  )
}

export default App
