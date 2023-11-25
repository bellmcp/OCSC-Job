//@ts-nocheck
import axios from 'axios'
import * as uiActions from 'modules/ui/actions'
import { handleApiError } from 'utils/error'
import { get } from 'lodash'
import { getCookie } from 'utils/cookies'

const LOAD_USER_INFO_REQUEST = 'ocsc-job/edit-user-info/LOAD_USER_INFO_REQUEST'
const LOAD_USER_INFO_SUCCESS = 'ocsc-job/edit-user-info/LOAD_USER_INFO_SUCCESS'
const LOAD_USER_INFO_FAILURE = 'ocsc-job/edit-user-info/LOAD_USER_INFO_FAILURE'

const EDIT_USER_INFO_REQUEST = 'ocsc-job/edit-user-info/EDIT_USER_INFO_REQUEST'
const EDIT_USER_INFO_SUCCESS = 'ocsc-job/edit-user-info/EDIT_USER_INFO_SUCCESS'
const EDIT_USER_INFO_FAILURE = 'ocsc-job/edit-user-info/EDIT_USER_INFO_FAILURE'

function loadUserInfo() {
  return async (dispatch: any) => {
    dispatch({ type: LOAD_USER_INFO_REQUEST })
    const token = getCookie('token')
    try {
      var { data } = await axios.get('/agencyprofiles', {
        baseURL: process.env.REACT_APP_PORTAL_API_URL,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (data.length === 0) {
        data = []
      }
      dispatch({
        type: LOAD_USER_INFO_SUCCESS,
        payload: {
          userInfo: data,
        },
      })
    } catch (err) {
      dispatch({ type: LOAD_USER_INFO_FAILURE })
      dispatch(
        uiActions.setFlashMessage(
          `โหลดข้อมูลส่วนบุคคลไม่สำเร็จ เกิดข้อผิดพลาด ${get(
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
      dispatch(loadUserInfo())
    } catch (err) {
      dispatch({ type: EDIT_USER_INFO_FAILURE })
      handleApiError(err, dispatch, 'แก้ไขข้อมูลส่วนบุคคลไม่สำเร็จ')
    }
  }
}

export {
  LOAD_USER_INFO_REQUEST,
  LOAD_USER_INFO_SUCCESS,
  LOAD_USER_INFO_FAILURE,
  EDIT_USER_INFO_REQUEST,
  EDIT_USER_INFO_SUCCESS,
  EDIT_USER_INFO_FAILURE,
  loadUserInfo,
  editUserInfo,
}
