import { useEffect, useState } from 'react'

/* Single place that answers "how much motion is this device allowed?" */

function useMediaQuery(query) {
  const [matches, setMatches] = useState(() =>
    typeof window === 'undefined' ? false : window.matchMedia(query).matches,
  )

  useEffect(() => {
    const mql = window.matchMedia(query)
    const onChange = () => setMatches(mql.matches)
    onChange()
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [query])

  return matches
}

export function useReducedMotion() {
  return useMediaQuery('(prefers-reduced-motion: reduce)')
}

/* Touch devices get the story, not the effects. */
export function useCoarsePointer() {
  return useMediaQuery('(pointer: coarse)')
}

export function useMotionBudget() {
  const reduced = useReducedMotion()
  const coarse = useCoarsePointer()
  return {
    reduced,
    coarse,
    /* Parallax and the canvas are the two expensive things. */
    parallax: !reduced && !coarse,
    ambient: !reduced,
  }
}
