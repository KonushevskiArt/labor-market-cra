import { DollarOutlined, PieChartOutlined, HourglassOutlined, CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { t } from 'i18next';
import cls from './SortVacancyInterface.module.scss'
import { useTypedDispatch } from 'app/store';
import { setSortBy } from 'entities/Vacancy/model/vacanciesSlice';
import { useState } from 'react';


export const SortVacancyInterface = () => {
  const dispatch = useTypedDispatch()

  const [isSalaryUp, setSalaryUp] = useState(false)
  const [isWorkExperienceUp, setWorkExperienceUp] = useState(false)
  const [isPostedUp, setPostedUp] = useState(false)

  const sortSalaryHandler = () => {
    setSalaryUp(!isSalaryUp)
    dispatch(setSortBy({sortBy: 'salary', isUp: isSalaryUp}))
  }

  const sortWorkExperienceHandler = () => {
    setWorkExperienceUp(!isWorkExperienceUp)
    dispatch(setSortBy({sortBy: 'workExperience', isUp: isWorkExperienceUp}))
  }

  const sortPostedHandler = () => {
    setPostedUp(!isPostedUp)
    dispatch(setSortBy({sortBy: 'posted', isUp: isPostedUp}))
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