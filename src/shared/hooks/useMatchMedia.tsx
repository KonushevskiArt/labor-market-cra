import { useState, useLayoutEffect } from 'react'

const queries = [
  '(max-width: 766px)',
  '(min-width: 767px) and (max-width: 1199px)',
  '(min-width: 1200px)'
]

interface IMatchMedia {
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
}

export const useMatchMedia = (): IMatchMedia => {
  const mediaQueryLists = queries.map((query) => matchMedia(query))

  const getValues = (): boolean[] => mediaQueryLists.map((list) => list.matches)

  const [values, setValues] = useState(getValues)

  useLayoutEffect(() => {
    const handler = (): void => { setValues(getValues) }

    mediaQueryLists.forEach((list) => { list.addEventListener('change', handler) })

    return () => {
      mediaQueryLists.forEach((list) => { list.removeEventListener('change', handler) }
      )
    }
  }, [])

  const result = ['isMobile', 'isTablet', 'isDesktop'].reduce(
    (acc, screen, index) => ({
      ...acc,
      [screen]: values[index]
    }), {})

  return result as IMatchMedia
}
