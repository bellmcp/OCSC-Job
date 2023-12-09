//@ts-nocheck
import axios from 'axios'
import * as uiActions from 'modules/ui/actions'
import { handleApiError } from 'utils/error'
import { push } from 'connected-react-router'

const PATH = process.env.REACT_APP_BASE_PATH

const LOAD_AUTHENTICATE_WITH_DOPA_REQUEST =
  'ocsc-job/forgot/LOAD_AUTHENTICATE_WITH_DOPA_REQUEST'
const LOAD_AUTHENTICATE_WITH_DOPA_SUCCESS =
  'ocsc-job/forgot/LOAD_AUTHENTICATE_WITH_DOPA_SUCCESS'
const LOAD_AUTHENTICATE_WITH_DOPA_FAILURE =
  'ocsc-job/forgot/LOAD_AUTHENTICATE_WITH_DOPA_FAILURE'

const RESET_PASSWORD_REQUEST = 'ocsc-job/forgot/RESET_PASSWORD_REQUEST'
const RESET_PASSWORD_SUCCESS = 'ocsc-job/forgot/RESET_PASSWORD_SUCCESS'
const RESET_PASSWORD_FAILURE = 'ocsc-job/forgot/RESET_PASSWORD_FAILURE'

const CLEAR_DOPA_TOKEN = 'ocsc-job/forgot/CLEAR_DOPA_TOKEN'

function authenticateWithDopa(userInfo: any) {
  return async (dispatch: any) => {
    dispatch({ type: LOAD_AUTHENTICATE_WITH_DOPA_REQUEST })
    try {
      const result = await axios.post(
        '/dopa',
        {
          id: userInfo.id,
          firstName: userInfo.firstName,
          lastName: userInfo.lastName,
          birthDate: userInfo.birthDate,
          laser: userInfo.laser,
        },
        {
          baseURL: process.env.REACT_APP_PORTAL_API_URL,
        }
      )
      dispatch({
        type: LOAD_AUTHENTICATE_WITH_DOPA_SUCCESS,
        payload: {
          dopaToken: result.data.token,
        },
      })
      dispatch(
        uiActions.setFlashMessage(
          'พิสูจน์ตัวจริงกับกรมการปกครองสำเร็จแล้ว',
          'success'
        )
      )
    } catch (err) {
      dispatch({ type: LOAD_AUTHENTICATE_WITH_DOPA_FAILURE })
      handleApiError(err, dispatch, 'พิสูจน์ตัวจริงกับกรมการปกครองไม่สำเร็จ')
    }
  }
}

function resetPassword(userInfo: any, dopaToken: string) {
  return async (dispatch: any) => {
    dispatch({ type: RESET_PASSWORD_REQUEST })
    try {
      const result = await axios.post(
        'agencies/resetpassword',
        {
          password1: userInfo.password1,
          password2: userInfo.password2,
        },
        {
          baseURL: process.env.REACT_APP_PORTAL_API_URL,
          headers: {
            Authorization: `Bearer ${dopaToken}`,
          },
        }
      )
      dispatch({ type: RESET_PASSWORD_SUCCESS })
      dispatch(
        uiActions.setFlashMessage(
          'ตั้งรหัสผ่านใหม่สำเร็จแล้ว โปรดเข้าสู่ระบบ',
          'success'
        )
      )
      console.log('result :>> ', result)
      dispatch({ type: CLEAR_DOPA_TOKEN })
      dispatch(push(`${PATH}`))
    } catch (err) {
      dispatch({ type: RESET_PASSWORD_FAILURE })
      handleApiError(err, dispatch, 'ตั้งรหัสผ่านใหม่ไม่สำเร็จ')
    }
  }
}

function clearDopaToken() {
  return async (dispatch: any) => {
    dispatch({ type: CLEAR_DOPA_TOKEN })
  }
}

export {
  LOAD_AUTHENTICATE_WITH_DOPA_REQUEST,
  LOAD_AUTHENTICATE_WITH_DOPA_SUCCESS,
  LOAD_AUTHENTICATE_WITH_DOPA_FAILURE,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILURE,
  CLEAR_DOPA_TOKEN,
  authenticateWithDopa,
  resetPassword,
  clearDopaToken,
}
