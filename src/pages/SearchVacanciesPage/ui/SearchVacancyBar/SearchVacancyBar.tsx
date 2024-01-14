import { FC } from 'react';
import { SearchBar } from 'widgets/SearchBar';
import { LazyQueryTrigger } from '@reduxjs/toolkit/dist/query/react/buildHooks';
import { QueryDefinition, BaseQueryFn } from '@reduxjs/toolkit/query';
import { IVacancy } from 'entities/Vacancy/types';
import { useTypedDispatch } from 'app/store';
import { setVacanciesData } from 'entities/Vacancy/model/vacanciesSlice';
import toast from 'react-hot-toast';

interface PropsSearchVacancyBar {
  fetchVacancies: LazyQueryTrigger<QueryDefinition<string, BaseQueryFn, "Vacancies" | "VacanciesByUid", IVacancy[] | undefined, "vacancyApi">>
}

export const SearchVacancyBar: FC<PropsSearchVacancyBar> = ({fetchVacancies}) => {
  const dispatch = useTypedDispatch()
  
  const handleSearch = async (title: string) => {
    try {
      const response = await fetchVacancies(title)
      if (response.data) {
        dispatch(setVacanciesData(response?.data))
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

