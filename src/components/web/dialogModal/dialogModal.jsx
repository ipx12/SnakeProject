import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { XIcon } from 'lucide-react'

export function DialogModal({
  className,
  children,
  openButton,
  ...props
}) {
  return (
    <Dialog {...props}>
      <DialogTrigger asChild>
        {openButton}
      </DialogTrigger>
      <DialogContent
        className={cn(
          'sm:max-w-[540px] p-6 sm:p-8',
          className,
        )}
        showCloseButton={false}
      >
        <DialogTitle>
          <p className="sr-only">
            Form dialog
          </p>
        </DialogTitle>

        {children}
        <DialogClose asChild>
          <Button
            variant="ghost"
            className="absolute top-3 right-3 hover:bg-transparent hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer"
            size="icon-sm"
          >
            <XIcon
              className="size-5 text-[#a855f7] transition-colors"
              strokeWidth={4.5}
              strokeLinecap="square"
            />
            <span className="sr-only">
              Close
            </span>
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  )
}
