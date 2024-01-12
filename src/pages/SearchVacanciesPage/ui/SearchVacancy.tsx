import cls from './SearchVacancy.module.scss'
import { useState, type FC, useEffect } from 'react'
import { Container } from 'shared/ui/Container'
import { Vacancy } from 'pages/SearchVacanciesPage/ui/Vacancy/Vacancy'
import { SearchBar } from 'widgets/SearchBar'
import { useFetchVacanciesQuery } from 'entities/Vacancy/api'
import PageSkeleton from 'widgets/PageSkeleton'
import toast from 'react-hot-toast'
import { Pagination, type PaginationProps } from 'antd'
import { type IVacancy } from 'entities/Vacancy/types'

interface SearchVacancyProps {
  className?: string
}

const getDisplayedItemsFromDataArray = (dataArray: IVacancy[], page: number, numberDisplayedVacancies: number): IVacancy[] => {
  const firstEl = page === 1 ? 0 : (page - 1) * numberDisplayedVacancies
  const lastEl = page * numberDisplayedVacancies
  return dataArray.slice(firstEl, lastEl)
}

const pageSizeOption = [10, 25, 50]

export const SearchVacancy: FC = ({ className }: SearchVacancyProps) => {
  const [displayedVacancies, setDisplayedVacancies] = useState<IVacancy[]>([])
  const { data, isLoading, isError, error } = useFetchVacanciesQuery(null)

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
      <SearchBar />
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
