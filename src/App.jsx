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

const SECTIONS = ['1', '2', '3', '4']

function App() {
  const { isDesktop, activeIndex, handleLinkClick } = usePageScroll(SECTIONS)

  return (
    <main className={isDesktop ? 'h-screen w-full overflow-hidden relative' : ''}>
      <div
        className={isDesktop ? 'w-full h-full' : ''}
        style={
          isDesktop
            ? {
                transform: `translateY(-${activeIndex * 100}vh)`,
              }
            : {}
        }
      >
        <FirstSection />
        <SecondSection />
        <LastSection />
        {/* <section id='1' className='h-screen bg-red-500'>
          <h1 className='text-9xl'>First Section</h1>
          <a href="#2" onClick={(e) => handleLinkClick(e, '2')}>Second Section</a>
        </section>
        <section id='2' className='h-screen bg-green-500'>
          <h1 className='text-9xl'>Second Section</h1>
          <a href="#3" onClick={(e) => handleLinkClick(e, '3')}>Third Section</a>
        </section>
        <section id='3' className='h-screen bg-blue-500'>
          <h1 className='text-9xl'>Third Section</h1>
          <a href="#4" onClick={(e) => handleLinkClick(e, '4')}>Fourth Section</a>
        </section>
        <section id='4' className='h-screen bg-purple-500'>
          <h1 className='text-9xl'>Fourth Section</h1>
          <a href="#1" onClick={(e) => handleLinkClick(e, '1')}>First Section</a>
        </section> */}
      </div>
    </main>
  )
}

export default App
