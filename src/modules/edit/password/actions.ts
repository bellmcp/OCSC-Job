//@ts-nocheck
import axios from 'axios'
import * as uiActions from 'modules/ui/actions'
import { handleApiError } from 'utils/error'
import { getCookie } from 'utils/cookies'

const CHANGE_PASSWORD_REQUEST =
  'ocsc-job/change-password/CHANGE_PASSWORD_REQUEST'
const CHANGE_PASSWORD_SUCCESS =
  'ocsc-job/change-password/CHANGE_PASSWORD_SUCCESS'
const CHANGE_PASSWORD_FAILURE =
  'ocsc-job/change-password/CHANGE_PASSWORD_FAILURE'

function changePassword(userInfo: any) {
  return async (dispatch: any) => {
    dispatch({ type: CHANGE_PASSWORD_REQUEST })
    const token = getCookie('token')
    try {
      await axios.post(
        'agencies/changepassword',
        {
          currentPassword: userInfo.currentPassword,
          newPassword1: userInfo.password1,
          newPassword2: userInfo.password2,
        },
        {
          baseURL: process.env.REACT_APP_PORTAL_API_URL,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      dispatch({ type: CHANGE_PASSWORD_SUCCESS })
      dispatch(
        uiActions.setFlashMessage('เปลี่ยนรหัสผ่านสำเร็จแล้ว', 'success')
      )
    } catch (err) {
      dispatch({ type: CHANGE_PASSWORD_FAILURE })
      handleApiError(err, dispatch, 'เปลี่ยนรหัสผ่านไม่สำเร็จ')
    }
  }
}

export {
  CHANGE_PASSWORD_REQUEST,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAILURE,
  changePassword,
}
