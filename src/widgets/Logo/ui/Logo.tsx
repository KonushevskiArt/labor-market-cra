import { classNames } from 'shared/lib/classNames/classNames'
import cls from './Logo.module.scss'
import { type FC } from 'react'
import { Link } from 'react-router-dom'

interface LogoProps {
  className?: string
}

export const Logo: FC = ({ className }: LogoProps) => {
  return (
    <Link
      to={'/'}
    >
      <span className={classNames(cls.Logo, {}, [])}>
        Labor<br />
        Market
      </span>
    </Link>
  )
}
