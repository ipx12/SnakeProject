import { Dialog, DialogClose, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { XIcon } from "lucide-react"

export function DialogModal({ className, children, openButton, ...props }) {
  return (
    <Dialog className={cn('px-8 py-4 ', className)} {...props}>
        <DialogTrigger asChild>
          {openButton}
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm" showCloseButton={false}>
            {children}
            <DialogClose asChild>
              <Button variant="ghost" className="absolute top-3 right-3 hover:bg-transparent hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer" size="icon-sm">
                <XIcon className="size-5 text-[#a855f7] transition-colors" strokeWidth={4.5} strokeLinecap="square" />
                <span className="sr-only">Close</span>
              </Button>
            </DialogClose>
        </DialogContent>
    </Dialog>
  )
}

