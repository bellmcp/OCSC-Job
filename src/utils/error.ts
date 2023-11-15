import { get, isEmpty } from 'lodash'
import * as uiActions from 'modules/ui/actions'

export const handleApiError = (err: any, dispatch: any) => {
  const errorMessagefromAPI = get(err, 'response.data.mesg', '')
  if (!isEmpty(errorMessagefromAPI)) {
    dispatch(
      uiActions.setFlashMessage(
        `<b>เกิดข้อผิดพลาด</b><br/>${errorMessagefromAPI}`,
        'error'
      )
    )
  } else {
    const status = get(err, 'response.status', '')
    const title = get(err, 'response.data.title', '')
    const message = get(err, 'message', 'โปรดลองใหม่อีกครั้ง')
    dispatch(
      uiActions.setFlashMessage(
        `<b>เกิดข้อผิดพลาด ${status}</b><br/>${
          !isEmpty(title) ? title : message
        }`,
        'error'
      )
    )
  }
}
