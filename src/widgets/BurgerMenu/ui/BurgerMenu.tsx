import type React from 'react'
import { useState } from 'react'
import { Button, Drawer } from 'antd'
import { NavLink } from 'react-router-dom'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './BurgerMenu.module.scss'
import { MenuOutlined } from '@ant-design/icons'

interface ILink {
  id: string
  path: string
  title: string
}

interface BurgerMenuProps {
  links: ILink[]
}

export const BurgerMenu: React.FC<BurgerMenuProps> = ({ links }) => {
  const [open, setOpen] = useState(false)

  const showDrawer = (): void => {
    setOpen(true)
  }

  const onClose = (): void => {
    setOpen(false)
  }

  return (
    <>
      <Button className={cls.burgerButton} ghost onClick={showDrawer}>
        <MenuOutlined className='icon'/>
      </Button>
      <Drawer
        title="Basic Drawer"
        placement={'left'}
        onClose={onClose}
        open={open}
        key={'left'}
        width={300}
      >
        <nav className={cls.links}>
          {links.map(({ id, path, title }) => (
            <NavLink
              to={path}
              key={id}
              className={( {isActive} ) => isActive ? classNames(cls.navLink, {}, [cls.active]) : cls.navLink}
            >
              {title}
            </NavLink>
          ))}
        </nav>
      </Drawer>
    </>
  )
}
