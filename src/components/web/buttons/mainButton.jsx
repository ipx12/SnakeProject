import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const MainButton = ({ className, ...props }) => {
    return (
        <Button className={cn('btn-3d px-8 py-4 rounded-none', className)} {...props} />
    )
}

export default MainButton