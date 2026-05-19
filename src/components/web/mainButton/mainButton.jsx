import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import "./mainButton.css"

const MainButton = ({ className, ...props }) => {
    return (
        <Button className={cn('btn-3d px-8 py-4 rounded-none uppercase', className)} {...props} />


        // If we use tailwindcss only without css file
        // <Button
        //     className={cn(
        //         "group relative overflow-visible rounded-none font-bold tracking-[0.1em] uppercase transition-colors duration-200 cursor-pointer",
        //         "bg-[var(--color-yellow-main)] text-black border-2 border-black",
        //         "hover:bg-black hover:text-[var(--color-yellow-main)] hover:border-[var(--color-yellow-main)]",
        //         "px-8 py-4 mt-[10px] mr-[10px]",
        //         className
        //     )}
        //     {...props}
        // >
        //     {/* Top Face */}
        //     <span className={cn(
        //         "absolute -top-[12px] -left-[2px] w-[calc(100%+4px)] h-[10px]",
        //         "bg-[var(--color-yellow-main)] border-2 border-black border-b-0",
        //         "-skew-x-[45deg] origin-bottom",
        //         "transition-colors duration-200",
        //         "group-hover:bg-black group-hover:border-[var(--color-yellow-main)] pointer-events-none"
        //     )} />
            
        //     {/* Right Face */}
        //     <span className={cn(
        //         "absolute -top-[2px] -right-[12px] w-[10px] h-[calc(100%+4px)]",
        //         "bg-[var(--color-yellow-main)] border-2 border-black border-l-0",
        //         "-skew-y-[45deg] origin-left",
        //         "transition-colors duration-200",
        //         "group-hover:bg-black group-hover:border-[var(--color-yellow-main)] pointer-events-none"
        //     )} />

        //     <span className="relative z-10">{props.children}</span>
        // </Button>
        
    )
}

export default MainButton