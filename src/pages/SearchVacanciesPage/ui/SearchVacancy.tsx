import cls from './SearchVacancy.module.scss'
import { useState, type FC, useEffect } from 'react'
import { Container } from 'shared/ui/Container'
import { Vacancy } from 'pages/SearchVacanciesPage/ui/Vacancy/Vacancy'
import { SearchBar } from 'widgets/SearchBar'
import { useFetchVacanciesQuery, useLazyFetchVacanciesQuery } from 'entities/Vacancy/api'
import PageSkeleton from 'widgets/PageSkeleton'
import toast from 'react-hot-toast'
import { Pagination, type PaginationProps } from 'antd'
import { type IVacancy } from 'entities/Vacancy/types'
import { getDisplayedItemsFromDataArray } from './helpers/getDisplayedItemsFromDataArray'
import { SearchVacancyBar } from './SearchVacancyBar/SearchVacancyBar'

const pageSizeOption = [10, 25, 50]

export const SearchVacancy: FC = () => {
  const [displayedVacancies, setDisplayedVacancies] = useState<IVacancy[]>([])
  const [fetchVacancies, results] = useLazyFetchVacanciesQuery()
  const { data, isLoading, isError, error } = results
  
  useEffect(() => {
    if (data) {
      setDisplayedVacancies(data.slice(0, pageSizeOption[0]))
    }
  }, [data])

  if (isError) {
    const messageError = error as string
    toast.error(messageError)
    console.log(error)
  }

  const handleChange = (page: number, pageSize: number): void => {
    if (data) {
      const newDisplayedItems = getDisplayedItemsFromDataArray(data, page, pageSize)
      setDisplayedVacancies(newDisplayedItems)
    }
  }

  const onShowSizeChange: PaginationProps['onShowSizeChange'] = (page, pageSize) => {
    if (data) {
      const newDisplayedItems = getDisplayedItemsFromDataArray(data, page, pageSize)
      setDisplayedVacancies(newDisplayedItems)
    }
  }

  return (
    <Container>
      <SearchVacancyBar fetchVacancies={fetchVacancies} />
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
      <Pagination
        className={cls.Pagination}
        showSizeChanger
        pageSizeOptions={pageSizeOption}
        defaultCurrent={1}
        total={data?.length}
        onChange={handleChange}
        onShowSizeChange={onShowSizeChange}
      />
    </Container>
  )
}
