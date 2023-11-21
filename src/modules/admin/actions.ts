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

const EDIT_USER_INFO_REQUEST = 'ocsc-job/admin/EDIT_USER_INFO_REQUEST'
const EDIT_USER_INFO_SUCCESS = 'ocsc-job/admin/EDIT_USER_INFO_SUCCESS'
const EDIT_USER_INFO_FAILURE = 'ocsc-job/admin/EDIT_USER_INFO_FAILURE'

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

function editUserInfo(userInfo: any) {
  return async (dispatch: any) => {
    dispatch({ type: EDIT_USER_INFO_REQUEST })
    const token = getCookie('token')
    try {
      const result = await axios.put(
        '/agencyprofiles',
        {
          title: userInfo.title,
          gender: userInfo.gender,
          division: userInfo.division,
          position: userInfo.position,
          email: userInfo.email,
          phone: userInfo.phone,
        },
        {
          baseURL: process.env.REACT_APP_PORTAL_API_URL,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      console.log('result :>> ', result)
      dispatch({ type: EDIT_USER_INFO_SUCCESS })
      dispatch(
        uiActions.setFlashMessage(
          'แก้ไขข้อมูลส่วนบุคคลเรียบร้อยแล้ว',
          'success'
        )
      )
      dispatch(push(`${PATH}`))
    } catch (err) {
      dispatch({ type: EDIT_USER_INFO_FAILURE })
      handleApiError(err, dispatch)
    }
  }
}

export {
  LOAD_OCSC_SEVICES_REQUEST,
  LOAD_OCSC_SEVICES_SUCCESS,
  LOAD_OCSC_SEVICES_FAILURE,
  EDIT_USER_INFO_REQUEST,
  EDIT_USER_INFO_SUCCESS,
  EDIT_USER_INFO_FAILURE,
  loadOCSCServices,
  editUserInfo,
}
