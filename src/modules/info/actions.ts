import axios from 'axios'
import { get } from 'lodash'
import * as uiActions from 'modules/ui/actions'

const LOAD_COUNTRIES_REQUEST = 'ocsc-job/info/country/LOAD_COUNTRIES_REQUEST'
const LOAD_COUNTRIES_SUCCESS = 'ocsc-job/info/country/LOAD_COUNTRIES_SUCCESS'
const LOAD_COUNTRIES_FAILURE = 'ocsc-job/info/country/LOAD_COUNTRIES_FAILURE'

const LOAD_SALARY_GROUPS_REQUEST =
  'ocsc-job/info/salary-group/LOAD_SALARY_GROUPS_REQUEST'
const LOAD_SALARY_GROUPS_SUCCESS =
  'ocsc-job/info/salary-group/LOAD_SALARY_GROUPS_SUCCESS'
const LOAD_SALARY_GROUPS_FAILURE =
  'ocsc-job/info/salary-group/LOAD_SALARY_GROUPS_FAILURE'

const LOAD_EDUCATION_LEVELS_REQUEST =
  'ocsc-job/info/salary-group/LOAD_EDUCATION_LEVELS_REQUEST'
const LOAD_EDUCATION_LEVELS_SUCCESS =
  'ocsc-job/info/salary-group/LOAD_EDUCATION_LEVELS_SUCCESS'
const LOAD_EDUCATION_LEVELS_FAILURE =
  'ocsc-job/info/salary-group/LOAD_EDUCATION_LEVELS_FAILURE'

const LOAD_UNIVERSITIES_REQUEST =
  'ocsc-job/info/university/LOAD_UNIVERSITIES_REQUEST'
const LOAD_UNIVERSITIES_SUCCESS =
  'ocsc-job/info/university/LOAD_UNIVERSITIES_SUCCESS'
const LOAD_UNIVERSITIES_FAILURE =
  'ocsc-job/info/university/LOAD_UNIVERSITIES_FAILURE'

const LOAD_CIRCULAR_LETTERS_REQUEST =
  'ocsc-job/info/circular-letters/LOAD_CIRCULAR_LETTERS_REQUEST'
const LOAD_CIRCULAR_LETTERS_SUCCESS =
  'ocsc-job/info/circular-letters/LOAD_CIRCULAR_LETTERS_SUCCESS'
const LOAD_CIRCULAR_LETTERS_FAILURE =
  'ocsc-job/info/circular-letters/LOAD_CIRCULAR_LETTERS_FAILURE'

function loadCountries() {
  return async (dispatch: any) => {
    dispatch({ type: LOAD_COUNTRIES_REQUEST })
    try {
      var { data } = await axios.get('/RoyalSocietyCountries')
      if (data.length === 0) {
        data = []
      }
      dispatch({
        type: LOAD_COUNTRIES_SUCCESS,
        payload: {
          countries: data,
        },
      })
    } catch (err) {
      dispatch({ type: LOAD_COUNTRIES_FAILURE })
      dispatch(
        uiActions.setFlashMessage(
          `โหลดข้อมูลประเทศไม่สำเร็จ เกิดข้อผิดพลาด ${get(
            err,
            'response.status',
            'บางอย่าง'
          )}`,
          'error'
        )
      )
    }
  }
}

function loadSalaryGroups() {
  return async (dispatch: any) => {
    dispatch({ type: LOAD_SALARY_GROUPS_REQUEST })
    try {
      var { data } = await axios.get('/SalaryGroups')
      if (data.length === 0) {
        data = []
      }
      dispatch({
        type: LOAD_SALARY_GROUPS_SUCCESS,
        payload: {
          salaryGroups: data,
        },
      })
    } catch (err) {
      dispatch({ type: LOAD_SALARY_GROUPS_FAILURE })
      dispatch(
        uiActions.setFlashMessage(
          `โหลดข้อมูลกลุ่มเงินเดือนไม่สำเร็จ เกิดข้อผิดพลาด ${get(
            err,
            'response.status',
            'บางอย่าง'
          )}`,
          'error'
        )
      )
    }
  }
}

function loadEducationLevels() {
  return async (dispatch: any) => {
    dispatch({ type: LOAD_EDUCATION_LEVELS_REQUEST })
    try {
      var { data } = await axios.get('/EducationLevels')
      if (data.length === 0) {
        data = []
      }
      dispatch({
        type: LOAD_EDUCATION_LEVELS_SUCCESS,
        payload: {
          educationLevels: data,
        },
      })
    } catch (err) {
      dispatch({ type: LOAD_EDUCATION_LEVELS_FAILURE })
      dispatch(
        uiActions.setFlashMessage(
          `โหลดข้อมูลระดับการศึกษาไม่สำเร็จ เกิดข้อผิดพลาด ${get(
            err,
            'response.status',
            'บางอย่าง'
          )}`,
          'error'
        )
      )
    }
  }
}

function loadUniversities(countryId: number) {
  return async (dispatch: any) => {
    dispatch({ type: LOAD_UNIVERSITIES_REQUEST })
    try {
      var { data } = await axios.get(
        `/RoyalSocietyCountries/${countryId}/Universities`
      )
      if (data.length === 0) {
        data = []
      }
      dispatch({
        type: LOAD_UNIVERSITIES_SUCCESS,
        payload: {
          universities: data,
        },
      })
    } catch (err) {
      dispatch({ type: LOAD_UNIVERSITIES_FAILURE })
      dispatch(
        uiActions.setFlashMessage(
          `โหลดข้อมูลมหาวิทยาลัยไม่สำเร็จ เกิดข้อผิดพลาด ${get(
            err,
            'response.status',
            'บางอย่าง'
          )}`,
          'error'
        )
      )
    }
  }
}

function loadCircularLetters() {
  return async (dispatch: any) => {
    dispatch({ type: LOAD_CIRCULAR_LETTERS_REQUEST })
    try {
      var { data } = await axios.get('/CircularLetters')
      if (data.length === 0) {
        data = []
      }
      dispatch({
        type: LOAD_CIRCULAR_LETTERS_SUCCESS,
        payload: {
          circularLetters: data,
        },
      })
    } catch (err) {
      dispatch({ type: LOAD_CIRCULAR_LETTERS_FAILURE })
      dispatch(
        uiActions.setFlashMessage(
          `โหลดข้อมูลหนังสือเวียนไม่สำเร็จ เกิดข้อผิดพลาด ${get(
            err,
            'response.status',
            'บางอย่าง'
          )}`,
          'error'
        )
      )
    }
  }
}

export {
  LOAD_COUNTRIES_REQUEST,
  LOAD_COUNTRIES_SUCCESS,
  LOAD_COUNTRIES_FAILURE,
  LOAD_SALARY_GROUPS_REQUEST,
  LOAD_SALARY_GROUPS_SUCCESS,
  LOAD_SALARY_GROUPS_FAILURE,
  LOAD_EDUCATION_LEVELS_REQUEST,
  LOAD_EDUCATION_LEVELS_SUCCESS,
  LOAD_EDUCATION_LEVELS_FAILURE,
  LOAD_UNIVERSITIES_REQUEST,
  LOAD_UNIVERSITIES_SUCCESS,
  LOAD_UNIVERSITIES_FAILURE,
  LOAD_CIRCULAR_LETTERS_REQUEST,
  LOAD_CIRCULAR_LETTERS_SUCCESS,
  LOAD_CIRCULAR_LETTERS_FAILURE,
  loadSalaryGroups,
  loadEducationLevels,
  loadCountries,
  loadUniversities,
  loadCircularLetters,
}
