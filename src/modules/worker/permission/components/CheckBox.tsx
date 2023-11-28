import React, { useState, ChangeEvent, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { Checkbox } from '@material-ui/core'

import * as workerActions from 'modules/worker/actions'

export default function CheckBox({
  isLoading,
  permission,
  agencyId,
  ocscServiceId,
  ministryId,
  departmentId,
}: any) {
  const [checked, setChecked] = useState<boolean>(false)
  const dispatch = useDispatch()

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked)
    if (event.target.checked) {
      dispatch(
        workerActions.enableWorkerPermission(
          agencyId,
          ocscServiceId,
          ministryId,
          departmentId
        )
      )
    } else {
      dispatch(
        workerActions.disableWorkerPermission(
          agencyId,
          ocscServiceId,
          ministryId,
          departmentId
        )
      )
    }
  }

  useEffect(() => {
    setChecked(permission)
  }, [permission])

  return (
    <Checkbox disabled={isLoading} checked={checked} onChange={handleChange} />
  )
}
