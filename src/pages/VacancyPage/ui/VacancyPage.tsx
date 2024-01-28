import { classNames } from 'shared/lib/classNames/classNames'
import cls from './VacancyPage.module.scss'
import { type FC } from 'react'
import { Container } from 'shared/ui/Container'
import { useLocation } from 'react-router-dom'
import { type IVacancy } from 'entities/Vacancy/types'
import { t } from 'i18next'
import { Divider } from 'antd'

interface VacancyPageProps {
  className?: string
}

const VacancyPage: FC = ({ className }: VacancyPageProps) => {
  const { data } = useLocation().state as { data: IVacancy }

  const {
    title,
    date,
    employment,
    description,
    workExperience,
    requirements,
    contactNumber,
    location,
    salary,
    createdBy
  } = data

  const employmentMap = {
    fourHoursPerDay: t('fourHoursPerDay'),
    notFullDay: t('notFullDay'),
    inTheEvenings: t('InTheEvenings'),
    onWeekends: t('onWeekends'),
    oneTimeTask: t('OneTimeTask'),
    fullTime: t('fullTime')
  }

  type keysOfEmployment = keyof typeof employmentMap
  let business;
  if (employmentMap[employment as keysOfEmployment]) {
    business = employmentMap[employment as keysOfEmployment]
  }

  const convertStringToArrayBySlashN = (str: string): string[] => {
    const res = str.split('/n')
    if (res.length === 1 && res[0].trim() === '') {
      return []
    }
    return res
  }

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }

  const viewDate = new Date(date).toLocaleString(t('locales'), options)

  return (
    <Container>
      <div className={classNames(cls.VacancyPage, {}, [])}>
        <h3 className={cls.title}>{title}</h3>
        <Divider plain></Divider>
        <p><i>{t('createdBy')}</i>: <b>{createdBy.userName}</b></p>
        <p><i>{t('busyness')}</i>: <b>{business}</b> </p>
        <p><i>{t('city')}</i>: <b>{location.city}</b></p>
        <p><i>{t('salary')}</i>: <b>{salary.value}{salary.currency}</b></p>
        <p><i>{t('workExperience')}</i>: <b>{workExperience} {t('years')}</b></p>
        <p><i>{t('contactNumber')}</i>: <b>{contactNumber}</b></p>
        <Divider plain></Divider>
        <ol className={cls.description}>
          <span className={cls.descriptionTitle}><b className='fs-lg'>{t('description')}</b></span>
          {convertStringToArrayBySlashN(description).map((description, i) => (
            <li key={i}>{description}</li>
          ))}
        </ol>
        <ol className={cls.requirements}>
          <span className={cls.requirementsTitle}><b className='fs-lg'>{t('requirements')}</b></span>
          {convertStringToArrayBySlashN(requirements).map((requirements, i) => (
            <li key={i}>{requirements}</li>
          ))}
        </ol>
        <p>
          <i>{t('posted')}</i>: <b>{viewDate}</b>
        </p>
      </div>
    </Container>
  )
}

export default VacancyPage
