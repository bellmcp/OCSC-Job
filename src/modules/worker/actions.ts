//@ts-nocheck
import axios from 'axios'
import * as uiActions from 'modules/ui/actions'
import { handleApiError } from 'utils/error'
import { push } from 'connected-react-router'
import { get } from 'lodash'
import { getCookie } from 'utils/cookies'

const PATH = process.env.REACT_APP_BASE_PATH

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
      dispatch(
        uiActions.setFlashMessage(
          `โหลดรายชื่อบริการของสำนักงาน ก.พ. ไม่สำเร็จ เกิดข้อผิดพลาด ${get(
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
      dispatch(
        uiActions.setFlashMessage(
          `โหลดรายชื่อสิทธิ์ของผู้ปฏิบัติงานไม่สำเร็จ เกิดข้อผิดพลาด ${get(
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

function enableWorkerPermission(agencyId: number, ocscServiceId: number) {
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
      handleApiError(err, dispatch)
      dispatch(push(`${PATH}`))
    }
  }
}

function disableWorkerPermission(agencyId: number, ocscServiceId: number) {
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
      dispatch(
        uiActions.setFlashMessage('ยกเลิกสิทธิ์เรียบร้อยแล้ว', 'success')
      )
    } catch (err) {
      dispatch({ type: DISABLE_WORKER_PERMISSION_FAILURE })
      handleApiError(err, dispatch)
      dispatch(push(`${PATH}`))
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
      dispatch(
        uiActions.setFlashMessage(
          `โหลดรายชื่อผู้ปฏิบัติงานไม่สำเร็จ เกิดข้อผิดพลาด ${get(
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
  loadOCSCServices,
  loadWorkerPermissions,
  enableWorkerPermission,
  disableWorkerPermission,
  loadWorkerAccounts,
}
