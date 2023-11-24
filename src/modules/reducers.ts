import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { loadingBarReducer } from 'react-redux-loading-bar'

import uiReducer from 'modules/ui/reducer'
import loginReducer from 'modules/login/reducer'
import registerReducer from 'modules/register/reducer'
import forgotReducer from 'modules/forgot/reducer'
import infoReducer from 'modules/info/reducer'
import homeReducer from 'modules/home/reducer'
import userInfoReducer from 'modules/edit/userInfo/reducer'
import agencyInfoReducer from 'modules/edit/agencyInfo/reducer'
import changePasswordReducer from 'modules/edit/password/reducer'
import adminReducer from 'modules/admin/reducer'
import workerReducer from 'modules/worker/reducer'

export default (history: any) =>
  combineReducers({
    router: connectRouter(history),
    loadingBar: loadingBarReducer,
    ui: uiReducer,
    login: loginReducer,
    register: registerReducer,
    forgot: forgotReducer,
    info: infoReducer,
    home: homeReducer,
    userInfo: userInfoReducer,
    agencyInfo: agencyInfoReducer,
    password: changePasswordReducer,
    admin: adminReducer,
    worker: workerReducer,
  })
