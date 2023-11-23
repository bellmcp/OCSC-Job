import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'

import PersonLetterWorker from './worker/components/PersonLetterWorker'

export default function Routes() {
  const { path } = useRouteMatch()

  return (
    <Switch>
      {/* Check condition Worker or Supervisor */}
      <Route path={`${path}`}>
        <PersonLetterWorker />
      </Route>
    </Switch>
  )
}
