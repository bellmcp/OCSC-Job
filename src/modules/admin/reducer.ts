import {
  LOAD_OCSC_SEVICES_REQUEST,
  LOAD_OCSC_SEVICES_SUCCESS,
  LOAD_OCSC_SEVICES_FAILURE,
  LOAD_ADMIN_PERMISSIONS_REQUEST,
  LOAD_ADMIN_PERMISSIONS_SUCCESS,
  LOAD_ADMIN_PERMISSIONS_FAILURE,
} from './actions'
const initialState = {
  isLoading: false,
  isPermissionLoading: false,
  ocscServices: [],
  adminPermissions: [],
}

export default function (state = initialState, action: any) {
  switch (action.type) {
    case LOAD_OCSC_SEVICES_REQUEST:
      return { ...state, isLoading: true, ocscServices: [] }
    case LOAD_ADMIN_PERMISSIONS_REQUEST:
      return { ...state, isPermissionLoading: true, adminPermissions: [] }
    case LOAD_OCSC_SEVICES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        ocscServices: action.payload.ocscServices,
      }
    case LOAD_ADMIN_PERMISSIONS_SUCCESS:
      return {
        ...state,
        isPermissionLoading: false,
        adminPermissions: action.payload.adminPermissions,
      }
    case LOAD_ADMIN_PERMISSIONS_FAILURE:
      return { ...state, isPermissionLoading: false }
    case LOAD_OCSC_SEVICES_FAILURE:
      return {
        ...state,
        isLoading: false,
      }
    default:
      return state
  }
}
