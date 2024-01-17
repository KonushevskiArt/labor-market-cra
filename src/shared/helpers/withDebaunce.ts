let tId: ReturnType<typeof setTimeout>

export const withDebaunce = (method: (...args: any[]) => void, delay: number) => {
  clearTimeout(tId)
  tId = setTimeout(() => {
    method()
  }, delay)
}