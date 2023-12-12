import {
  LOAD_AUTHENTICATE_WITH_DOPA_REQUEST,
  LOAD_AUTHENTICATE_WITH_DOPA_SUCCESS,
  LOAD_AUTHENTICATE_WITH_DOPA_FAILURE,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILURE,
  CLEAR_DOPA_TOKEN,
} from './actions'
const initialState = {
  isLoading: false,
  dopaToken: '',
}

export default function (state = initialState, action: any) {
  switch (action.type) {
    case CLEAR_DOPA_TOKEN:
      return { ...state, dopaToken: '' }
    case LOAD_AUTHENTICATE_WITH_DOPA_REQUEST:
      return { ...state, isLoading: true, dopaToken: '' }
    case RESET_PASSWORD_REQUEST:
      return { ...state, isLoading: true }
    case LOAD_AUTHENTICATE_WITH_DOPA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        dopaToken: action.payload.dopaToken,
      }
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        isLoading: false,
      }
    case LOAD_AUTHENTICATE_WITH_DOPA_FAILURE:
      return {
        ...state,
        isLoading: false,
      }
    case RESET_PASSWORD_FAILURE:
      return {
        ...state,
        isLoading: false,
      }
    default:
      return state
  }
}
