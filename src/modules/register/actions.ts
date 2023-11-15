//@ts-nocheck
import axios from 'axios'
import { get } from 'lodash'
import { setCookie } from 'utils/cookies'
import * as uiActions from 'modules/ui/actions'
import { handleApiError } from 'utils/error'

const LOAD_AUTHENTICATE_WITH_DOPA_REQUEST =
  'ocsc-job/register/LOAD_AUTHENTICATE_WITH_DOPA_REQUEST'
const LOAD_AUTHENTICATE_WITH_DOPA_SUCCESS =
  'ocsc-job/register/LOAD_AUTHENTICATE_WITH_DOPA_SUCCESS'
const LOAD_AUTHENTICATE_WITH_DOPA_FAILURE =
  'ocsc-job/register/LOAD_AUTHENTICATE_WITH_DOPA_FAILURE'

function authenticateWithDota(userInfo: any) {
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
      setCookie('token', get(result, 'data.token', ''), '')
      dispatch(
        uiActions.setFlashMessage(
          'พิสูจน์ตัวจริงกับกรมการปกครองเรียบร้อยแล้ว',
          'success'
        )
      )
    } catch (err) {
      handleApiError(err, dispatch)
    }
  }
}

export {
  LOAD_AUTHENTICATE_WITH_DOPA_REQUEST,
  LOAD_AUTHENTICATE_WITH_DOPA_SUCCESS,
  LOAD_AUTHENTICATE_WITH_DOPA_FAILURE,
  authenticateWithDota,
}
