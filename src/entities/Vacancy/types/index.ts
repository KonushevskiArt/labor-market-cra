export interface ILocation {
  city: string
  street: string
  house: string
}

export interface ISalary {
  value: number
  currency: string
}

export interface ICreatedBy {
  uid: string
  userName: string
}

export interface IVacancy {
  title: string
  date: string
  employment: string
  description: string
  workExperience: number
  requirements: string
  contactNumber: string
  location: ILocation
  salary: ISalary
  createdBy: ICreatedBy
  id: string
}

export interface INewVacancy {
  title: string
  date: string
  employment: string
  description: string
  workExperience: number
  requirements: string
  contactNumber: string
  location: ILocation
  salary: ISalary
  createdBy: ICreatedBy
}
