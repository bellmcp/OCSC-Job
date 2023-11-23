import {
  LOAD_OCSC_SEVICES_REQUEST,
  LOAD_OCSC_SEVICES_SUCCESS,
  LOAD_OCSC_SEVICES_FAILURE,
  LOAD_WORKER_PERMISSIONS_REQUEST,
  LOAD_WORKER_PERMISSIONS_SUCCESS,
  LOAD_WORKER_PERMISSIONS_FAILURE,
  LOAD_WORKER_ACCOUNTS_REQUEST,
  LOAD_WORKER_ACCOUNTS_SUCCESS,
  LOAD_WORKER_ACCOUNTS_FAILURE,
  ADD_WORKER_ACCOUNT_REQUEST,
  ADD_WORKER_ACCOUNT_SUCCESS,
  ADD_WORKER_ACCOUNT_FAILURE,
} from './actions'
const initialState = {
  isLoading: false,
  isPermissionLoading: false,
  ocscServices: [],
  workerPermissions: [],
  workerAccounts: [],
}

export default function (state = initialState, action: any) {
  switch (action.type) {
    case LOAD_OCSC_SEVICES_REQUEST:
      return { ...state, isLoading: true, ocscServices: [] }
    case LOAD_WORKER_PERMISSIONS_REQUEST:
      return { ...state, isPermissionLoading: true, workerPermissions: [] }
    case LOAD_WORKER_ACCOUNTS_REQUEST:
      return { ...state, isLoading: true, workerAccounts: [] }
    case ADD_WORKER_ACCOUNT_REQUEST:
      return { ...state, isLoading: true }
    case LOAD_OCSC_SEVICES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        ocscServices: action.payload.ocscServices,
      }
    case LOAD_WORKER_PERMISSIONS_SUCCESS:
      return {
        ...state,
        isPermissionLoading: false,
        workerPermissions: action.payload.workerPermissions,
      }
    case LOAD_WORKER_ACCOUNTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        workerAccounts: action.payload.workerAccounts,
      }
    case ADD_WORKER_ACCOUNT_SUCCESS:
      return { ...state, isLoading: false }
    case LOAD_WORKER_PERMISSIONS_FAILURE:
      return { ...state, isPermissionLoading: false }
    case LOAD_WORKER_ACCOUNTS_FAILURE:
      return {
        ...state,
        isLoading: false,
      }
    case ADD_WORKER_ACCOUNT_FAILURE:
      return {
        ...state,
        isLoading: false,
      }
    case LOAD_OCSC_SEVICES_FAILURE:
      return {
        ...state,
        isLoading: false,
      }
    default:
      return state
  }
}
