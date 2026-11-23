import { useEffect, useState, useRef, RefObject } from 'react'

interface IntersectionObserverOptions extends IntersectionObserverInit {
  freezeOnceVisible?: boolean
}

export function useIntersectionObserver(
  elementRef: RefObject<Element>,
  options: IntersectionObserverOptions = {}
): IntersectionObserverEntry | null {
  const { threshold = 0, root = null, rootMargin = '0%', freezeOnceVisible = false } = options
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null)
  const frozen = useRef(false)

  const updateEntry = ([entry]: IntersectionObserverEntry[]): void => {
    if (freezeOnceVisible && entry.isIntersecting) {
      frozen.current = true
    }
    setEntry(entry)
  }

  useEffect(() => {
    const node = elementRef?.current
    const hasIOSupport = !!window.IntersectionObserver

    if (!hasIOSupport || frozen.current || !node) return

    const observerParams = { threshold, root, rootMargin }
    const observer = new IntersectionObserver(updateEntry, observerParams)

    observer.observe(node)

    return () => observer.disconnect()
  }, [elementRef, threshold, root, rootMargin, freezeOnceVisible])

  return entry
}

export function useInView(
  elementRef: RefObject<Element>,
  options: IntersectionObserverOptions = {}
): boolean {
  const entry = useIntersectionObserver(elementRef, options)
  return entry?.isIntersecting ?? false
}