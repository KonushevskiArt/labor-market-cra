import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import { addDoc, collection, deleteDoc, doc, getDocs, serverTimestamp, updateDoc, query, where, setDoc } from 'firebase/firestore'
import { db } from 'app/firebase'
import { type IVacancy, type INewVacancy } from 'entities/Vacancy/types'

export const vacanciesApi = createApi({
  reducerPath: 'vacancyApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['Vacancies', 'VacanciesByUid'],
  endpoints: (builder) => ({
    fetchVacancies: builder.query({
      async queryFn (title: string) {
        try {
          const vacanciesRef = collection(db, 'vacancies')
          
          const q = title.trim() !== '' 
          ? query(vacanciesRef, where('title', '==', `${title}`))
          : query(vacanciesRef)
    
          const querySnapshot = await getDocs(q)
          const vacancies = [] as any
          //  add validation of the response
          querySnapshot?.forEach((doc) => {
            const { timestamp, ...data } = doc.data()

            vacancies.push({
              id: doc.id,
              ...data
            })
          })

          const TypedVacancies = vacancies as IVacancy[]
          return { data: TypedVacancies }
        } catch (error) {
          return { error }
        }
      },
      providesTags: ['Vacancies']
    }),
    fetchVacanciesByUid: builder.query({
      async queryFn (uid: string | null) {
        try {
          const vacancies = [] as any
          if (uid) {
            const vacanciesRef = collection(db, 'vacancies')
            const q = query(vacanciesRef, where('createdBy.uid', '==', `${uid}`))
            const querySnapshot = await getDocs(q)
            //  add validation of the response
            querySnapshot?.forEach((doc) => {
              const { timestamp, ...data } = doc.data()

              vacancies.push({
                id: doc.id,
                ...data
              })
            })
          }
          const TypedVacancies = vacancies as IVacancy[]
          return { data: TypedVacancies }
        } catch (error) {
          return { error }
        }
      },
      providesTags: ['VacanciesByUid']
    }),
    addVacancyApi: builder.mutation({
      async queryFn (data: IVacancy): Promise<{ data: string } | any> {
        try {
          // await addDoc(collection(db, 'vacancies', data.id), data)
          await setDoc(doc(db, 'vacancies', data.id), data);
          return { data: 'ok' }
        } catch (error) {
          return error
        }
      },
      invalidatesTags: ['Vacancies', 'VacanciesByUid']
    }),
    removeVacancyApi: builder.mutation({
      async queryFn (id: string): Promise<{ data: string } | any> {
        try {
          await deleteDoc(doc(db, 'vacancies', id))
          return { data: 'ok' }
        } catch (error) {
          return error
        }
      },
      invalidatesTags: ['Vacancies', 'VacanciesByUid']
    }),
    updateVacancyApi: builder.mutation({
      async queryFn ({ id, vacancy }: { id: string, vacancy: INewVacancy }): Promise<{ data: string } | any> {
        try {
          await updateDoc(doc(db, 'vacancies', id), {
            ...vacancy,
            timestamp: serverTimestamp()
          })
          return { data: 'ok' }
        } catch (error: any) {
          return error
        }
      },
      invalidatesTags: ['Vacancies', 'VacanciesByUid']
    })
  })
})

export const {
  useFetchVacanciesQuery,
  useAddVacancyApiMutation,
  useRemoveVacancyApiMutation,
  useUpdateVacancyApiMutation,
  useFetchVacanciesByUidQuery,
  useLazyFetchVacanciesQuery
} = vacanciesApi
