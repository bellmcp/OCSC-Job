import {
  LOAD_MINISTRIES_REQUEST,
  LOAD_MINISTRIES_SUCCESS,
  LOAD_MINISTRIES_FAILURE,
  LOAD_DEPARTMENTS_REQUEST,
  LOAD_DEPARTMENTS_SUCCESS,
  LOAD_DEPARTMENTS_FAILURE,
  LOAD_DEPARTMENTS_BY_MINISTRY_ID_REQUEST,
  LOAD_DEPARTMENTS_BY_MINISTRY_ID_SUCCESS,
  LOAD_DEPARTMENTS_BY_MINISTRY_ID_FAILURE,
  LOAD_DEPARTMENT_REQUEST,
  LOAD_DEPARTMENT_SUCCESS,
  LOAD_DEPARTMENT_FAILURE,
  LOAD_ROLES_REQUEST,
  LOAD_ROLES_SUCCESS,
  LOAD_ROLES_FAILURE,
} from './actions'

const initialState = {
  isLoading: false,
  ministries: [],
  departments: [],
  department: {},
  roles: [],
}

export default function (state = initialState, action: any) {
  switch (action.type) {
    case LOAD_MINISTRIES_REQUEST:
      return { ...state, isLoading: true, ministries: [] }
    case LOAD_DEPARTMENTS_BY_MINISTRY_ID_REQUEST:
    case LOAD_DEPARTMENTS_REQUEST:
      return { ...state, isLoading: true, departments: [] }
    case LOAD_DEPARTMENT_REQUEST:
      return { ...state, isLoading: true, department: [] }
    case LOAD_ROLES_REQUEST:
      return { ...state, isLoading: true, roles: [] }
    case LOAD_MINISTRIES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        ministries: action.payload.ministries,
      }
    case LOAD_DEPARTMENTS_BY_MINISTRY_ID_SUCCESS:
    case LOAD_DEPARTMENTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        departments: action.payload.departments,
      }
    case LOAD_DEPARTMENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        department: action.payload.department,
      }
    case LOAD_ROLES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        roles: action.payload.roles,
      }
    case LOAD_MINISTRIES_FAILURE:
    case LOAD_DEPARTMENTS_FAILURE:
    case LOAD_DEPARTMENTS_BY_MINISTRY_ID_FAILURE:
    case LOAD_DEPARTMENT_FAILURE:
    case LOAD_ROLES_FAILURE:
      return { ...state, isLoading: false }
    default:
      return state
  }
}
