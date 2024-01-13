import { FC } from 'react';
import { SearchBar } from 'widgets/SearchBar';
import { LazyQueryTrigger } from '@reduxjs/toolkit/dist/query/react/buildHooks';
import { QueryDefinition, BaseQueryFn } from '@reduxjs/toolkit/query';
import { IVacancy } from 'entities/Vacancy/types';

interface PropsSearchVacancyBar {
  fetchVacancies: LazyQueryTrigger<QueryDefinition<string, BaseQueryFn, "Vacancies" | "VacanciesByUid", IVacancy[] | undefined, "vacancyApi">>
}

export const SearchVacancyBar: FC<PropsSearchVacancyBar> = ({fetchVacancies}) => {
  
  const handleSearch = (title: string) => {
    fetchVacancies(title)
  }
  
  return (
    <div>
      <SearchBar onClick={handleSearch}/>
    </div>
  );
};

