import { MoveUp } from 'lucide-react'

function Footer() {
  return (
    <>
      <div className="absolute hidden bottom-0 w-full lg:flex justify-end font-bold text-yellow-main text-md xl:text-xl font-halvar uppercase pb-5 z-30">
        <div className="w-2/5 text-right flex gap-6  items-center">
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors duration-200 underline decoration-1 underline-offset-4"
          >
            Instagram
          </a>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors duration-200 underline decoration-1 underline-offset-4"
          >
            telegram
          </a>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors duration-200 underline decoration-1 underline-offset-4"
          >
            linkedIn
          </a>
        </div>
        <div className="w-1/5 text-right flex justify-end items-center">
          <a
            href="#1"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors duration-200 underline decoration-1 underline-offset-4 flex items-center gap-2"
          >
            scroll to top <MoveUp />
          </a>
        </div>
      </div>
      <div className="absolute bottom-0 w-full flex justify-center text-yellow-main text-xl font-bold lg:hidden font-halvar uppercase pb-5 z-30">
        MULTIPLY WITH US
      </div>
    </>
  )
}

export default Footer
