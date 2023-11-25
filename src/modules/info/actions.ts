import axios from 'axios'
import { handleApiError } from 'utils/error'

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

const LOAD_DEPARTMENT_REQUEST = 'ocsc-job/info/LOAD_DEPARTMENT_REQUEST'
const LOAD_DEPARTMENT_SUCCESS = 'ocsc-job/info/LOAD_DEPARTMENT_SUCCESS'
const LOAD_DEPARTMENT_FAILURE = 'ocsc-job/info/LOAD_DEPARTMENT_FAILURE'

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
      handleApiError(err, dispatch, 'โหลดรายชื่อกระทรวงทั้งหมดไม่สำเร็จ')
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
      handleApiError(err, dispatch, 'โหลดรายชื่อกรมทั้งหมดไม่สำเร็จ')
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
      handleApiError(
        err,
        dispatch,
        `โหลดรายชื่อกรมทั้งหมดในกระทรวง ${ministryId} ไม่สำเร็จ`
      )
    }
  }
}

function loadDepartment(departmentId: number) {
  return async (dispatch: any) => {
    dispatch({ type: LOAD_DEPARTMENT_REQUEST })
    try {
      var { data } = await axios.get(`/departments/${departmentId}`)
      if (data.length === 0) {
        data = []
      }
      dispatch({
        type: LOAD_DEPARTMENT_SUCCESS,
        payload: {
          department: data,
        },
      })
    } catch (err) {
      dispatch({ type: LOAD_DEPARTMENT_FAILURE })
      handleApiError(err, dispatch, `โหลดข้อมูลกรม ${departmentId} ไม่สำเร็จ จ`)
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
      handleApiError(err, dispatch, 'โหลดรายชื่อบทบาทไม่สำเร็จ')
    }
  }
}

export {
  LOAD_MINISTRIES_REQUEST,
  LOAD_MINISTRIES_SUCCESS,
  LOAD_MINISTRIES_FAILURE,
  LOAD_DEPARTMENTS_REQUEST,
  LOAD_DEPARTMENTS_SUCCESS,
  LOAD_DEPARTMENTS_FAILURE,
  LOAD_DEPARTMENTS_BY_MINISTRY_ID_REQUEST,
  LOAD_DEPARTMENTS_BY_MINISTRY_ID_SUCCESS,
  LOAD_DEPARTMENTS_BY_MINISTRY_ID_FAILURE,
  LOAD_DEPARTMENT_REQUEST,
  LOAD_DEPARTMENT_SUCCESS,
  LOAD_DEPARTMENT_FAILURE,
  LOAD_ROLES_REQUEST,
  LOAD_ROLES_SUCCESS,
  LOAD_ROLES_FAILURE,
  loadMininstries,
  loadDepartments,
  loadDepartmentsByMinistryId,
  loadDepartment,
  loadRoles,
}
