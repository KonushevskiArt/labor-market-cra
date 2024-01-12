import { classNames } from 'shared/lib/classNames/classNames'
import cls from './SearchBar.module.scss'
import { type FC } from 'react'
import { Input } from 'antd'
import { useTranslation } from 'react-i18next'

const { Search } = Input

interface SearchBarProps {
  className?: string
}

export const SearchBar: FC = ({ className }: SearchBarProps) => {
  const { t } = useTranslation()
  const onSearch = (value: string): void => {
    console.log('search')
  }

  return (
    <div className={classNames(cls.SearchBar, {}, [])}>
      <div className={cls.wrapper}>
        <Search disabled placeholder={t('searchText')} onSearch={onSearch} enterButton />
      </div>
    </div>
  )
}
