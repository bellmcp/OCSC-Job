import {
  CHANGE_PASSWORD_REQUEST,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAILURE,
} from './actions'
const initialState = {
  isLoading: false,
}

export default function (state = initialState, action: any) {
  switch (action.type) {
    case CHANGE_PASSWORD_REQUEST:
      return { ...state, isLoading: true }
    case CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        isLoading: false,
      }
    case CHANGE_PASSWORD_FAILURE:
      return {
        ...state,
        isLoading: false,
      }
    default:
      return state
  }
}
