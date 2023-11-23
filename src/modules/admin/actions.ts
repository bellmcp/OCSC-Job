//@ts-nocheck
import axios from 'axios'
import * as uiActions from 'modules/ui/actions'
import { handleApiError } from 'utils/error'
import { push } from 'connected-react-router'
import { get } from 'lodash'
import { getCookie } from 'utils/cookies'

const PATH = process.env.REACT_APP_BASE_PATH

const LOAD_OCSC_SEVICES_REQUEST = 'ocsc-job/admin/LOAD_OCSC_SEVICES_REQUEST'
const LOAD_OCSC_SEVICES_SUCCESS = 'ocsc-job/admin/LOAD_OCSC_SEVICES_SUCCESS'
const LOAD_OCSC_SEVICES_FAILURE = 'ocsc-job/admin/LOAD_OCSC_SEVICES_FAILURE'

const LOAD_ADMIN_PERMISSIONS_REQUEST =
  'ocsc-job/admin/LOAD_ADMIN_PERMISSIONS_REQUEST'
const LOAD_ADMIN_PERMISSIONS_SUCCESS =
  'ocsc-job/admin/LOAD_ADMIN_PERMISSIONS_SUCCESS'
const LOAD_ADMIN_PERMISSIONS_FAILURE =
  'ocsc-job/admin/LOAD_ADMIN_PERMISSIONS_FAILURE'

const ENABLE_ADMIN_PERMISSION_REQUEST =
  'ocsc-job/admin/ENABLE_ADMIN_PERMISSION_REQUEST'
const ENABLE_ADMIN_PERMISSION_SUCCESS =
  'ocsc-job/admin/ENABLE_ADMIN_PERMISSION_SUCCESS'
const ENABLE_ADMIN_PERMISSION_FAILURE =
  'ocsc-job/admin/ENABLE_ADMIN_PERMISSION_FAILURE'

const DISABLE_ADMIN_PERMISSION_REQUEST =
  'ocsc-job/admin/DISABLE_ADMIN_PERMISSION_REQUEST'
const DISABLE_ADMIN_PERMISSION_SUCCESS =
  'ocsc-job/admin/DISABLE_ADMIN_PERMISSION_SUCCESS'
const DISABLE_ADMIN_PERMISSION_FAILURE =
  'ocsc-job/admin/DISABLE_ADMIN_PERMISSION_FAILURE'

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

function loadAdminPermissions() {
  return async (dispatch: any) => {
    dispatch({ type: LOAD_ADMIN_PERMISSIONS_REQUEST })
    const token = getCookie('token')
    try {
      var { data } = await axios.get('/adminpermissions', {
        baseURL: process.env.REACT_APP_PORTAL_API_URL,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (data.length === 0) {
        data = []
      }
      dispatch({
        type: LOAD_ADMIN_PERMISSIONS_SUCCESS,
        payload: {
          adminPermissions: data,
        },
      })
    } catch (err) {
      dispatch({ type: LOAD_ADMIN_PERMISSIONS_FAILURE })
      dispatch(
        uiActions.setFlashMessage(
          `โหลดรายชื่อสิทธิ์ของหน่วยงานไม่สำเร็จ เกิดข้อผิดพลาด ${get(
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

function enableAdminPermission(departmentId: number, ocscServiceId: number) {
  return async (dispatch: any) => {
    dispatch({ type: ENABLE_ADMIN_PERMISSION_REQUEST })
    const token = getCookie('token')
    try {
      const result = await axios.post(
        '/adminpermissions',
        {
          departmentId,
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
      dispatch({ type: ENABLE_ADMIN_PERMISSION_SUCCESS })
      dispatch(uiActions.setFlashMessage('เพิ่มสิทธิ์เรียบร้อยแล้ว', 'success'))
    } catch (err) {
      dispatch({ type: ENABLE_ADMIN_PERMISSION_FAILURE })
      handleApiError(err, dispatch)
      dispatch(push(`${PATH}`))
    }
  }
}

function disableAdminPermission(departmentId: number, ocscServiceId: number) {
  return async (dispatch: any) => {
    dispatch({ type: DISABLE_ADMIN_PERMISSION_REQUEST })
    const token = getCookie('token')
    try {
      const result = await axios.delete('/adminpermissions', {
        baseURL: process.env.REACT_APP_PORTAL_API_URL,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          departmentId,
          ocscServiceId,
        },
      })
      console.log('result :>> ', result)
      dispatch({ type: DISABLE_ADMIN_PERMISSION_SUCCESS })
      dispatch(uiActions.setFlashMessage('ยกเลิกสิทธิ์เรียบร้อยแล้ว', 'info'))
    } catch (err) {
      dispatch({ type: DISABLE_ADMIN_PERMISSION_FAILURE })
      handleApiError(err, dispatch)
      dispatch(push(`${PATH}`))
    }
  }
}

export {
  LOAD_OCSC_SEVICES_REQUEST,
  LOAD_OCSC_SEVICES_SUCCESS,
  LOAD_OCSC_SEVICES_FAILURE,
  LOAD_ADMIN_PERMISSIONS_REQUEST,
  LOAD_ADMIN_PERMISSIONS_SUCCESS,
  LOAD_ADMIN_PERMISSIONS_FAILURE,
  ENABLE_ADMIN_PERMISSION_REQUEST,
  ENABLE_ADMIN_PERMISSION_SUCCESS,
  ENABLE_ADMIN_PERMISSION_FAILURE,
  DISABLE_ADMIN_PERMISSION_REQUEST,
  DISABLE_ADMIN_PERMISSION_SUCCESS,
  DISABLE_ADMIN_PERMISSION_FAILURE,
  loadOCSCServices,
  loadAdminPermissions,
  enableAdminPermission,
  disableAdminPermission,
}
