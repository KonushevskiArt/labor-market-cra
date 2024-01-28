import { classNames } from 'shared/lib/classNames/classNames'
import cls from './SearchBar.module.scss'
import { type FC } from 'react'
import { Input } from 'antd'
import { useTranslation } from 'react-i18next'

const { Search } = Input

interface SearchBarProps {
  className?: string
  onClick: (title: string) => void
}

export const SearchBar: FC<SearchBarProps> = ({ onClick }) => {
  const { t } = useTranslation()

  const onSearch = (value: string): void => {
    onClick(value.trim())
  }

  return (
    <div className={classNames(cls.SearchBar, {}, [])}>
      <div className={cls.wrapper}>
        <Search placeholder={t('searchText')} onSearch={onSearch} enterButton />
      </div>
    </div>
  )
}
