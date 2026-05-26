import snakeImg from './assets/images/firstSnake.png'
import './App.css'
import { Button } from './components/ui/button'
import { Camera, FolderClosed } from 'lucide-react'
import { DialogModal } from './components/web/dialogModal/dialogModal'
import MainButton from './components/web/mainButton/mainButton'
function App() {
  return (
    <>
      <main className="h-screen">
        <DialogModal openButton={<MainButton>dsd</MainButton>}>
          <h1>hello world</h1>
        </DialogModal>
      </main>
    </>
  )
}

export default App