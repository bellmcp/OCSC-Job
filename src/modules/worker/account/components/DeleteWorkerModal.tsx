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

import * as workerActions from 'modules/worker/actions'

export default function DeleteWorkerModal({
  open,
  data,
  handleClose,
  ministryId,
  departmentId,
}: any) {
  const dispatch = useDispatch()

  const handleAccept = () => {
    dispatch(
      workerActions.deleteWorkerAccount(data.id, ministryId, departmentId)
    )
    handleClose()
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>ลบผู้ปฏิบัติงาน?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          คุณแน่ใจหรือไม่ ว่าต้องการลบผู้ปฏิบัติงาน{' '}
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
