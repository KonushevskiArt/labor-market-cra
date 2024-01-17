import { DollarOutlined, PieChartOutlined, HourglassOutlined, CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { t } from 'i18next';
import cls from './SortVacancyInterface.module.scss'
import { useTypedDispatch, useTypedSelector } from 'app/store';
import { setVacancies } from 'entities/Vacancy/model/vacanciesSlice';
import { IVacancy } from 'entities/Vacancy/types';
import { useState } from 'react';


export const SortVacancyInterface = () => {
  const dispatch = useTypedDispatch()

  const vacancies = useTypedSelector((stor) => stor.vacancies.vacancies)

  const [isSalaryUp, setSalaryUp] = useState(false)
  const [isWorkExperienceUp, setWorkExperienceUp] = useState(false)
  const [isPostedUp, setPostedUp] = useState(false)

  const sortSalaryHandler = () => {
    setSalaryUp(!isSalaryUp)
    const copyvacancies = [...vacancies]
    let sortedBySalary: IVacancy[]
    if (isSalaryUp) {
      sortedBySalary = copyvacancies.sort((vacancy1: IVacancy, vacancy2: IVacancy) => {
        return vacancy1.salary.value - vacancy2.salary.value
      })
    } else {
      sortedBySalary = copyvacancies.sort((vacancy1: IVacancy, vacancy2: IVacancy) => {
        return vacancy2.salary.value - vacancy1.salary.value
      })
    }
    dispatch(setVacancies(sortedBySalary))
  }

  const sortWorkExperienceHandler = () => {
    setWorkExperienceUp(!isWorkExperienceUp)
    const copyvacancies = [...vacancies]
    let sortedByWorkExperience: IVacancy[]
    if (isWorkExperienceUp) {
      sortedByWorkExperience = copyvacancies.sort((vacancy1: IVacancy, vacancy2: IVacancy) => {
        return vacancy1.workExperience - vacancy2.workExperience
      })
    } else {
      sortedByWorkExperience = copyvacancies.sort((vacancy1: IVacancy, vacancy2: IVacancy) => {
        return vacancy2.workExperience - vacancy1.workExperience
      })
    }
    dispatch(setVacancies(sortedByWorkExperience))
  }

  const sortPostedHandler = () => {
    setPostedUp(!isPostedUp)
    const copyvacancies = [...vacancies]
    let sortedByPosted: IVacancy[]
    if (isPostedUp) {
      sortedByPosted = copyvacancies.sort((vacancy1: IVacancy, vacancy2: IVacancy) => {
        return new Date(vacancy1.date).getTime() - new Date(vacancy2.date).getTime()
      })
    } else {
      sortedByPosted = copyvacancies.sort((vacancy1: IVacancy, vacancy2: IVacancy) => {
        return new Date(vacancy2.date).getTime() - new Date(vacancy1.date).getTime()
      })
    }
    dispatch(setVacancies(sortedByPosted))
  }

  return (
    <div className={cls.sortWrapper}>
      <span>{t('sortBy')}:</span>
      <Button 
        onClick={sortSalaryHandler} 
        size='small'
      >
        <DollarOutlined />{t('salary')} 
        {isSalaryUp 
          ? <CaretDownOutlined />
          : <CaretUpOutlined />
        }
         
      </Button>
      <Button 
        onClick={sortWorkExperienceHandler}
        size='small'
      >
        <PieChartOutlined />{t('workExperience')}
        {isWorkExperienceUp 
          ? <CaretDownOutlined />
          : <CaretUpOutlined />
        }
      </Button>

      
      <Button 
        size='small'
        onClick={sortPostedHandler}
      >
        <HourglassOutlined  />
        {t('posted')}
        {isPostedUp 
          ? <CaretDownOutlined />
          : <CaretUpOutlined />
        }
      </Button>
    </div>
  );
};