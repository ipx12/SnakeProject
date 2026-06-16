import { useEffect, useState, useCallback } from 'react'

/**
 * Custom hook to handle full-page scrolling and navigation between sections.
 * Supports desktop wheel scrolling (simulated container translate) and mobile native scrolling.
 * Syncs active section index with URL hashes and browser Back/Forward navigation.
 * 
 * @param {string[]} sections - Array of section IDs (e.g., ['1', '2', '3', '4'])
 * @returns {object} Hook utilities: { isDesktop, activeIndex, scrollToSection }
 */
export function usePageScroll(sections) {
  const [isDesktop, setIsDesktop] = useState(() => window.innerWidth >= 768)

  // Determine initial index from URL hash or fallback to 0
  const getInitialActiveIndex = () => {
    const hash = window.location.hash.slice(1)
    const index = sections.indexOf(hash)
    return index !== -1 ? index : 0
  }

  const [activeIndex, setActiveIndex] = useState(getInitialActiveIndex)

  // Track layout state based on window width
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Programmatically scroll/navigate to a section by its ID
  const scrollToSection = useCallback((id) => {
    const index = sections.indexOf(id)
    if (index !== -1) {
      setActiveIndex(index)
    }
  }, [sections])

  // Sync URL hash when activeIndex changes
  useEffect(() => {
    const targetHash = sections[activeIndex]
    if (!targetHash) return

    const currentHash = window.location.hash.slice(1)
    if (currentHash !== targetHash) {
      // Avoid pushing a duplicate on initial mount when URL has no hash
      if (activeIndex === 0 && !currentHash) return
      
      window.history.pushState(null, '', `#${targetHash}`)
    }
  }, [activeIndex, sections])

  // Handle URL hash changes (deep linking / browser Back & Forward navigation)
  useEffect(() => {
    const handleHashOrPopState = () => {
      const hash = window.location.hash.slice(1)
      const index = sections.indexOf(hash)
      setActiveIndex(index !== -1 ? index : 0)
    }

    window.addEventListener('hashchange', handleHashOrPopState)
    window.addEventListener('popstate', handleHashOrPopState)

    return () => {
      window.removeEventListener('hashchange', handleHashOrPopState)
      window.removeEventListener('popstate', handleHashOrPopState)
    }
  }, [sections])

  // Smoothly scroll the corresponding element into view on mobile layout when activeIndex changes
  useEffect(() => {
    if (!isDesktop && sections[activeIndex]) {
      const hash = sections[activeIndex]
      const element = document.getElementById(hash)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }, [activeIndex, isDesktop, sections])

  // Intercept all hash-based anchor link clicks and route them through the activeIndex state
  useEffect(() => {
    const handleDocumentClick = (e) => {
      const anchor = e.target.closest('a')
      if (!anchor) return

      const href = anchor.getAttribute('href')
      if (href && href.startsWith('#')) {
        const targetId = href.slice(1)
        if (sections.includes(targetId)) {
          e.preventDefault()
          scrollToSection(targetId)
        }
      }
    }

    document.addEventListener('click', handleDocumentClick)
    return () => document.removeEventListener('click', handleDocumentClick)
  }, [sections, scrollToSection])

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
        setActiveIndex((prev) => Math.min(prev + 1, sections.length - 1))
      } else if (e.deltaY < 0) {
        setActiveIndex((prev) => Math.max(prev - 1, 0))
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    return () => window.removeEventListener('wheel', handleWheel)
  }, [isDesktop, sections])

  return {
    isDesktop,
    activeIndex,
    scrollToSection,
  }
}
