import {
  LOAD_OCSC_SEVICES_REQUEST,
  LOAD_OCSC_SEVICES_SUCCESS,
  LOAD_OCSC_SEVICES_FAILURE,
  EDIT_USER_INFO_REQUEST,
  EDIT_USER_INFO_SUCCESS,
  EDIT_USER_INFO_FAILURE,
} from './actions'
const initialState = {
  isLoading: false,
  ocscServices: {},
}

export default function (state = initialState, action: any) {
  switch (action.type) {
    case LOAD_OCSC_SEVICES_REQUEST:
      return { ...state, isLoading: true, ocscServices: {} }
    case EDIT_USER_INFO_REQUEST:
      return { ...state, isLoading: true }
    case LOAD_OCSC_SEVICES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        ocscServices: action.payload.ocscServices,
      }
    case EDIT_USER_INFO_SUCCESS:
      return {
        ...state,
        isLoading: false,
      }
    case LOAD_OCSC_SEVICES_FAILURE:
    case EDIT_USER_INFO_FAILURE:
      return {
        ...state,
        isLoading: false,
      }
    default:
      return state
  }
}
