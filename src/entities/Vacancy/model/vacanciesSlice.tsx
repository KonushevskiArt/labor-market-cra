import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IVacancy } from '../types'
import { IFilters } from 'shared/types/IFilters'

interface IState {
  vacancies: IVacancy[],
  filters: IFilters
}

const initialState: IState = {
  vacancies: [],
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
  }
})

export const { setVacancies, addVacancy, updateVacancy, removeVacancy, addRequestFilters } = vacanciesSlice.actions

export default vacanciesSlice.reducer
