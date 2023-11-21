import {
  LOAD_OCSC_SEVICES_REQUEST,
  LOAD_OCSC_SEVICES_SUCCESS,
  LOAD_OCSC_SEVICES_FAILURE,
  LOAD_ADMIN_PERMISSIONS_REQUEST,
  LOAD_ADMIN_PERMISSIONS_SUCCESS,
  LOAD_ADMIN_PERMISSIONS_FAILURE,
  EDIT_USER_INFO_REQUEST,
  EDIT_USER_INFO_SUCCESS,
  EDIT_USER_INFO_FAILURE,
} from './actions'
const initialState = {
  isLoading: false,
  ocscServices: [],
  adminPermissions: [],
}

export default function (state = initialState, action: any) {
  switch (action.type) {
    case LOAD_OCSC_SEVICES_REQUEST:
      return { ...state, isLoading: true, ocscServices: [] }
    case LOAD_ADMIN_PERMISSIONS_REQUEST:
      return { ...state, isLoading: true, adminPermissions: [] }
    case EDIT_USER_INFO_REQUEST:
      return { ...state, isLoading: true }
    case LOAD_OCSC_SEVICES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        ocscServices: action.payload.ocscServices,
      }
    case LOAD_ADMIN_PERMISSIONS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        adminPermissions: action.payload.adminPermissions,
      }
    case EDIT_USER_INFO_SUCCESS:
      return {
        ...state,
        isLoading: false,
      }
    case LOAD_OCSC_SEVICES_FAILURE:
    case LOAD_ADMIN_PERMISSIONS_FAILURE:
    case EDIT_USER_INFO_FAILURE:
      return {
        ...state,
        isLoading: false,
      }
    default:
      return state
  }
}
