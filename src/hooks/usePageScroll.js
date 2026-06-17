import { useEffect, useState, useCallback, useRef } from 'react'

/**
 * Custom hook to handle full-page scrolling and navigation between sections.
 * Supports desktop wheel scrolling (simulated container translate) and mobile native scrolling.
 * Syncs active section index with URL hashes and browser Back/Forward navigation.
 * 
 * @param {string[]} sections - Array of section IDs (e.g., ['home', 'about', 'benefits', 'join'])
 * @returns {object} Hook utilities: { isDesktop, activeIndex, scrollToSection }
 */
export function usePageScroll(sections) {
  // Use matchMedia for high-performance responsive state tracking (only triggers on threshold crossing)
  const [isDesktop, setIsDesktop] = useState(() => window.matchMedia('(min-width: 768px)').matches)

  // Determine initial index from URL hash or fallback to 0 (using lazy state initialization)
  const [activeIndex, setActiveIndex] = useState(() => {
    const hash = window.location.hash.slice(1)
    const index = sections.indexOf(hash)
    return index !== -1 ? index : 0
  })

  // Keep configuration and states in refs to keep event listener dependency arrays stable
  const sectionsRef = useRef(sections)
  const activeIndexRef = useRef(activeIndex)
  const isDesktopRef = useRef(isDesktop)

  useEffect(() => {
    sectionsRef.current = sections
    activeIndexRef.current = activeIndex
    isDesktopRef.current = isDesktop
  }, [sections, activeIndex, isDesktop])

  // Track layout state using matchMedia listener (better performance than resize event)
  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 768px)')
    const handleChange = (e) => setIsDesktop(e.matches)
    
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  // Programmatically scroll/navigate to a section by its ID
  const scrollToSection = useCallback((id) => {
    const index = sectionsRef.current.indexOf(id)
    if (index !== -1) {
      setActiveIndex(index)
    }
  }, [])

  // Sync URL hash when activeIndex changes
  useEffect(() => {
    const targetHash = sectionsRef.current[activeIndex]
    if (!targetHash) return

    const currentHash = window.location.hash.slice(1)
    if (currentHash !== targetHash) {
      // Avoid pushing a duplicate on initial mount when URL has no hash
      if (activeIndex === 0 && !currentHash) return
      
      window.history.pushState(null, '', `#${targetHash}`)
    }
  }, [activeIndex])

  // Handle URL hash changes (deep linking / browser Back & Forward navigation)
  useEffect(() => {
    const handleHashOrPopState = () => {
      const hash = window.location.hash.slice(1)
      const index = sectionsRef.current.indexOf(hash)
      setActiveIndex(index !== -1 ? index : 0)
    }

    window.addEventListener('hashchange', handleHashOrPopState)
    window.addEventListener('popstate', handleHashOrPopState)

    return () => {
      window.removeEventListener('hashchange', handleHashOrPopState)
      window.removeEventListener('popstate', handleHashOrPopState)
    }
  }, [])

  // Smoothly scroll the corresponding element into view on mobile layout when activeIndex changes
  useEffect(() => {
    if (!isDesktop && sectionsRef.current[activeIndex]) {
      const hash = sectionsRef.current[activeIndex]
      const element = document.getElementById(hash)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }, [activeIndex, isDesktop])

  // Intercept all hash-based anchor link clicks and route them through the activeIndex state
  useEffect(() => {
    const handleDocumentClick = (e) => {
      const anchor = e.target.closest('a')
      if (!anchor) return

      const href = anchor.getAttribute('href')
      if (href && href.startsWith('#')) {
        const targetId = href.slice(1)
        const targetIndex = sectionsRef.current.indexOf(targetId)
        
        if (targetIndex !== -1) {
          e.preventDefault()
          
          if (activeIndexRef.current === targetIndex) {
            // Force scroll and hash sync even if state didn't change (e.g. on mobile after manual scroll)
            if (!isDesktopRef.current) {
              document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' })
              if (window.location.hash.slice(1) !== targetId) {
                window.history.pushState(null, '', `#${targetId}`)
              }
            }
          } else {
            setActiveIndex(targetIndex)
          }
        }
      }
    }

    document.addEventListener('click', handleDocumentClick)
    return () => document.removeEventListener('click', handleDocumentClick)
  }, [])

  // Lock scroll and intercept desktop wheel events for smooth vertical transition
  useEffect(() => {
    if (!isDesktop) return

    let lastTime = 0
    const throttleDelay = 800 // 800ms matches CSS transition duration in App.jsx

    const handleWheel = (e) => {
      e.preventDefault()

      const now = Date.now()
      if (now - lastTime < throttleDelay) return
      lastTime = now

      if (e.deltaY > 0) {
        setActiveIndex((prev) => Math.min(prev + 1, sectionsRef.current.length - 1))
      } else if (e.deltaY < 0) {
        setActiveIndex((prev) => Math.max(prev - 1, 0))
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    return () => window.removeEventListener('wheel', handleWheel)
  }, [isDesktop])

  return {
    isDesktop,
    activeIndex,
    scrollToSection,
  }
}
