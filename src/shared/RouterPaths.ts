export const RouterPaths = {
  homePage: '/',
  vacancyPage: (id: string) => `/vacancy/${id}`,
  vacancyPageForRouter: '/vacancy/:id',
  aboutPage: '/about',
  createVacancyPage: '/create-vacancy',
  editVacancyPage: (id: string) => `/edit-vacancy/${id}`,
  editVacancyPageForRouter: '/edit-vacancy/:id',
  personalCabinetPage: '/personal-cabinet',
  notFoundPage: '*'
}
