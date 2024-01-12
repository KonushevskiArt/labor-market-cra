import { type ICreatedBy, type INewVacancy } from 'entities/Vacancy/types'
import { type IFormInput } from 'shared/types/IFormInput'

export const convertFormDataToNewVacancy = (data: IFormInput, createdBy: ICreatedBy): INewVacancy => {
  const {
    title,
    employment,
    workExperience,
    contactNumber,
    city,
    street,
    house,
    currency,
    currencyValue,
    description,
    requirements
  } = data

  const vacancy: INewVacancy = {
    title,
    employment,
    workExperience,
    contactNumber,
    location: {
      city,
      street,
      house
    },
    salary: {
      currency,
      value: currencyValue
    },
    description,
    requirements,
    date: new Date().toString(),
    createdBy
  }

  return vacancy
}
