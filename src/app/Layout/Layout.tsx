import { useTheme } from 'app/providers/ThemeProvider'
import { AppRouter } from 'app/providers/router'
import { Suspense } from 'react'
import type React from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import { Navbar } from 'widgets/Navbar'
import cls from './Layoyt.module.scss'
import ThemeSwitcher from 'widgets/ThemeSwitcher'

import { useTranslation } from 'react-i18next'
import { LanguageSwitcher } from 'widgets/LanguageSwitcher'
import { Logo } from 'widgets/Logo'
import { AuthModal } from 'Features/Auth/AuthModal'
import { Toaster } from 'react-hot-toast'
import { useAuth } from 'shared/hooks/useAuth'
import { Logout } from 'Features/Auth/Logout'
import { CopyRight } from './components/CopyRight/CopyRight'
import { ButtonToTop } from 'widgets/ButtonToTop'

const AppLayout: React.FC = () => {
  const { theme } = useTheme()
  const { t } = useTranslation()
  const { isAuth } = useAuth()

  return (
    <div className={classNames('app', {}, [theme])}>
      <Suspense fallback=''>
        <header className={cls.header}>
          <Logo />
          <Navbar />
          {isAuth
            ? (
              <Logout />
              )
            : <AuthModal />

        }
          <ThemeSwitcher />
          <LanguageSwitcher />
        </header>

        <main className={cls.main}>
          <AppRouter />
          <ButtonToTop />
        </main>

        <footer className={cls.footer}>
          {t('created_by')}
          <CopyRight />
        </footer>
      </Suspense>
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
