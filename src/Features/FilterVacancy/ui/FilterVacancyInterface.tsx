import React, { useState } from 'react';
import cls from './FilterVacancyInterface.module.scss'
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Button, Form, Input, InputNumber, Select } from 'antd';
import { useTranslation } from 'react-i18next';
import { CheckCircleOutlined, SaveOutlined } from '@ant-design/icons';
import { useTypedDispatch, useTypedSelector } from 'app/store';
import { IFilters } from 'shared/types/IFilters';
import { addRequestFilters } from 'entities/Vacancy/model/vacanciesSlice';

type validationResult = {
  isError: boolean, 
  fieldName?: keyof IFilters, 
  errorMessage?: string
}

export const FilterVacancyInterface = () => {
  const filters = useTypedSelector((state) => state.vacancies.filters)

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm({
    defaultValues: {
      employment: filters.employment,
      city: filters.city,
      salaryFrom: filters.salaryFrom,
      salaryTo: filters.salaryTo,
      workExperience: filters.workExperience
    }
  })
  const dispatch = useTypedDispatch()

  const { t } = useTranslation()

  const [isInstalledFilters, setInstalledFilters] = useState(false)

  const filterDataValidation = (data: IFilters): validationResult => {
    const {
      salaryFrom,
      salaryTo,
    } = data
    if (salaryFrom && salaryTo && salaryFrom > salaryTo) {
      return {isError: true, fieldName: 'salaryTo', errorMessage: t('theLowerThresholdOfSalaryExceeds')} 
    } else {
      return {isError: false}
    }
  }

  const onSubmit: SubmitHandler<IFilters> = async (data) => {
    const validation = filterDataValidation(data)
    if (validation.isError && validation.fieldName) {

      setError(validation.fieldName, {
        type: "manual",
        message: validation.errorMessage,
      })
    } else {
      setInstalledFilters(true)
      setTimeout(() => {
        setInstalledFilters(false)
      }, 5000)
    }
    dispatch(addRequestFilters(data))
  }
  
  const isError = errors.salaryTo;

  return (
    <div className={cls.FilterInterface}>
       <Form
          className={cls.form}
          onFinish={handleSubmit(onSubmit)}
          layout="horizontal"
        >
          <div className={cls.inputWrapper}>
            <label className={cls.label} htmlFor="city">{t('city')}</label>
            <Form.Item className={cls.formItem}>
              <Controller
                name="city"
                control={control}
                rules={{
                  maxLength: { value: 140, message: t('maxLength140') }
                }}
                render={({ field }) => <Input id='city' className={cls.input} {...field} />}
              />
              {errors.city && <span className={cls.error}>{errors.city.message}</span>}
            </Form.Item>
          </div>

          <div className={cls.inputWrapper}>
            <label className={cls.label} htmlFor="employment">{t('employment')}</label>
            <Form.Item className={cls.formItem}>
              <Controller
                name="employment"
                control={control}
                render={({ field }) => (
                  <Select id='employment' className={cls.input} {...field}>
                    <Select.Option value={'fourHoursPerDay'}>{t('fourHoursPerDay')}</Select.Option>
                    <Select.Option value={'notFullDay'}>{t('notFullDay')}</Select.Option>
                    <Select.Option value={'inTheEvenings'}>{t('InTheEvenings')}</Select.Option>
                    <Select.Option value={'onWeekends'}>{t('onWeekends')}</Select.Option>
                    <Select.Option value={'fullTime'}>{t('fullTime')}</Select.Option>
                  </Select>
                )}
              />
              {errors.employment && <span className={cls.error}>{errors.employment.message}</span>}
            </Form.Item>
          </div>

          <div className={cls.inputWrapper}>
            <label className={cls.label} htmlFor="workExperience">{t('workExperience')}</label>
            <div className={cls.wrapperForTwo}>
              <Form.Item className={cls.formItem}>
                <Controller
                    name="workExperience"
                    control={control}
                    render={({ field }) => (
                      <InputNumber id='workExperience' className={cls.input} addonBefore={t('from')} min={0} max={80} {...field} />
                    )}
                  />
              </Form.Item>
            </div>
          </div>


          <div className={cls.inputWrapper}>
            <label className={cls.label} htmlFor="salaryFrom">{t('salary')}</label>
            <div className={cls.wrapperForTwo}>
              <Form.Item className={cls.formItem}>
                <Controller
                    name="salaryFrom"
                    control={control}
                    render={({ field }) => (
                      <InputNumber id='salaryFrom' className={cls.input} addonBefore={t('from')} min={0} max={9999999} {...field} />
                    )}
                  />
                  {errors.salaryFrom && <span className={cls.error}>{errors.salaryFrom.message}</span>}
              </Form.Item>

              <Form.Item className={cls.formItem}>
                <Controller
                    name="salaryTo"
                    control={control}
                    render={({ field }) => (
                      <InputNumber id='salaryTo' className={cls.input} addonBefore={t('to')} min={0} max={9999999} {...field} />
                    )}
                  />
              </Form.Item>
            </div>
            {errors.salaryTo && <span className={cls.error}>{errors.salaryTo.message}</span>}
          </div>

          <Button
              disabled={Boolean(isError)}
              htmlType="submit"
              size='middle'
              type='primary'
              className={cls.button}
              icon={<SaveOutlined />}
            >
              {t('save')}
            </Button>  
            {isInstalledFilters && <p className={cls.filtersInstalled}>
              <CheckCircleOutlined className='icon' />
              <span>{t('filtersInstalled')}</span>
              </p>
            }        
        </Form>
    </div>
  );
};
