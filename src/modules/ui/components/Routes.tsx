import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import PrivateRoute from 'modules/routes/PrivateRoute'

import Login from 'modules/login/components/Login'
import Register from 'modules/register/components/Register'
import Forgot from 'modules/forgot/components/Forgot'
import Home from 'modules/home/components/Home'
import EditUserInfo from 'modules/edit/userInfo/components/EditUserInfo'
import EditAgencyInfo from 'modules/edit/agencyInfo/components/EditAgencyInfo'
import ChangePassword from 'modules/edit/password/components/ChangePassword'
import AdminPermission from 'modules/admin/permission/components/AdminPermission'
// import PersonLetterRoutes from 'modules/personLetter/Routes'
// import SearchRoutes from 'modules/search/Routes'
// import CurriculumRoutes from 'modules/curriculum/Routes'
// import InfoRoutes from 'modules/info/Routes'
// import PasswordRoutes from 'modules/edit/password/components/Routes'

import NotFound from './NotFound'

const PATH = process.env.REACT_APP_BASE_PATH

export default function Routes() {
  return (
    <Switch>
      <Route exact path={`${PATH}/login`}>
        <Login />
      </Route>
      <Route exact path={`${PATH}/register`}>
        <Register />
      </Route>
      <Route exact path={`${PATH}/forgot`}>
        <Forgot />
      </Route>
      {/* <PrivateRoute path={`${PATH}/search`} component={SearchRoutes} />
      <PrivateRoute path={`${PATH}/curriculum`} component={CurriculumRoutes} />
      <PrivateRoute path={`${PATH}/info`} component={InfoRoutes} /> */}
      <PrivateRoute exact path={`${PATH}`} component={Home} />
      <PrivateRoute
        exact
        component={EditUserInfo}
        path={`${PATH}/edit-user-info`}
      />
      <PrivateRoute
        exact
        component={EditAgencyInfo}
        path={`${PATH}/edit-agency-info`}
      />
      <PrivateRoute
        exact
        component={ChangePassword}
        path={`${PATH}/change-password`}
      />
      <PrivateRoute
        exact
        component={AdminPermission}
        path={`${PATH}/administrator-permission`}
      />
      <Redirect to={`${PATH}`}></Redirect>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  )
}
