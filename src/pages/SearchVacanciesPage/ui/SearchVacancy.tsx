import cls from './SearchVacancy.module.scss'
import { useState, type FC, useEffect, useCallback } from 'react'
import { Container } from 'shared/ui/Container'
import { Vacancy } from 'pages/SearchVacanciesPage/ui/Vacancy/Vacancy'
import { useLazyFetchVacanciesQuery } from 'entities/Vacancy/api'
import PageSkeleton from 'widgets/PageSkeleton'
import toast from 'react-hot-toast'
import { Pagination, type PaginationProps } from 'antd'
import { type IVacancy } from 'entities/Vacancy/types'
import { getDisplayedItemsFromDataArray } from './helpers/getDisplayedItemsFromDataArray'
import { SearchVacancyBar } from './SearchVacancyBar/SearchVacancyBar'
import { useTypedSelector } from 'app/store'
import { SortVacancyInterface } from 'Features/SortVacancy'
import { FilterVacancyInterface } from 'Features/FilterVacancy'
import { memorizedAllVacancies } from 'entities/Vacancy/model/vacanciesSlice'

const pageSizeOption = [10, 25, 50]

export const SearchVacancy: FC = () => {
  const [displayedVacancies, setDisplayedVacancies] = useState<IVacancy[]>([])
  const [fetchVacancies, results] = useLazyFetchVacanciesQuery()
  const { isLoading, isError, error } = results
  // const vacancies = useTypedSelector((stor) => stor.vacancies.vacancies)
  const vacancies = useTypedSelector(memorizedAllVacancies)

  // console.log('render search vacancy page--------');
  

  useEffect(() => {
    if (vacancies) {
      setDisplayedVacancies(vacancies.slice(0, pageSizeOption[0]))
    }
  }, [vacancies])

  if (isError) {
    const messageError = error as string
    toast.error(messageError)
    console.log(error)
  }

  const handleChange = useCallback(
    (page: number, pageSize: number): void => {
      if (vacancies) {
        const newDisplayedItems = getDisplayedItemsFromDataArray(vacancies, page, pageSize)
        setDisplayedVacancies(newDisplayedItems)
      }
    }, [vacancies, setDisplayedVacancies]
  ) 

  const onShowSizeChange: PaginationProps['onShowSizeChange'] = useCallback(
    (page: number, pageSize: number): void => {
      if (vacancies) {
        const newDisplayedItems = getDisplayedItemsFromDataArray(vacancies, page, pageSize)
        setDisplayedVacancies(newDisplayedItems)
      }
    }, [vacancies]
  ) 

  return (
    <Container>
      <SearchVacancyBar fetchVacancies={fetchVacancies} />
      <SortVacancyInterface />
      <div className={cls.wrapper}>
        <FilterVacancyInterface />
        {isLoading
          ? <PageSkeleton />
          : <ul className={cls.SearchVacancy}>
              {displayedVacancies?.map((vacancy) => (
                <li key={vacancy.id}>
                  <Vacancy data={vacancy} />
                </li>
              ))}
            </ul>
        }
      </div>
      <Pagination
        className={cls.Pagination}
        showSizeChanger
        pageSizeOptions={pageSizeOption}
        defaultCurrent={1}
        hideOnSinglePage
        total={vacancies?.length}
        onChange={handleChange}
        onShowSizeChange={onShowSizeChange}
      />
    </Container>
  )
}
