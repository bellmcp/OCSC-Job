//@ts-nocheck
import axios from 'axios'
import { get } from 'lodash'
import * as uiActions from 'modules/ui/actions'
import { getCookie } from 'utils/cookies'

const LOAD_MENU_ITEMS_REQUEST = 'ocsc-job/home/LOAD_MENU_ITEMS_REQUEST'
const LOAD_MENU_ITEMS_SUCCESS = 'ocsc-job/home/LOAD_MENU_ITEMS_SUCCESS'
const LOAD_MENU_ITEMS_FAILURE = 'ocsc-job/home/LOAD_MENU_ITEMS_FAILURE'

function loadMenuItems() {
  const token = getCookie('token')
  return async (dispatch: any) => {
    dispatch({ type: LOAD_MENU_ITEMS_REQUEST })
    try {
      var { data } = await axios.get('/menuitems', {
        baseURL: process.env.REACT_APP_PORTAL_API_URL,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (data.length === 0) {
        data = []
      }
      dispatch({
        type: LOAD_MENU_ITEMS_SUCCESS,
        payload: {
          menuItems: data,
        },
      })
    } catch (err) {
      dispatch({ type: LOAD_MENU_ITEMS_FAILURE })
      dispatch(
        uiActions.setFlashMessage(
          `โหลดรายชื่อเมนูไม่สำเร็จ เกิดข้อผิดพลาด ${get(
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
  LOAD_MENU_ITEMS_REQUEST,
  LOAD_MENU_ITEMS_SUCCESS,
  LOAD_MENU_ITEMS_FAILURE,
  loadMenuItems,
}
