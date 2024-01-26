import { createSelector, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IVacancy } from '../types'
import { IFilters } from 'shared/types/IFilters'
import { RootState } from 'app/store'
import { sortByFieldsMap } from './helpers/sortByFieldsMap'

type sortBy = 'workExperience' | 'posted'| 'salary' | 'none'

interface ISortBy {
  sortBy: sortBy
  isUp: boolean
}

interface IState {
  vacancies: IVacancy[],
  filters: IFilters,
  sortBy: ISortBy
}

const initialState: IState = {
  vacancies: [],
  sortBy: {
    sortBy: 'none',
    isUp: false
  },
  filters: {
    employment: '',
    city: '',
    salaryFrom: 0,
    salaryTo: 0,
    workExperience: 0
  }
}

const vacanciesSlice = createSlice({
  name: 'vacancies',
  initialState,
  reducers: {
    setVacancies (state, action: PayloadAction<IVacancy[]>) {
      state.vacancies = action.payload
    },
    addVacancy (state, action: PayloadAction<IVacancy>) {
      if (state.vacancies.length > 0) {
        state.vacancies.push(action.payload)
      }
    },
    removeVacancy (state, action: PayloadAction<{id: string}>) {
      if (state.vacancies.length > 0) {
        state.vacancies = state.vacancies.filter((vacancy) => vacancy.id !== action.payload.id)
      }
    },
    updateVacancy (state, action: PayloadAction<IVacancy>) {
      if (state.vacancies.length > 0) {
        state.vacancies = state.vacancies.map((vacancy) => {
          if (vacancy.id === action.payload.id) {
            return action.payload
          }
          return vacancy
        })
      }
    },
    addRequestFilters (state, action: PayloadAction<IFilters>) {
      state.filters = action.payload
    }, 
    setSortBy (state, action: PayloadAction<{ sortBy: sortBy, isUp: boolean }>) {
      const {sortBy, isUp} = action.payload
      state.sortBy = {
        sortBy,
        isUp
      }
    },
  }
})

export const { setVacancies, addVacancy, updateVacancy, removeVacancy, addRequestFilters, setSortBy } = vacanciesSlice.actions

export const allVacancies = (state: RootState) => state.vacancies.vacancies
export const sortBy = (state: RootState) => state.vacancies.sortBy

export const memorizedAllVacancies = createSelector([allVacancies, sortBy], (allVacancies, sortOptions) => {
  console.log('memorized selector run');

  return sortByFieldsMap[sortOptions.sortBy](allVacancies, sortOptions.isUp)
})

export default vacanciesSlice.reducer
