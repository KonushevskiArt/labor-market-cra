import { classNames } from 'shared/lib/classNames/classNames'
import cls from './Navbar.module.scss'
import { useTranslation } from 'react-i18next'
import { type FC } from 'react'
import { v4 as uuid } from 'uuid'
import { NavLink } from 'react-router-dom'
import { RouterPaths } from 'shared/RouterPaths'
import { BurgerMenu } from 'widgets/BurgerMenu'
import { useMatchMedia } from 'shared/hooks/useMatchMedia'

interface NavbarProps {
  className?: string
}

export const Navbar: FC = ({ className }: NavbarProps) => {
  const { t } = useTranslation()
  const { isMobile } = useMatchMedia()

  const links = [
    { id: uuid(), path: RouterPaths.homePage, title: t('navigation_main') },
    { id: uuid(), path: RouterPaths.personalCabinetPage, title: t('personalCabinet') },
    { id: uuid(), path: RouterPaths.aboutPage, title: t('navigation_about') }
  ]
  return (
    <div className={classNames(cls.Navbar, {}, [])}>
        {isMobile
          ? <BurgerMenu links={links}/>
          : <nav className={cls.links}>
              {links.map(({ id, path, title }) => (
                <NavLink
                  to={path}
                  key={id}
                  className={({isActive}) => isActive ? classNames(cls.navLink, {}, [cls.active]) : cls.navLink}
                >
                  {title}
                </NavLink>
              ))}
            </nav>
      }
    </div>
  )
}
