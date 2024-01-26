import { useTheme } from 'app/providers/ThemeProvider'
import type React from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import { Toaster } from 'react-hot-toast'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { Main } from './components/Main/intex'

const AppLayout: React.FC = () => {
  const { theme } = useTheme()

  return (
    <div className={classNames('app', {}, [theme])}>
      <Header />
      <Main />
      <Footer />
      <Toaster
        position='top-center'
        toastOptions={{
          duration: 4000
        }}
      />
    </div>
  )
}

export default AppLayout
