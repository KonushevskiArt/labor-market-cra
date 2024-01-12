import { useTranslation } from 'react-i18next'
import { Select } from 'antd'
import { type FC } from 'react'

export const LanguageSwitcher: FC = () => {
  const { i18n } = useTranslation()
  const localLanguage = localStorage.getItem('i18nextLng') || 'en'

  const langToggle = (value: string): void => {
    i18n.changeLanguage(value)
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <Select
      defaultValue={localLanguage}
      style={{ width: 60 }}
      onChange={langToggle}
      options={[
        { value: 'ru', label: ('ru') },
        { value: 'en', label: ('en') }
      ]}
    />
  )
}
