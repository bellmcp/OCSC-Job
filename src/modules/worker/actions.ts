//@ts-nocheck
import axios from 'axios'
import * as uiActions from 'modules/ui/actions'
import { handleApiError } from 'utils/error'
import { getCookie } from 'utils/cookies'

const LOAD_OCSC_SEVICES_REQUEST = 'ocsc-job/worker/LOAD_OCSC_SEVICES_REQUEST'
const LOAD_OCSC_SEVICES_SUCCESS = 'ocsc-job/worker/LOAD_OCSC_SEVICES_SUCCESS'
const LOAD_OCSC_SEVICES_FAILURE = 'ocsc-job/worker/LOAD_OCSC_SEVICES_FAILURE'

const LOAD_WORKER_PERMISSIONS_REQUEST =
  'ocsc-job/worker/LOAD_WORKER_PERMISSIONS_REQUEST'
const LOAD_WORKER_PERMISSIONS_SUCCESS =
  'ocsc-job/worker/LOAD_WORKER_PERMISSIONS_SUCCESS'
const LOAD_WORKER_PERMISSIONS_FAILURE =
  'ocsc-job/worker/LOAD_WORKER_PERMISSIONS_FAILURE'

const ENABLE_WORKER_PERMISSION_REQUEST =
  'ocsc-job/worker/ENABLE_WORKER_PERMISSION_REQUEST'
const ENABLE_WORKER_PERMISSION_SUCCESS =
  'ocsc-job/worker/ENABLE_WORKER_PERMISSION_SUCCESS'
const ENABLE_WORKER_PERMISSION_FAILURE =
  'ocsc-job/worker/ENABLE_WORKER_PERMISSION_FAILURE'

const DISABLE_WORKER_PERMISSION_REQUEST =
  'ocsc-job/worker/DISABLE_WORKER_PERMISSION_REQUEST'
const DISABLE_WORKER_PERMISSION_SUCCESS =
  'ocsc-job/worker/DISABLE_WORKER_PERMISSION_SUCCESS'
const DISABLE_WORKER_PERMISSION_FAILURE =
  'ocsc-job/worker/DISABLE_WORKER_PERMISSION_FAILURE'

const LOAD_WORKER_ACCOUNTS_REQUEST =
  'ocsc-job/worker/LOAD_WORKER_ACCOUNTS_REQUEST'
const LOAD_WORKER_ACCOUNTS_SUCCESS =
  'ocsc-job/worker/LOAD_WORKER_ACCOUNTS_SUCCESS'
const LOAD_WORKER_ACCOUNTS_FAILURE =
  'ocsc-job/worker/LOAD_WORKER_ACCOUNTS_FAILURE'

const ADD_WORKER_ACCOUNT_REQUEST = 'ocsc-job/worker/ADD_WORKER_ACCOUNT_REQUEST'
const ADD_WORKER_ACCOUNT_SUCCESS = 'ocsc-job/worker/ADD_WORKER_ACCOUNT_SUCCESS'
const ADD_WORKER_ACCOUNT_FAILURE = 'ocsc-job/worker/ADD_WORKER_ACCOUNT_FAILURE'

const EDIT_WORKER_ACCOUNT_REQUEST =
  'ocsc-job/worker/EDIT_WORKER_ACCOUNT_REQUEST'
const EDIT_WORKER_ACCOUNT_SUCCESS =
  'ocsc-job/worker/EDIT_WORKER_ACCOUNT_SUCCESS'
const EDIT_WORKER_ACCOUNT_FAILURE =
  'ocsc-job/worker/EDIT_WORKER_ACCOUNT_FAILURE'

const DELETE_WORKER_ACCOUNT_REQUEST =
  'ocsc-job/worker/DELETE_WORKER_ACCOUNT_REQUEST'
const DELETE_WORKER_ACCOUNT_SUCCESS =
  'ocsc-job/worker/DELETE_WORKER_ACCOUNT_SUCCESS'
const DELETE_WORKER_ACCOUNT_FAILURE =
  'ocsc-job/worker/DELETE_WORKER_ACCOUNT_FAILURE'

function loadOCSCServices() {
  return async (dispatch: any) => {
    dispatch({ type: LOAD_OCSC_SEVICES_REQUEST })
    const token = getCookie('token')
    try {
      var { data } = await axios.get('/ocscservices', {
        baseURL: process.env.REACT_APP_PORTAL_API_URL,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (data.length === 0) {
        data = []
      }
      dispatch({
        type: LOAD_OCSC_SEVICES_SUCCESS,
        payload: {
          ocscServices: data,
        },
      })
    } catch (err) {
      dispatch({ type: LOAD_OCSC_SEVICES_FAILURE })
      handleApiError(
        err,
        dispatch,
        'โหลดรายชื่อบริการของสำนักงาน ก.พ. ไม่สำเร็จ'
      )
    }
  }
}

function loadWorkerPermissions(ministryid: number, departmentid: number) {
  return async (dispatch: any) => {
    dispatch({ type: LOAD_WORKER_PERMISSIONS_REQUEST })
    const token = getCookie('token')
    try {
      var { data } = await axios.get('/workerpermissions', {
        params: {
          ministryid,
          departmentid,
        },
        baseURL: process.env.REACT_APP_PORTAL_API_URL,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (data.length === 0) {
        data = []
      }
      dispatch({
        type: LOAD_WORKER_PERMISSIONS_SUCCESS,
        payload: {
          workerPermissions: data,
        },
      })
    } catch (err) {
      dispatch({ type: LOAD_WORKER_PERMISSIONS_FAILURE })
      handleApiError(
        err,
        dispatch,
        'โหลดรายชื่อสิทธิ์ของผู้ปฏิบัติงานไม่สำเร็จ'
      )
    }
  }
}

function enableWorkerPermission(
  agencyId: number,
  ocscServiceId: number,
  ministryId: number,
  departmentId: number
) {
  return async (dispatch: any) => {
    dispatch({ type: ENABLE_WORKER_PERMISSION_REQUEST })
    const token = getCookie('token')
    try {
      const result = await axios.post(
        '/workerpermissions',
        {
          agencyId,
          ocscServiceId,
        },
        {
          baseURL: process.env.REACT_APP_PORTAL_API_URL,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      console.log('result :>> ', result)
      dispatch({ type: ENABLE_WORKER_PERMISSION_SUCCESS })
      dispatch(uiActions.setFlashMessage('เพิ่มสิทธิ์เรียบร้อยแล้ว', 'success'))
    } catch (err) {
      dispatch({ type: ENABLE_WORKER_PERMISSION_FAILURE })
      handleApiError(err, dispatch, 'เพิ่มสิทธิ์ของผู้ปฏิบัติงานไม่สำเร็จ')
      dispatch(loadWorkerPermissions(ministryId, departmentId))
    }
  }
}

function disableWorkerPermission(
  agencyId: number,
  ocscServiceId: number,
  ministryId: number,
  departmentId: number
) {
  return async (dispatch: any) => {
    dispatch({ type: DISABLE_WORKER_PERMISSION_REQUEST })
    const token = getCookie('token')
    try {
      const result = await axios.delete('/workerpermissions', {
        baseURL: process.env.REACT_APP_PORTAL_API_URL,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          agencyId,
          ocscServiceId,
        },
      })
      console.log('result :>> ', result)
      dispatch({ type: DISABLE_WORKER_PERMISSION_SUCCESS })
      dispatch(uiActions.setFlashMessage('ยกเลิกสิทธิ์เรียบร้อยแล้ว', 'info'))
    } catch (err) {
      dispatch({ type: DISABLE_WORKER_PERMISSION_FAILURE })
      handleApiError(err, dispatch, 'ยกเลิกสิทธิ์ของผู้ปฏิบัติงานไม่สำเร็จ')
      dispatch(loadWorkerPermissions(ministryId, departmentId))
    }
  }
}

function loadWorkerAccounts(ministryid: number, departmentid: number) {
  return async (dispatch: any) => {
    dispatch({ type: LOAD_WORKER_ACCOUNTS_REQUEST })
    const token = getCookie('token')
    try {
      var { data } = await axios.get('/agencies', {
        params: {
          ministryid,
          departmentid,
          role: 'worker',
        },
        baseURL: process.env.REACT_APP_PORTAL_API_URL,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (data.length === 0) {
        data = []
      }
      dispatch({
        type: LOAD_WORKER_ACCOUNTS_SUCCESS,
        payload: {
          workerAccounts: data,
        },
      })
    } catch (err) {
      dispatch({ type: LOAD_WORKER_ACCOUNTS_FAILURE })
      handleApiError(err, dispatch, 'โหลดรายชื่อผู้ปฏิบัติงานไม่สำเร็จ')
    }
  }
}

function addWorkerAccount(userInfo: any, successCallback: any) {
  return async (dispatch: any) => {
    dispatch({ type: ADD_WORKER_ACCOUNT_REQUEST })
    const token = getCookie('token')
    try {
      const result = await axios.post(
        '/agencies',
        {
          role: userInfo.role,
          nationalId: userInfo.nationalId,
          title: userInfo.title,
          firstName: userInfo.firstName,
          lastName: userInfo.lastName,
          ministryId: userInfo.ministryId,
          departmentId: userInfo.departmentId,
        },
        {
          baseURL: process.env.REACT_APP_PORTAL_API_URL,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      console.log('result :>> ', result)
      dispatch({ type: ADD_WORKER_ACCOUNT_SUCCESS })
      dispatch(
        uiActions.setFlashMessage('เพิ่มผู้ปฏิบัติงานเรียบร้อยแล้ว', 'success')
      )
      successCallback()
      dispatch(loadWorkerAccounts(userInfo.ministryId, userInfo.departmentId))
    } catch (err) {
      dispatch({ type: ADD_WORKER_ACCOUNT_FAILURE })
      handleApiError(err, dispatch, 'เพิ่มผู้ปฏิบัติงานไม่สำเร็จ')
    }
  }
}

function editWorkerAccount(
  userInfo: any,
  workerId: number,
  ministryId: number,
  departmentId: number,
  successCallback: any
) {
  return async (dispatch: any) => {
    dispatch({ type: EDIT_WORKER_ACCOUNT_REQUEST })
    const token = getCookie('token')
    try {
      const result = await axios.put(
        `/agencies/${workerId}`,
        {
          role: userInfo.role,
          nationalId: userInfo.nationalId,
          title: userInfo.title,
          firstName: userInfo.firstName,
          lastName: userInfo.lastName,
        },
        {
          baseURL: process.env.REACT_APP_PORTAL_API_URL,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      console.log('result :>> ', result)
      dispatch({ type: EDIT_WORKER_ACCOUNT_SUCCESS })
      dispatch(
        uiActions.setFlashMessage('แก้ไขผู้ปฏิบัติงานเรียบร้อยแล้ว', 'success')
      )
      successCallback()
      dispatch(loadWorkerAccounts(ministryId, departmentId))
    } catch (err) {
      dispatch({ type: EDIT_WORKER_ACCOUNT_FAILURE })
      handleApiError(err, dispatch, 'แก้ไขผู้ปฏิบัติงานไม่สำเร็จ')
    }
  }
}

function deleteWorkerAccount(
  workerId: number,
  ministryId: number,
  departmentId: number,
  successCallback: any
) {
  return async (dispatch: any) => {
    dispatch({ type: DELETE_WORKER_ACCOUNT_REQUEST })
    const token = getCookie('token')
    try {
      const result = await axios.delete(`/agencies/${workerId}`, {
        baseURL: process.env.REACT_APP_PORTAL_API_URL,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      console.log('result :>> ', result)
      dispatch({ type: DELETE_WORKER_ACCOUNT_SUCCESS })
      dispatch(
        uiActions.setFlashMessage('ลบผู้ปฏิบัติงานเรียบร้อยแล้ว', 'success')
      )
      successCallback()
      dispatch(loadWorkerAccounts(ministryId, departmentId))
    } catch (err) {
      dispatch({ type: DELETE_WORKER_ACCOUNT_FAILURE })
      handleApiError(err, dispatch, 'ลบผู้ปฏิบัติงานไม่สำเร็จ')
    }
  }
}

export {
  LOAD_OCSC_SEVICES_REQUEST,
  LOAD_OCSC_SEVICES_SUCCESS,
  LOAD_OCSC_SEVICES_FAILURE,
  LOAD_WORKER_PERMISSIONS_REQUEST,
  LOAD_WORKER_PERMISSIONS_SUCCESS,
  LOAD_WORKER_PERMISSIONS_FAILURE,
  ENABLE_WORKER_PERMISSION_REQUEST,
  ENABLE_WORKER_PERMISSION_SUCCESS,
  ENABLE_WORKER_PERMISSION_FAILURE,
  DISABLE_WORKER_PERMISSION_REQUEST,
  DISABLE_WORKER_PERMISSION_SUCCESS,
  DISABLE_WORKER_PERMISSION_FAILURE,
  LOAD_WORKER_ACCOUNTS_REQUEST,
  LOAD_WORKER_ACCOUNTS_SUCCESS,
  LOAD_WORKER_ACCOUNTS_FAILURE,
  ADD_WORKER_ACCOUNT_REQUEST,
  ADD_WORKER_ACCOUNT_SUCCESS,
  ADD_WORKER_ACCOUNT_FAILURE,
  EDIT_WORKER_ACCOUNT_REQUEST,
  EDIT_WORKER_ACCOUNT_SUCCESS,
  EDIT_WORKER_ACCOUNT_FAILURE,
  DELETE_WORKER_ACCOUNT_REQUEST,
  DELETE_WORKER_ACCOUNT_SUCCESS,
  DELETE_WORKER_ACCOUNT_FAILURE,
  loadOCSCServices,
  loadWorkerPermissions,
  enableWorkerPermission,
  disableWorkerPermission,
  loadWorkerAccounts,
  addWorkerAccount,
  editWorkerAccount,
  deleteWorkerAccount,
}
