import {
  LOAD_AUTHENTICATE_WITH_DOPA_REQUEST,
  LOAD_AUTHENTICATE_WITH_DOPA_SUCCESS,
  LOAD_AUTHENTICATE_WITH_DOPA_FAILURE,
} from './actions'
const initialState = {
  isLoading: false,
  dopaToken: '',
}

export default function (state = initialState, action: any) {
  switch (action.type) {
    case LOAD_AUTHENTICATE_WITH_DOPA_REQUEST:
      return { ...state, isLoading: true, dopaToken: '' }
    case LOAD_AUTHENTICATE_WITH_DOPA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        dopaToken: action.payload.dopaToken,
      }
    case LOAD_AUTHENTICATE_WITH_DOPA_FAILURE:
      return {
        ...state,
        isLoading: false,
        dopaToken: action.payload.dopaToken,
      }
    default:
      return state
  }
}
