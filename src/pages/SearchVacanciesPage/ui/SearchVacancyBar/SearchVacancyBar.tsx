import { FC } from 'react';
import { SearchBar } from 'widgets/SearchBar';
import { LazyQueryTrigger } from '@reduxjs/toolkit/dist/query/react/buildHooks';
import { QueryDefinition, BaseQueryFn } from '@reduxjs/toolkit/query';
import { IVacancy } from 'entities/Vacancy/types';
import { useTypedDispatch, useTypedSelector } from 'app/store';
import { setVacancies } from 'entities/Vacancy/model/vacanciesSlice';
import toast from 'react-hot-toast';
import { IFilters } from 'shared/types/IFilters';

interface PropsSearchVacancyBar {
  fetchVacancies: LazyQueryTrigger<QueryDefinition<{title: string, filters: IFilters}, BaseQueryFn, "Vacancies" | "VacanciesByUid", IVacancy[] | undefined, "vacancyApi">>
}

export const SearchVacancyBar: FC<PropsSearchVacancyBar> = ({fetchVacancies}) => {
  const dispatch = useTypedDispatch()
  const filters = useTypedSelector((stor) => stor.vacancies.filters) 
  
  const handleSearch = async (title: string) => {
    try {
      const response = await fetchVacancies({title, filters})
      if (response.data) {
        dispatch(setVacancies(response?.data))
      }
    } catch (error: any) {
      const messageError = error.message as string
      toast.error(messageError)
      console.log(error)
    }
  }
  
  return (
    <SearchBar onClick={handleSearch}/>
  );
};

