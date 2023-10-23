import {
  GET_PERSON_LETTER_REQUEST,
  GET_PERSON_LETTER_SUCCESS,
  GET_PERSON_LETTER_FAILURE,
  LOAD_WORKERS_REQUEST,
  LOAD_WORKERS_SUCCESS,
  LOAD_WORKERS_FAILURE,
  LOAD_WORK_STATUS_REQUEST,
  LOAD_WORK_STATUS_SUCCESS,
  LOAD_WORK_STATUS_FAILURE,
  ADD_PERSON_LETTER_REQUEST,
  ADD_PERSON_LETTER_SUCCESS,
  ADD_PERSON_LETTER_FAILURE,
  EDIT_PERSON_LETTER_REQUEST,
  EDIT_PERSON_LETTER_SUCCESS,
  EDIT_PERSON_LETTER_FAILURE,
  UPLOAD_FILE_REQUEST,
  UPLOAD_FILE_SUCCESS,
  UPLOAD_FILE_FAILURE,
  CLEAR_SEARCH_RESULT,
  LOAD_PERSON_LETTER_DEGREES_REQUEST,
  LOAD_PERSON_LETTER_DEGREES_SUCCESS,
  LOAD_PERSON_LETTER_DEGREES_FAILURE,
  EDIT_PERSON_LETTER_DEGREE_REQUEST,
  EDIT_PERSON_LETTER_DEGREE_SUCCESS,
  EDIT_PERSON_LETTER_DEGREE_FAILURE,
  LOAD_PERSON_LETTER_CATEGORIES_REQUEST,
  LOAD_PERSON_LETTER_CATEGORIES_SUCCESS,
  LOAD_PERSON_LETTER_CATEGORIES_FAILURE,
} from './actions'

const initialState = {
  isSearching: false,
  isSubmitting: false,
  isLoadingDegrees: false,
  searchResults: [],
  submitResponse: [],
  workers: [],
  workStatus: [],
  personLetterDegrees: [],
  personLetterCategories: [],
}

export default function (state = initialState, action: any) {
  switch (action.type) {
    case GET_PERSON_LETTER_REQUEST:
      return { ...state, isSearching: true, searchResults: [] }
    case GET_PERSON_LETTER_SUCCESS:
      return {
        ...state,
        isSearching: false,
        searchResults: action.payload.searchResults,
      }
    case GET_PERSON_LETTER_FAILURE:
      return { ...state, isSearching: false }
    case LOAD_WORKERS_REQUEST:
      return { ...state, workers: [] }
    case LOAD_WORKERS_SUCCESS:
      return {
        ...state,
        workers: action.payload.workers,
      }
    case LOAD_WORKERS_FAILURE:
      return { ...state }
    case LOAD_WORK_STATUS_REQUEST:
      return { ...state, workStatus: [] }
    case LOAD_WORK_STATUS_SUCCESS:
      return {
        ...state,
        workStatus: action.payload.workStatus,
      }
    case LOAD_WORK_STATUS_FAILURE:
      return { ...state }
    case ADD_PERSON_LETTER_REQUEST:
      return { ...state, isSubmitting: true, submitResponse: [] }
    case ADD_PERSON_LETTER_SUCCESS:
      return {
        ...state,
        isSubmitting: false,
        submitResponse: action.payload.submitResponse,
      }
    case ADD_PERSON_LETTER_FAILURE:
      return { ...state, isSubmitting: false }
    case EDIT_PERSON_LETTER_REQUEST:
      return { ...state, isSubmitting: true, submitResponse: [] }
    case EDIT_PERSON_LETTER_SUCCESS:
      return {
        ...state,
        isSubmitting: false,
        submitResponse: action.payload.submitResponse,
      }
    case EDIT_PERSON_LETTER_FAILURE:
      return { ...state, isSubmitting: false }
    case UPLOAD_FILE_REQUEST:
      return { ...state, isSubmitting: true, submitResponse: [] }
    case UPLOAD_FILE_SUCCESS:
      return {
        ...state,
        isSubmitting: false,
        submitResponse: action.payload.submitResponse,
      }
    case UPLOAD_FILE_FAILURE:
      return { ...state, isSubmitting: false }
    case CLEAR_SEARCH_RESULT:
      return { ...state, searchResults: [] }
    case LOAD_PERSON_LETTER_DEGREES_REQUEST:
      return { ...state, personLetterDegrees: [], isLoadingDegrees: true }
    case LOAD_PERSON_LETTER_DEGREES_SUCCESS:
      return {
        ...state,
        personLetterDegrees: action.payload.personLetterDegrees,
        isLoadingDegrees: false,
      }
    case LOAD_PERSON_LETTER_DEGREES_FAILURE:
      return {
        ...state,
        isLoadingDegrees: false,
      }
    case EDIT_PERSON_LETTER_DEGREE_REQUEST:
      return { ...state, isSubmitting: true, submitResponse: [] }
    case EDIT_PERSON_LETTER_DEGREE_SUCCESS:
      return {
        ...state,
        isSubmitting: false,
        submitResponse: action.payload.submitResponse,
      }
    case EDIT_PERSON_LETTER_DEGREE_FAILURE:
      return { ...state, isSubmitting: false }
    case LOAD_PERSON_LETTER_CATEGORIES_REQUEST:
      return { ...state, personLetterCategories: [] }
    case LOAD_PERSON_LETTER_CATEGORIES_SUCCESS:
      return {
        ...state,
        personLetterCategories: action.payload.personLetterCategories,
      }
    case LOAD_PERSON_LETTER_CATEGORIES_FAILURE:
      return {
        ...state,
      }
    default:
      return state
  }
}
