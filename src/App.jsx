import snakeImg from './assets/images/firstSnake.png'
import './App.css'
import { Button } from './components/ui/button'
import { Camera, FolderClosed } from 'lucide-react'
function App() {
  return (
    <>
      <div className="h-screen w-full bg-gray-500 button-box flex flex-col items-center justify-center gap-2">
        <div>
          <img src={snakeImg} className="" width="170" height="179" alt="" />
        </div>
        <Button size="lg" className='bg-red-600' variant="primary">Button</Button>
        <Button size="sm" className='bg-green-600' variant="secondary">Button</Button>
        <Button size="md" className='bg-blue-600' variant="outline">Button</Button>
        <Button size="xs" className='bg-yellow-600' variant="ghost">Button</Button>
        <Button size="lg" className='bg-purple-600' variant="destructive"><FolderClosed /> Button</Button>
        <Button size="lg" className='bg-pink-600' variant="link"><Camera /> Button</Button>
      </div>
    </>
  )
}

export default App
