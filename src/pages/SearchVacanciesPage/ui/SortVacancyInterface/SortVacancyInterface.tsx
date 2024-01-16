import { DollarOutlined, PieChartOutlined, HourglassOutlined, CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { t } from 'i18next';
import cls from './SortVacancyInterface.module.scss'
import { useTypedDispatch, useTypedSelector } from 'app/store';
import { setVacanciesData } from 'entities/Vacancy/model/vacanciesSlice';
import { IVacancy } from 'entities/Vacancy/types';
import { useState } from 'react';


export const SortVacancyInterface = () => {
  const dispatch = useTypedDispatch()

  const fetchedData = useTypedSelector((stor) => stor.vacancies.fetchedData)

  const [isSalaryUp, setSalaryUp] = useState(false)
  const [isWorkExperienceUp, setWorkExperienceUp] = useState(false)
  const [isPostedUp, setPostedUp] = useState(false)

  const sortSalaryHandler = () => {
    setSalaryUp(!isSalaryUp)
    const copyFetchedData = [...fetchedData]
    let sortedBySalary: IVacancy[]
    if (isSalaryUp) {
      sortedBySalary = copyFetchedData.sort((vacancy1: IVacancy, vacancy2: IVacancy) => {
        return vacancy1.salary.value - vacancy2.salary.value
      })
    } else {
      sortedBySalary = copyFetchedData.sort((vacancy1: IVacancy, vacancy2: IVacancy) => {
        return vacancy2.salary.value - vacancy1.salary.value
      })
    }
    dispatch(setVacanciesData(sortedBySalary))
  }

  const sortWorkExperienceHandler = () => {
    setWorkExperienceUp(!isWorkExperienceUp)
    const copyFetchedData = [...fetchedData]
    let sortedByWorkExperience: IVacancy[]
    if (isWorkExperienceUp) {
      sortedByWorkExperience = copyFetchedData.sort((vacancy1: IVacancy, vacancy2: IVacancy) => {
        return vacancy1.workExperience - vacancy2.workExperience
      })
    } else {
      sortedByWorkExperience = copyFetchedData.sort((vacancy1: IVacancy, vacancy2: IVacancy) => {
        return vacancy2.workExperience - vacancy1.workExperience
      })
    }
    dispatch(setVacanciesData(sortedByWorkExperience))
  }

  const sortPostedHandler = () => {
    setPostedUp(!isPostedUp)
    const copyFetchedData = [...fetchedData]
    let sortedByPosted: IVacancy[]
    if (isPostedUp) {
      sortedByPosted = copyFetchedData.sort((vacancy1: IVacancy, vacancy2: IVacancy) => {
        return new Date(vacancy1.date).getTime() - new Date(vacancy2.date).getTime()
      })
    } else {
      sortedByPosted = copyFetchedData.sort((vacancy1: IVacancy, vacancy2: IVacancy) => {
        return new Date(vacancy2.date).getTime() - new Date(vacancy1.date).getTime()
      })
    }
    dispatch(setVacanciesData(sortedByPosted))
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