import { type FC } from 'react'
import type React from 'react'
import { useMemo, useState } from 'react'
import {
  LOCAL_STORAGE_THEME_KEY,
  Theme,
  ThemeContext
} from '../lib/ThemeContext'
import { ConfigProvider, theme as antdTheme } from 'antd'

const defaultTheme =
  (localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme) || Theme.LIGHT

interface ThemeProviderProps {
  children: React.ReactNode
}

const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(defaultTheme)

  const { defaultAlgorithm, darkAlgorithm } = antdTheme

  const toggleTheme = (newTheme: Theme): void => {
    setTheme(newTheme)
  }

  const defaultProps = useMemo(
    () => ({
      theme,
      setTheme: toggleTheme
    }),
    [theme]
  )

  return (
    <ThemeContext.Provider value={defaultProps}>
      <ConfigProvider
        theme={{
          algorithm: theme === 'dark' ? darkAlgorithm : defaultAlgorithm
        }}>
        {children}
      </ConfigProvider>
    </ThemeContext.Provider>
  )
}

export default ThemeProvider
