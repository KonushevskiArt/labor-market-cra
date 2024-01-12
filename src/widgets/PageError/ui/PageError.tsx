import { classNames } from 'shared/lib/classNames/classNames'
import cls from './PageError.module.scss'
import { type FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from 'antd'

interface PageErrorProps {
  className?: string
}

export const PageError: FC = ({ className }: PageErrorProps) => {
  const { t } = useTranslation()

  const reloadPage = (): void => {
    location.reload()
  }

  return (
    <div className={classNames(cls.pageError, {}, [])}>
      <div className={cls.wrapper}>
        <p className={cls.message}>{t('pageErrorMessage')}</p>
        <Button onClick={reloadPage} type="primary">{t('reloadPage')}</Button>
      </div>
    </div>
  )
}
