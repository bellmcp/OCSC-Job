// @ts-nocheck
import axios from 'axios'

const SET_FLASH_MESSAGE = 'ocsc-job/ui/SET_FLASH_MESSAGE'
const CLEAR_FLASH_MESSAGE = 'ocsc-job/ui/CLEAR_FLASH_MESSAGE'
const SET_LEARN_EXIT_DIALOG = 'ocsc-job/ui/SET_LEARN_EXIT_DIALOG'
const LOAD_FOOTER_INFO_REQUEST = 'ocsc-job/ui/LOAD_FOOTER_INFO_REQUEST'
const LOAD_FOOTER_INFO_SUCCESS = 'ocsc-job/ui/LOAD_FOOTER_INFO_SUCCESS'
const LOAD_FOOTER_INFO_FAILURE = 'ocsc-job/ui/LOAD_FOOTER_INFO_FAILURE'

function setFlashMessage(message: string, severity: string) {
  return {
    type: SET_FLASH_MESSAGE,
    payload: {
      message,
      severity,
    },
  }
}

function clearFlashMessage() {
  return {
    type: CLEAR_FLASH_MESSAGE,
  }
}

function setLearnExitDialog(isOpen: boolean) {
  return {
    type: SET_LEARN_EXIT_DIALOG,
    payload: {
      isOpen,
    },
  }
}

function loadFooterInfo() {
  return async (dispatch: any) => {
    dispatch({ type: LOAD_FOOTER_INFO_REQUEST })
    try {
      var { data } = await axios.get('constants/footer')
      if (data.length === 0) {
        data = []
      }
      dispatch({
        type: LOAD_FOOTER_INFO_SUCCESS,
        payload: {
          footerInfo: data,
        },
      })
    } catch (err) {
      dispatch({ type: LOAD_FOOTER_INFO_FAILURE })
      dispatch(
        setFlashMessage(
          `โหลดช่องทางติดต่อสำนักงาน ก.พ. ไม่สำเร็จ เกิดข้อผิดพลาด ${err?.response?.status}`,
          'error'
        )
      )
    }
  }
}

export {
  SET_FLASH_MESSAGE,
  CLEAR_FLASH_MESSAGE,
  SET_LEARN_EXIT_DIALOG,
  LOAD_FOOTER_INFO_REQUEST,
  LOAD_FOOTER_INFO_SUCCESS,
  LOAD_FOOTER_INFO_FAILURE,
  setFlashMessage,
  clearFlashMessage,
  setLearnExitDialog,
  loadFooterInfo,
}
