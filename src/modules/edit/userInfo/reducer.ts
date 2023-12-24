import {
  LOAD_USER_INFO_REQUEST,
  LOAD_USER_INFO_SUCCESS,
  LOAD_USER_INFO_FAILURE,
  EDIT_USER_INFO_REQUEST,
  EDIT_USER_INFO_SUCCESS,
  EDIT_USER_INFO_FAILURE,
  UPLOAD_FILE_SUCCESS,
  UPLOAD_FILE_FAILURE,
} from './actions'

const initialState = {
  isLoading: false,
  userInfo: {},
  uploadFile: '',
}

export default function (state = initialState, action: any) {
  switch (action.type) {
    case LOAD_USER_INFO_REQUEST:
      return { ...state, isLoading: true, userInfo: {} }
    case EDIT_USER_INFO_REQUEST:
      return { ...state, isLoading: true }
    case LOAD_USER_INFO_SUCCESS:
      return {
        ...state,
        isLoading: false,
        userInfo: action.payload.userInfo,
      }
    case EDIT_USER_INFO_SUCCESS:
      return {
        ...state,
        isLoading: false,
      }
    case UPLOAD_FILE_SUCCESS:
      return {
        ...state,
        uploadFile: action.payload.uploadFile,
      }
    case LOAD_USER_INFO_FAILURE:
    case UPLOAD_FILE_FAILURE:
    case EDIT_USER_INFO_FAILURE:
      return {
        ...state,
        isLoading: false,
      }
    default:
      return state
  }
}
