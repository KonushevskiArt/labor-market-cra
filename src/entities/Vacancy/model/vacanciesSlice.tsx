import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IVacancy } from '../types'

interface IState {
  vacancies: IVacancy[]
}

const initialState: IState = {
  vacancies: []
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
  }
})

export const { setVacancies, addVacancy, updateVacancy, removeVacancy } = vacanciesSlice.actions

export default vacanciesSlice.reducer
