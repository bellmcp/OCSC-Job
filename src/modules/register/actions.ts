//@ts-nocheck
import axios from 'axios'
import * as uiActions from 'modules/ui/actions'
import { handleApiError } from 'utils/error'
import { push } from 'connected-react-router'

const PATH = process.env.REACT_APP_BASE_PATH

const LOAD_AUTHENTICATE_WITH_DOPA_REQUEST =
  'ocsc-job/register/LOAD_AUTHENTICATE_WITH_DOPA_REQUEST'
const LOAD_AUTHENTICATE_WITH_DOPA_SUCCESS =
  'ocsc-job/register/LOAD_AUTHENTICATE_WITH_DOPA_SUCCESS'
const LOAD_AUTHENTICATE_WITH_DOPA_FAILURE =
  'ocsc-job/register/LOAD_AUTHENTICATE_WITH_DOPA_FAILURE'

const LOAD_REGISTER_REQUEST = 'ocsc-job/register/LOAD_REGISTER_REQUEST'
const LOAD_REGISTER_SUCCESS = 'ocsc-job/register/LOAD_REGISTER_SUCCESS'
const LOAD_REGISTER_FAILURE = 'ocsc-job/register/LOAD_REGISTER_FAILURE'

const CLEAR_DOPA_TOKEN = 'ocsc-job/register/CLEAR_DOPA_TOKEN'

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
      handleApiError(err, dispatch)
    }
  }
}

function register(userInfo: any, dopaToken: string) {
  return async (dispatch: any) => {
    dispatch({ type: LOAD_REGISTER_REQUEST })
    try {
      const _ = await axios.patch(
        '/agencies',
        {
          title: userInfo.title,
          firstName: userInfo.firstName,
          lastName: userInfo.lastName,
          gender: userInfo.gender,
          birthDate: userInfo.birthDate,
          ministryId: userInfo.ministryId,
          departmentId: userInfo.departmentId,
          division: userInfo.division,
          position: userInfo.position,
          email: userInfo.email,
          phone: userInfo.phone,
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
      dispatch({ type: LOAD_REGISTER_SUCCESS })
      dispatch(
        uiActions.setFlashMessage(
          'สมัครสมาชิกสำเร็จแล้ว โปรดเข้าสู่ระบบ',
          'success'
        )
      )
      dispatch({ type: CLEAR_DOPA_TOKEN })
      dispatch(push(`${PATH}`))
    } catch (err) {
      dispatch({ type: LOAD_REGISTER_FAILURE })
      handleApiError(err, dispatch)
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
  LOAD_REGISTER_REQUEST,
  LOAD_REGISTER_SUCCESS,
  LOAD_REGISTER_FAILURE,
  CLEAR_DOPA_TOKEN,
  authenticateWithDopa,
  register,
  clearDopaToken,
}
