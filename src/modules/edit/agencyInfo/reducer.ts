import {
  EDIT_AGENCY_INFO_REQUEST,
  EDIT_AGENCY_INFO_SUCCESS,
  EDIT_AGENCY_INFO_FAILURE,
} from './actions'
const initialState = {
  isLoading: false,
  agencyInfo: {},
}

export default function (state = initialState, action: any) {
  switch (action.type) {
    case EDIT_AGENCY_INFO_REQUEST:
      return { ...state, isLoading: true }
    case EDIT_AGENCY_INFO_SUCCESS:
      return {
        ...state,
        isLoading: false,
      }
    case EDIT_AGENCY_INFO_FAILURE:
      return {
        ...state,
        isLoading: false,
      }
    default:
      return state
  }
}
