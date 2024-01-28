import { configureStore } from '@reduxjs/toolkit'
import userReducer from 'entities/User/model/userSlice'
import vacanciesReducer from 'entities/Vacancy/model/vacanciesSlice'

import { type TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { vacanciesApi } from 'entities/Vacancy/api'
import { setupListeners } from '@reduxjs/toolkit/query'
export const store = configureStore({
  reducer: {
    user: userReducer,
    vacancies: vacanciesReducer,
    [vacanciesApi.reducerPath]: vacanciesApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(vacanciesApi.middleware),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useTypedDispatch: () => AppDispatch = useDispatch
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector
