import { IVacancy } from "entities/Vacancy/types"

export const getDisplayedItemsFromDataArray = (dataArray: IVacancy[], page: number, numberDisplayedVacancies: number): IVacancy[] => {
  const firstEl = page === 1 ? 0 : (page - 1) * numberDisplayedVacancies
  const lastEl = page * numberDisplayedVacancies
  return dataArray.slice(firstEl, lastEl)
}