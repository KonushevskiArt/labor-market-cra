import { QueryCompositeFilterConstraint, and, where } from "firebase/firestore";
import { IFilters } from "shared/types/IFilters";

export const makePiecesOfQueryFromFilters = (filters: IFilters, searchTittle: string) => {
  const filtersWithTitle = {...filters, title: searchTittle}
  const {
    employment,
    city,
    salaryFrom,
    salaryTo,
    title,
    workExperience
  } = filtersWithTitle

  type keyOfFilters = keyof typeof filtersWithTitle;

  const filtersArr = Object.keys(filtersWithTitle) as keyOfFilters[]

  const withoutFalsyFiltersArr = filtersArr.filter((filter) => Boolean(filtersWithTitle[filter]))

  const piecesOfQuery = withoutFalsyFiltersArr.map(filter => {
    switch (filter) {
      case 'employment':
        return and( where('employment', "==", employment))
      case 'city':
        return and( where('location.city', "==", city))
      case 'title':
        return and( where('title', '==', `${title}`))
      case 'salaryFrom':
        return and( where("salary.value", ">=", salaryFrom))
      case 'salaryTo':
        return and( where("salary.value", "<=", salaryTo))
      case 'workExperience':
        return and( where("workExperience", "==", workExperience))
    }
  }) as QueryCompositeFilterConstraint[]
  return piecesOfQuery
}