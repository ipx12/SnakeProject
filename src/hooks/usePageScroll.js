import { useEffect, useState } from 'react'

export function usePageScroll(sections) {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768)
  const [activeIndex, setActiveIndex] = useState(0)

  // Track desktop layout state based on window width
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Function to navigate to a section by its ID
  const scrollToSection = (id) => {
    const index = sections.indexOf(id)
    if (index !== -1) {
      setActiveIndex(index)
      // Update the URL hash without triggering hashchange
      window.history.pushState(null, '', `#${id}`)
    }
  }

  // Intercept anchor link clicks to custom navigate on both desktop and mobile
  const handleLinkClick = (e, targetId) => {
    e.preventDefault()
    if (isDesktop) {
      scrollToSection(targetId)
    } else {
      const element = document.getElementById(targetId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
        window.history.pushState(null, '', `#${targetId}`)
      }
    }
  }

  // Handle URL hash changes (deep linking / back-forward navigation)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1)
      if (hash) {
        const index = sections.indexOf(hash)
        if (index !== -1) {
          setActiveIndex(index)
          if (!isDesktop) {
            // On mobile, ensure we scroll to the element
            setTimeout(() => {
              document.getElementById(hash)?.scrollIntoView({ behavior: 'auto' })
            }, 50)
          }
        }
      } else {
        setActiveIndex(0)
        if (!isDesktop && sections.length > 0) {
          setTimeout(() => {
            document.getElementById(sections[0])?.scrollIntoView({ behavior: 'auto' })
          }, 50)
        }
      }
    }

    window.addEventListener('hashchange', handleHashChange)
    // Run on mount to check if page loaded with a hash
    handleHashChange()

    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [isDesktop, sections])

  // Lock scroll and intercept wheel scroll events on desktop
  useEffect(() => {
    if (!isDesktop) return

    let lastTime = 0
    const throttleDelay = 500 // 500ms between transitions

    const handleWheel = (e) => {
      e.preventDefault()

      const now = Date.now()
      if (now - lastTime < throttleDelay) return
      lastTime = now

      if (e.deltaY > 0) {
        // Scroll down
        setActiveIndex((prev) => {
          const next = Math.min(prev + 1, sections.length - 1)
          const nextId = sections[next]
          window.history.pushState(null, '', `#${nextId}`)
          return next
        })
      } else if (e.deltaY < 0) {
        // Scroll up
        setActiveIndex((prev) => {
          const next = Math.max(prev - 1, 0)
          const nextId = sections[next]
          window.history.pushState(null, '', `#${nextId}`)
          return next
        })
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    return () => window.removeEventListener('wheel', handleWheel)
  }, [isDesktop, sections])

  return {
    isDesktop,
    activeIndex,
    scrollToSection,
    handleLinkClick,
  }
}
