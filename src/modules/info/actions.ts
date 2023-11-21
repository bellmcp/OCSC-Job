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

// new

const LOAD_MINISTRIES_REQUEST = 'ocsc-job/info/LOAD_MINISTRIES_REQUEST'
const LOAD_MINISTRIES_SUCCESS = 'ocsc-job/info/LOAD_MINISTRIES_SUCCESS'
const LOAD_MINISTRIES_FAILURE = 'ocsc-job/info/LOAD_MINISTRIES_FAILURE'

const LOAD_DEPARTMENTS_REQUEST = 'ocsc-job/info/LOAD_DEPARTMENTS_REQUEST'
const LOAD_DEPARTMENTS_SUCCESS = 'ocsc-job/info/LOAD_DEPARTMENTS_SUCCESS'
const LOAD_DEPARTMENTS_FAILURE = 'ocsc-job/info/LOAD_DEPARTMENTS_FAILURE'

const LOAD_DEPARTMENTS_BY_MINISTRY_ID_REQUEST =
  'ocsc-job/info/LOAD_DEPARTMENTS_BY_MINISTRY_ID_REQUEST'
const LOAD_DEPARTMENTS_BY_MINISTRY_ID_SUCCESS =
  'ocsc-job/info/LOAD_DEPARTMENTS_BY_MINISTRY_ID_SUCCESS'
const LOAD_DEPARTMENTS_BY_MINISTRY_ID_FAILURE =
  'ocsc-job/info/LOAD_DEPARTMENTS_BY_MINISTRY_ID_FAILURE'

const LOAD_ROLES_REQUEST = 'ocsc-job/info/LOAD_ROLES_REQUEST'
const LOAD_ROLES_SUCCESS = 'ocsc-job/info/LOAD_ROLES_SUCCESS'
const LOAD_ROLES_FAILURE = 'ocsc-job/info/LOAD_ROLES_FAILURE'

function loadMininstries() {
  return async (dispatch: any) => {
    dispatch({ type: LOAD_MINISTRIES_REQUEST })
    try {
      var { data } = await axios.get('/ministries')
      if (data.length === 0) {
        data = []
      }
      dispatch({
        type: LOAD_MINISTRIES_SUCCESS,
        payload: {
          ministries: data,
        },
      })
    } catch (err) {
      dispatch({ type: LOAD_MINISTRIES_FAILURE })
      dispatch(
        uiActions.setFlashMessage(
          `โหลดรายชื่อกระทรวงทั้งหมดไม่สำเร็จ เกิดข้อผิดพลาด ${get(
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

function loadDepartments() {
  return async (dispatch: any) => {
    dispatch({ type: LOAD_DEPARTMENTS_REQUEST })
    try {
      var { data } = await axios.get('/departments')
      if (data.length === 0) {
        data = []
      }
      dispatch({
        type: LOAD_DEPARTMENTS_SUCCESS,
        payload: {
          departments: data,
        },
      })
    } catch (err) {
      dispatch({ type: LOAD_DEPARTMENTS_FAILURE })
      dispatch(
        uiActions.setFlashMessage(
          `โหลดรายชื่อกรมทั้งหมดไม่สำเร็จ เกิดข้อผิดพลาด ${get(
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

function loadDepartmentsByMinistryId(ministryId: number) {
  return async (dispatch: any) => {
    dispatch({ type: LOAD_DEPARTMENTS_BY_MINISTRY_ID_REQUEST })
    try {
      var { data } = await axios.get(`/ministries/${ministryId}/departments`)
      if (data.length === 0) {
        data = []
      }
      dispatch({
        type: LOAD_DEPARTMENTS_BY_MINISTRY_ID_SUCCESS,
        payload: {
          departments: data,
        },
      })
    } catch (err) {
      dispatch({ type: LOAD_DEPARTMENTS_BY_MINISTRY_ID_FAILURE })
      dispatch(
        uiActions.setFlashMessage(
          `โหลดรายชื่อกรมทั้งหมดในกระทรวง ${ministryId} ไม่สำเร็จ เกิดข้อผิดพลาด ${get(
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

function loadRoles() {
  return async (dispatch: any) => {
    dispatch({ type: LOAD_ROLES_REQUEST })
    try {
      var { data } = await axios.get('/roles')
      if (data.length === 0) {
        data = []
      }
      dispatch({
        type: LOAD_ROLES_SUCCESS,
        payload: {
          roles: data,
        },
      })
    } catch (err) {
      dispatch({ type: LOAD_ROLES_FAILURE })
      dispatch(
        uiActions.setFlashMessage(
          `โหลดรายชื่อบทบาทไม่สำเร็จ เกิดข้อผิดพลาด ${get(
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
  LOAD_MINISTRIES_REQUEST,
  LOAD_MINISTRIES_SUCCESS,
  LOAD_MINISTRIES_FAILURE,
  LOAD_DEPARTMENTS_REQUEST,
  LOAD_DEPARTMENTS_SUCCESS,
  LOAD_DEPARTMENTS_FAILURE,
  LOAD_DEPARTMENTS_BY_MINISTRY_ID_REQUEST,
  LOAD_DEPARTMENTS_BY_MINISTRY_ID_SUCCESS,
  LOAD_DEPARTMENTS_BY_MINISTRY_ID_FAILURE,
  LOAD_ROLES_REQUEST,
  LOAD_ROLES_SUCCESS,
  LOAD_ROLES_FAILURE,
  loadSalaryGroups,
  loadEducationLevels,
  loadCountries,
  loadUniversities,
  loadCircularLetters,
  loadMininstries,
  loadDepartments,
  loadDepartmentsByMinistryId,
  loadRoles,
}
