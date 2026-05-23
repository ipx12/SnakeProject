import snakeImg from './assets/images/firstSnake.png'
import './App.css'
import { Button } from './components/ui/button'
import { Camera, FolderClosed } from 'lucide-react'
import { LastSection } from './components/sections/lastSection/LastSection'
function App() {
  return (
    <>
      <main className="h-screen">
        <LastSection />
      </main>
    </>
  )
}

export default App