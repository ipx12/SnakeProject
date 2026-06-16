import { useEffect, useState } from 'react'

export function usePageScroll(sections) {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768)

  // Initialize the stack with the index matching the current URL hash, or 0
  const getInitialStack = () => {
    const hash = window.location.hash.slice(1)
    const index = sections.indexOf(hash)
    console.log("index",index, window.location)
    return index !== -1 ? [index] : [0]
  }

  const [historyStack, setHistoryStack] = useState(getInitialStack)
  const activeIndex = historyStack[historyStack.length - 1]
  console.log(historyStack)

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
      setHistoryStack((prev) => {
        const top = prev[prev.length - 1]
        const secondToTop = prev[prev.length - 2]

        if (top === index) return prev

        // If target index is the previous visited section, pop the stack
        if (secondToTop !== undefined && secondToTop === index) {
          return prev.slice(0, -1)
        }

        return [...prev, index]
      })
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

  // Sync URL hash when activeIndex changes (for desktop wheel scrolling and links)
  useEffect(() => {
    if (isDesktop && sections[activeIndex]) {
      const currentHash = window.location.hash.slice(1)
      const targetHash = sections[activeIndex]
      
      // Prevent pushing duplicate '#1' on initial mount when URL has no hash
      if (activeIndex === 0 && !currentHash) {
        return
      }

      if (currentHash !== targetHash) {
        window.history.pushState(null, '', `#${targetHash}`)
      }
    }
  }, [activeIndex, isDesktop, sections])

  // Handle URL hash changes (deep linking / back-forward navigation)
  useEffect(() => {
    const handleHashOrPopState = () => {
      const hash = window.location.hash.slice(1)
      const newIndex = sections.indexOf(hash) !== -1 ? sections.indexOf(hash) : 0

      setHistoryStack((prev) => {
        const top = prev[prev.length - 1]
        const secondToTop = prev[prev.length - 2]

        if (newIndex === top) {
          return prev
        }

        // If the new index matches the previous entry, it was a Back navigation
        if (secondToTop !== undefined && newIndex === secondToTop) {
          return prev.slice(0, -1)
        }

        // Otherwise, it's a Forward navigation or direct hash change, push to stack
        return [...prev, newIndex]
      })
    }

    window.addEventListener('hashchange', handleHashOrPopState)
    window.addEventListener('popstate', handleHashOrPopState)

    return () => {
      window.removeEventListener('hashchange', handleHashOrPopState)
      window.removeEventListener('popstate', handleHashOrPopState)
    }
  }, [sections])

  // Handle mobile scroll sync on activeIndex change
  useEffect(() => {
    if (!isDesktop && sections[activeIndex]) {
      const hash = sections[activeIndex]
      document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [activeIndex, isDesktop, sections])

  // Global anchor click interceptor to support standard HTML links automatically
  useEffect(() => {
    const handleDocumentClick = (e) => {
      const anchor = e.target.closest('a')
      if (!anchor) return

      const href = anchor.getAttribute('href')
      if (href && href.startsWith('#')) {
        const targetId = href.slice(1)
        if (sections.includes(targetId)) {
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
      }
    }

    document.addEventListener('click', handleDocumentClick)
    return () => document.removeEventListener('click', handleDocumentClick)
  }, [isDesktop, sections])

  // Lock scroll and intercept wheel scroll events on desktop
  useEffect(() => {
    if (!isDesktop) return

    let lastTime = 0
    const throttleDelay = 800 // 800ms between transitions (matches CSS transition duration)

    const handleWheel = (e) => {
      e.preventDefault()

      const now = Date.now()
      if (now - lastTime < throttleDelay) return
      lastTime = now

      if (e.deltaY > 0) {
        // Scroll down
        setHistoryStack((prev) => {
          const current = prev[prev.length - 1]
          const next = Math.min(current + 1, sections.length - 1)
          if (current === next) return prev

          const secondToTop = prev[prev.length - 2]
          if (secondToTop !== undefined && secondToTop === next) {
            return prev.slice(0, -1)
          }
          return [...prev, next]
        })
      } else if (e.deltaY < 0) {
        // Scroll up
        setHistoryStack((prev) => {
          const current = prev[prev.length - 1]
          const next = Math.max(current - 1, 0)
          if (current === next) return prev

          const secondToTop = prev[prev.length - 2]
          if (secondToTop !== undefined && secondToTop === next) {
            return prev.slice(0, -1)
          }
          return [...prev, next]
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
