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
import AdminAccount from 'modules/admin/account/components/AdminAccount'
import AdminPermission from 'modules/admin/permission/components/AdminPermission'
import WorkerAccount from 'modules/worker/account/components/WorkerAccount'
import WorkerPermission from 'modules/worker/permission/components/WorkerPermission'

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
        component={AdminAccount}
        path={`${PATH}/administrator`}
      />
      <PrivateRoute
        exact
        component={AdminPermission}
        path={`${PATH}/administrator-permission`}
      />
      <PrivateRoute exact component={WorkerAccount} path={`${PATH}/user`} />
      <PrivateRoute
        exact
        component={WorkerPermission}
        path={`${PATH}/user-permission`}
      />
      <Redirect to={`${PATH}`}></Redirect>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  )
}
