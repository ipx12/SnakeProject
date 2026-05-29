import {
  useEffect,
  useState,
} from 'react'
import { submitContactForm } from './api'
import i18n from './i18n'
import { LastSection } from '@/components/sections/lastSection/LastSection'

function App() {
  return (
    <main className="h-screen">
      <LastSection />
    </main>
  )
}

export default App
