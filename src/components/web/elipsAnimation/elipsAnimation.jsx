import { cn } from '@lib/utils'
import './elipsAnimation.css'

const ElipsAnimation = ({
  children,
  className,
  contentClassName,
}) => {
  return (
    <div
      className={cn(
        'elipsAnimation__container-start relative isolate z-0 flex h-full w-full',
        className,
      )}
    >
      <span
        className="elipsAnimation__elips pointer-events-none absolute inset-0 opacity-20 mix-blend-screen"
        aria-hidden="true"
      />
      <span
        className="elipsAnimation__elips-mobile pointer-events-none absolute inset-0 opacity-20 mix-blend-screen"
        aria-hidden="true"
      />

      <div
        className={cn(
          'elipsAnimation__container-end relative z-[1] flex w-full items-center',
          contentClassName,
        )}
      >
        {children}
      </div>
    </div>
  )
}

export default ElipsAnimation
