import React from 'react'
import { useDispatch } from 'react-redux'

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@material-ui/core'

import * as adminActions from 'modules/admin/actions'

export default function DeleteAdminModal({
  open,
  data,
  handleClose,
  ministryId,
  departmentId,
}: any) {
  const dispatch = useDispatch()

  const handleAccept = () => {
    dispatch(
      adminActions.deleteAdminAccount(
        data.id,
        ministryId,
        departmentId,
        handleClose
      )
    )
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>ลบผู้ดูแลระบบ?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          คุณแน่ใจหรือไม่ ว่าต้องการลบผู้ดูแลระบบ{' '}
          <span style={{ fontWeight: 500 }}>
            {data.title} {data.firstName} {data.lastName}
          </span>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color='default'>
          ยกเลิก
        </Button>
        <Button
          variant='contained'
          onClick={handleAccept}
          color='secondary'
          autoFocus
        >
          ยืนยัน
        </Button>
      </DialogActions>
    </Dialog>
  )
}
