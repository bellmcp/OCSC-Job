import { get, isEmpty } from 'lodash'
import * as uiActions from 'modules/ui/actions'

export const handleApiError = (err: any, dispatch: any) => {
  if (!isEmpty(get(err, 'response.data.mesg', ''))) {
    dispatch(uiActions.setFlashMessage(get(err, 'response.data.mesg'), 'error'))
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
