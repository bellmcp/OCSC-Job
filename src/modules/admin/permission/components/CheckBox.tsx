import React, { useState, ChangeEvent, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { Checkbox } from '@material-ui/core'

import * as adminActions from 'modules/admin/actions'

export default function CheckBox({
  isLoading,
  permission,
  departmentId,
  ocscServiceId,
}: any) {
  const [checked, setChecked] = useState<boolean>(false)
  const dispatch = useDispatch()

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked)
    if (event.target.checked) {
      dispatch(adminActions.enableAdminPermission(departmentId, ocscServiceId))
    } else {
      dispatch(adminActions.disableAdminPermission(departmentId, ocscServiceId))
    }
  }

  useEffect(() => {
    setChecked(permission)
  }, [permission])

  return (
    <Checkbox disabled={isLoading} checked={checked} onChange={handleChange} />
  )
}
