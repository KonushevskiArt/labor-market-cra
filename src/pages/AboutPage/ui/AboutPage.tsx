import { type FC } from 'react'
import cls from './AboutPage.module.scss'

const AboutPage: FC = () => {
  return (
    <div className={cls.wrapper}>
      <h2 className={cls.title}>About Service</h2>
      <p className={cls.info}>This is a multifunctional service for searching, creating, updating vacancies</p>
    </div>
  )
}

export default AboutPage
