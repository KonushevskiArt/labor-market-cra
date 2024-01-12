import { type FC } from 'react'
import { useTranslation } from 'react-i18next'
import cls from './NotFoundPage.module.scss'

const NotFound: FC = () => {
  const { t } = useTranslation()
  return (
    <div className={cls.wrapper}>
      <p className={cls.text}>{t('pageNotFound')}</p>
    </div>
  )
}

export default NotFound
