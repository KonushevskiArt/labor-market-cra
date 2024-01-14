import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IVacancy } from '../types'

interface IState {
  displayedVacancies: IVacancy[]
  fetchedData: IVacancy[]
}

const initialState: IState = {
  displayedVacancies: [],
  fetchedData: []
}

const vacanciesSlice = createSlice({
  name: 'vacancies',
  initialState,
  reducers: {
    setVacanciesData (state, action: PayloadAction<IVacancy[]>) {
      state.fetchedData = action.payload
    },
  }
})

export const { setVacanciesData } = vacanciesSlice.actions

export default vacanciesSlice.reducer
