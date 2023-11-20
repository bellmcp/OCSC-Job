//@ts-nocheck
import axios from 'axios'
import * as uiActions from 'modules/ui/actions'
import { handleApiError } from 'utils/error'
import { push } from 'connected-react-router'
import { getCookie } from 'utils/cookies'

const PATH = process.env.REACT_APP_BASE_PATH

const EDIT_AGENCY_INFO_REQUEST =
  'ocsc-job/edit-agency-info/EDIT_AGENCY_INFO_REQUEST'
const EDIT_AGENCY_INFO_SUCCESS =
  'ocsc-job/edit-agency-info/EDIT_AGENCY_INFO_SUCCESS'
const EDIT_AGENCY_INFO_FAILURE =
  'ocsc-job/edit-agency-info/EDIT_AGENCY_INFO_FAILURE'

function editAgencyInfo(agencyInfo: any) {
  return async (dispatch: any) => {
    dispatch({ type: EDIT_AGENCY_INFO_REQUEST })
    const token = getCookie('token')
    const ministryId = getCookie('ministryId')
    const departmentId = getCookie('departmentId')
    try {
      const result = await axios.put(
        `/ministries/${ministryId}/departments/${departmentId}`,
        {
          phone: agencyInfo.phone,
          address: agencyInfo.address,
          website: agencyInfo.website,
        },
        {
          baseURL: process.env.REACT_APP_PORTAL_API_URL,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      console.log('result :>> ', result)
      dispatch({ type: EDIT_AGENCY_INFO_SUCCESS })
      dispatch(
        uiActions.setFlashMessage('แก้ไขข้อมูลหน่วยงานเรียบร้อยแล้ว', 'success')
      )
      dispatch(push(`${PATH}`))
    } catch (err) {
      dispatch({ type: EDIT_AGENCY_INFO_FAILURE })
      handleApiError(err, dispatch)
    }
  }
}

export {
  EDIT_AGENCY_INFO_REQUEST,
  EDIT_AGENCY_INFO_SUCCESS,
  EDIT_AGENCY_INFO_FAILURE,
  editAgencyInfo,
}
