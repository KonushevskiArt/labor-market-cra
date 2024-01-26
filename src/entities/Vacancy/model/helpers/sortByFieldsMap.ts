import { IVacancy } from "entities/Vacancy/types"

export const sortByFieldsMap = {
  workExperience: (allVacancies: IVacancy[], isUp: boolean) => {
    if (isUp) {
      return allVacancies.toSorted((a: IVacancy, b: IVacancy) => {
        return a.workExperience - b.workExperience
      })
    } 

    return allVacancies.toSorted((a: IVacancy, b: IVacancy) => {
      return b.workExperience - a.workExperience
    })
  },

  posted: (allVacancies: IVacancy[], isUp: boolean) => {
    if (isUp) {
      return allVacancies.toSorted((a: IVacancy, b: IVacancy) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime()
      })
    } 

    return allVacancies.toSorted((a: IVacancy, b: IVacancy) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    })
  },

  salary: (allVacancies: IVacancy[], isUp: boolean) => {
    if (isUp) {
      return allVacancies.toSorted((a: IVacancy, b: IVacancy) => {
        return a.salary.value - b.salary.value
      })
    } 

    return allVacancies.toSorted((a: IVacancy, b: IVacancy) => {
      return b.salary.value - a.salary.value
    })
  },
  none: (allVacancies: IVacancy[], isUp: boolean) => {
    return allVacancies;
  }
}