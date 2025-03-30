import * as React from "react"

const MOBILE_BREAKPOINT = 768
const TABLET_BREAKPOINT = 1024

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    mql.addEventListener("change", onChange)
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isMobile
}

export function useIsTablet() {
  const [isTablet, setIsTablet] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(min-width: ${MOBILE_BREAKPOINT}px) and (max-width: ${TABLET_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsTablet(window.innerWidth >= MOBILE_BREAKPOINT && window.innerWidth < TABLET_BREAKPOINT)
    }
    mql.addEventListener("change", onChange)
    setIsTablet(window.innerWidth >= MOBILE_BREAKPOINT && window.innerWidth < TABLET_BREAKPOINT)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isTablet
}

export function useResponsive() {
  const isMobile = useIsMobile()
  const isTablet = useIsTablet()
  const isDesktop = !isMobile && !isTablet
  
  return {
    isMobile,
    isTablet,
    isDesktop,
    isSmallScreen: isMobile || isTablet
  }
}

// Enhanced tab layout classes with more styling options
export function useTabLayoutClasses() {
  const isMobile = useIsMobile()
  
  return {
    tabsListClass: isMobile 
      ? 'flex flex-wrap gap-2 w-full bg-secondary/50 p-1.5 rounded-xl' 
      : 'grid grid-cols-4 w-full bg-secondary/50 p-1.5 rounded-xl',
    tabTriggerClass: isMobile 
      ? 'w-[calc(50%-4px)] h-10 rounded-lg transition-all data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:shadow-sm font-medium text-sm' 
      : 'h-10 rounded-lg transition-all data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:shadow-sm font-medium'
  }
}
