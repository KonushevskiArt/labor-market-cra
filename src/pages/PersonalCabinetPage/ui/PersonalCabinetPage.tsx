import cls from './PersonalCabinetPage.module.scss'
import { type FC } from 'react'
import { Container } from 'shared/ui/Container'
import { useTranslation } from 'react-i18next'
import { Button } from 'antd'
import { Link } from 'react-router-dom'
import { useFetchVacanciesByUidQuery, useRemoveVacancyApiMutation } from 'entities/Vacancy/api'
import { useAuth } from 'shared/hooks/useAuth'
import PageSkeleton from 'widgets/PageSkeleton'
import toast from 'react-hot-toast'
import { RouterPaths } from 'shared/RouterPaths'
import { DeleteOutlined, EditOutlined, LinkOutlined, PlusSquareOutlined } from '@ant-design/icons'
import { useTypedDispatch } from 'app/store'
import { removeVacancy } from 'entities/Vacancy/model/vacanciesSlice'

interface PersonalCabinetPageProps {
  className?: string
}


export const PersonalCabinetPage: FC = ({ className }: PersonalCabinetPageProps) => {
  const { t } = useTranslation()
  const { uid, isAuth } = useAuth()
  const { data, isLoading, isError, error } = useFetchVacanciesByUidQuery(uid)
  const dispatch = useTypedDispatch()

  if (isError) {
    const messageError = error as string
    toast.error(messageError)
    console.log(error)
  }

  const [removeVacancyApi] = useRemoveVacancyApiMutation()

  const handleDeleteVacancy = (id: string): void => {
    if (window.confirm('Are you sure to delete ?')) {
      removeVacancyApi(id)
        .then(() => {
          dispatch(removeVacancy({id}))
          toast.success('vacancy removed successfully')
        })
        .catch((err) => { console.log(err) })
    }
  }

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }

  return (
    <Container>
      <div className={cls.page}>
        <h2 className={cls.title}>{t('personalCabinet')}</h2>
        {isLoading && <PageSkeleton />}
        {isAuth &&
          <>
            <h3 className={cls.listTitle}>{t('listOfYourVacancies')}</h3>
            <ol className={cls.vacanciesList}>
              {data?.map(vacancy => (
                <li className={cls.vacancy} key={vacancy.id}>
                  <div className={cls.vacancyInfo}>
                    <Link className='link' state={{ data: vacancy }} to={RouterPaths.vacancyPage(vacancy.id)} ><LinkOutlined /> {vacancy.title}</Link>
                    <span>{t('posted')}: <b>{new Date(vacancy.date).toLocaleString(t('locales'), options)}</b></span>
                  </div>
                  <div className={cls.vacancyEditor}>
                    <Link to={`/edit-vacancy/${vacancy.id}`} state={{ vacancy }}>
                      <Button><EditOutlined /> {t('edit')}</Button>
                    </Link>
                    <Button onClick={() => { handleDeleteVacancy(vacancy.id) }} danger><DeleteOutlined /> {t('remove')}</Button>
                  </div>
                </li>
              ))}
            </ol>
            <Link to='/create-vacancy'>
              <Button type='primary'><PlusSquareOutlined />{t('createNewVacancy')}</Button>
            </Link>
          </>}
          {!isAuth && <p>{t('YouNeedToLogInOrRegister')}</p>}
      </div>
    </Container>
  )
}
