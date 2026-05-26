import { Dialog, DialogClose, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export function DialogModal({ className, children, openButton, ...props }) {
  return (
    <Dialog>
        <DialogTrigger asChild>
          {openButton}
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm">
            {/* <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose> */}
            {children}
        </DialogContent>
    </Dialog>
  )
}
