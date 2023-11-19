import {
  LOAD_MENU_ITEMS_REQUEST,
  LOAD_MENU_ITEMS_SUCCESS,
  LOAD_MENU_ITEMS_FAILURE,
} from './actions'
const initialState = {
  isLoading: false,
  menuItems: [],
}

export default function (state = initialState, action: any) {
  switch (action.type) {
    case LOAD_MENU_ITEMS_REQUEST:
      return { ...state, isLoading: true, menuItems: [] }
    case LOAD_MENU_ITEMS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        menuItems: action.payload.menuItems,
      }
    case LOAD_MENU_ITEMS_FAILURE:
      return {
        ...state,
        isLoading: false,
        menuItems: [],
      }
    default:
      return state
  }
}
