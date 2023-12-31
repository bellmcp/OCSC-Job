//@ts-nocheck
import axios from 'axios'
import * as uiActions from 'modules/ui/actions'
import { handleApiError } from 'utils/error'
import { getCookie } from 'utils/cookies'

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

const LOAD_ADMIN_ACCOUNTS_REQUEST = 'ocsc-job/admin/LOAD_ADMIN_ACCOUNTS_REQUEST'
const LOAD_ADMIN_ACCOUNTS_SUCCESS = 'ocsc-job/admin/LOAD_ADMIN_ACCOUNTS_SUCCESS'
const LOAD_ADMIN_ACCOUNTS_FAILURE = 'ocsc-job/admin/LOAD_ADMIN_ACCOUNTS_FAILURE'

const ADD_ADMIN_ACCOUNT_REQUEST = 'ocsc-job/admin/ADD_ADMIN_ACCOUNT_REQUEST'
const ADD_ADMIN_ACCOUNT_SUCCESS = 'ocsc-job/admin/ADD_ADMIN_ACCOUNT_SUCCESS'
const ADD_ADMIN_ACCOUNT_FAILURE = 'ocsc-job/admin/ADD_ADMIN_ACCOUNT_FAILURE'

const EDIT_ADMIN_ACCOUNT_REQUEST = 'ocsc-job/admin/EDIT_ADMIN_ACCOUNT_REQUEST'
const EDIT_ADMIN_ACCOUNT_SUCCESS = 'ocsc-job/admin/EDIT_ADMIN_ACCOUNT_SUCCESS'
const EDIT_ADMIN_ACCOUNT_FAILURE = 'ocsc-job/admin/EDIT_ADMIN_ACCOUNT_FAILURE'

const DELETE_ADMIN_ACCOUNT_REQUEST =
  'ocsc-job/admin/DELETE_ADMIN_ACCOUNT_REQUEST'
const DELETE_ADMIN_ACCOUNT_SUCCESS =
  'ocsc-job/admin/DELETE_ADMIN_ACCOUNT_SUCCESS'
const DELETE_ADMIN_ACCOUNT_FAILURE =
  'ocsc-job/admin/DELETE_ADMIN_ACCOUNT_FAILURE'

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
        'โหลดข้อมูลบริการของสำนักงาน ก.พ. ไม่สำเร็จ'
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
      handleApiError(err, dispatch, 'โหลดข้อมูลสิทธิ์ของหน่วยงานไม่สำเร็จ')
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
      handleApiError(err, dispatch, 'เพิ่มสิทธิ์ของหน่วยงานไม่สำเร็จ')
      dispatch(loadAdminPermissions())
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
      handleApiError(err, dispatch, 'ยกเลิกสิทธิ์ของหน่วยงานไม่สำเร็จ')
      dispatch(loadAdminPermissions())
    }
  }
}

function loadAdminAccounts(ministryid: number, departmentid: number) {
  return async (dispatch: any) => {
    dispatch({ type: LOAD_ADMIN_ACCOUNTS_REQUEST })
    const token = getCookie('token')
    try {
      var { data } = await axios.get('/agencies', {
        params: {
          ministryid,
          departmentid,
          role: 'administrator',
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
        type: LOAD_ADMIN_ACCOUNTS_SUCCESS,
        payload: {
          adminAccounts: data,
        },
      })
    } catch (err) {
      dispatch({ type: LOAD_ADMIN_ACCOUNTS_FAILURE })
      handleApiError(err, dispatch, 'โหลดข้อมูลผู้ดูแลระบบไม่สำเร็จ')
    }
  }
}

function addAdminAccount(userInfo: any, successCallback: any) {
  return async (dispatch: any) => {
    dispatch({ type: ADD_ADMIN_ACCOUNT_REQUEST })
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
      dispatch({ type: ADD_ADMIN_ACCOUNT_SUCCESS })
      dispatch(
        uiActions.setFlashMessage('เพิ่มผู้ดูแลระบบเรียบร้อยแล้ว', 'success')
      )
      successCallback()
      dispatch(loadAdminAccounts(userInfo.ministryId, userInfo.departmentId))
    } catch (err) {
      dispatch({ type: ADD_ADMIN_ACCOUNT_FAILURE })
      handleApiError(err, dispatch, 'เพิ่มผู้ดูแลระบบไม่สำเร็จ')
    }
  }
}

function editAdminAccount(
  userInfo: any,
  adminId: number,
  ministryId: number,
  departmentId: number,
  successCallback: any
) {
  return async (dispatch: any) => {
    dispatch({ type: EDIT_ADMIN_ACCOUNT_REQUEST })
    const token = getCookie('token')
    try {
      const result = await axios.put(
        `/agencies/${adminId}`,
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
      dispatch({ type: EDIT_ADMIN_ACCOUNT_SUCCESS })
      dispatch(
        uiActions.setFlashMessage('แก้ไขผู้ดูแลระบบเรียบร้อยแล้ว', 'success')
      )
      successCallback()
      dispatch(loadAdminAccounts(ministryId, departmentId))
    } catch (err) {
      dispatch({ type: EDIT_ADMIN_ACCOUNT_FAILURE })
      handleApiError(err, dispatch, 'แก้ไขผู้ดูแลระบบไม่สำเร็จ')
    }
  }
}

function deleteAdminAccount(
  adminId: number,
  ministryId: number,
  departmentId: number,
  successCallback: any
) {
  return async (dispatch: any) => {
    dispatch({ type: DELETE_ADMIN_ACCOUNT_REQUEST })
    const token = getCookie('token')
    try {
      const result = await axios.delete(`/agencies/${adminId}`, {
        baseURL: process.env.REACT_APP_PORTAL_API_URL,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      console.log('result :>> ', result)
      dispatch({ type: DELETE_ADMIN_ACCOUNT_SUCCESS })
      dispatch(
        uiActions.setFlashMessage('ลบผู้ดูแลระบบเรียบร้อยแล้ว', 'success')
      )
      successCallback()
      dispatch(loadAdminAccounts(ministryId, departmentId))
    } catch (err) {
      dispatch({ type: DELETE_ADMIN_ACCOUNT_FAILURE })
      handleApiError(err, dispatch)
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
  LOAD_ADMIN_ACCOUNTS_REQUEST,
  LOAD_ADMIN_ACCOUNTS_SUCCESS,
  LOAD_ADMIN_ACCOUNTS_FAILURE,
  ADD_ADMIN_ACCOUNT_REQUEST,
  ADD_ADMIN_ACCOUNT_SUCCESS,
  ADD_ADMIN_ACCOUNT_FAILURE,
  EDIT_ADMIN_ACCOUNT_REQUEST,
  EDIT_ADMIN_ACCOUNT_SUCCESS,
  EDIT_ADMIN_ACCOUNT_FAILURE,
  DELETE_ADMIN_ACCOUNT_REQUEST,
  DELETE_ADMIN_ACCOUNT_SUCCESS,
  DELETE_ADMIN_ACCOUNT_FAILURE,
  loadOCSCServices,
  loadAdminPermissions,
  enableAdminPermission,
  disableAdminPermission,
  loadAdminAccounts,
  addAdminAccount,
  editAdminAccount,
  deleteAdminAccount,
}
