import {
  LOAD_COUNTRIES_REQUEST,
  LOAD_COUNTRIES_SUCCESS,
  LOAD_COUNTRIES_FAILURE,
  LOAD_SALARY_GROUPS_REQUEST,
  LOAD_SALARY_GROUPS_SUCCESS,
  LOAD_SALARY_GROUPS_FAILURE,
  LOAD_EDUCATION_LEVELS_REQUEST,
  LOAD_EDUCATION_LEVELS_SUCCESS,
  LOAD_EDUCATION_LEVELS_FAILURE,
  LOAD_UNIVERSITIES_REQUEST,
  LOAD_UNIVERSITIES_SUCCESS,
  LOAD_UNIVERSITIES_FAILURE,
  LOAD_CIRCULAR_LETTERS_REQUEST,
  LOAD_CIRCULAR_LETTERS_SUCCESS,
  LOAD_CIRCULAR_LETTERS_FAILURE,
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
  isUniversitiesLoading: false,
  countries: [],
  salaryGroups: [],
  educationLevels: [],
  universities: [],
  circularLetters: [],
  ministries: [],
  departments: [],
  department: {},
  roles: [],
}

export default function (state = initialState, action: any) {
  switch (action.type) {
    case LOAD_COUNTRIES_REQUEST:
      return { ...state, isLoading: true, countries: [] }
    case LOAD_SALARY_GROUPS_REQUEST:
      return { ...state, isLoading: true, salaryGroups: [] }
    case LOAD_EDUCATION_LEVELS_REQUEST:
      return { ...state, isLoading: true, educationLevels: [] }
    case LOAD_UNIVERSITIES_REQUEST:
      return { ...state, isUniversitiesLoading: true, universities: [] }
    case LOAD_CIRCULAR_LETTERS_REQUEST:
      return { ...state, isLoading: true, circularLetters: [] }
    case LOAD_MINISTRIES_REQUEST:
      return { ...state, isLoading: true, ministries: [] }
    case LOAD_DEPARTMENTS_BY_MINISTRY_ID_REQUEST:
    case LOAD_DEPARTMENTS_REQUEST:
      return { ...state, isLoading: true, departments: [] }
    case LOAD_DEPARTMENT_REQUEST:
      return { ...state, isLoading: true, department: [] }
    case LOAD_ROLES_REQUEST:
      return { ...state, isLoading: true, roles: [] }
    case LOAD_COUNTRIES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        countries: action.payload.countries,
      }
    case LOAD_SALARY_GROUPS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        salaryGroups: action.payload.salaryGroups,
      }
    case LOAD_EDUCATION_LEVELS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        educationLevels: action.payload.educationLevels,
      }
    case LOAD_UNIVERSITIES_SUCCESS:
      return {
        ...state,
        isUniversitiesLoading: false,
        universities: action.payload.universities,
      }
    case LOAD_CIRCULAR_LETTERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        circularLetters: action.payload.circularLetters,
      }
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
    case LOAD_COUNTRIES_FAILURE:
    case LOAD_SALARY_GROUPS_FAILURE:
    case LOAD_EDUCATION_LEVELS_FAILURE:
    case LOAD_CIRCULAR_LETTERS_FAILURE:
    case LOAD_MINISTRIES_FAILURE:
    case LOAD_DEPARTMENTS_FAILURE:
    case LOAD_DEPARTMENTS_BY_MINISTRY_ID_FAILURE:
    case LOAD_DEPARTMENT_FAILURE:
    case LOAD_ROLES_FAILURE:
      return { ...state, isLoading: false }
    case LOAD_UNIVERSITIES_FAILURE:
      return { ...state, isUniversitiesLoading: false }
    default:
      return state
  }
}
