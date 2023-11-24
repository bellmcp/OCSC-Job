import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'
import { get } from 'lodash'
import * as yup from 'yup'
import { useTheme } from '@material-ui/core/styles'
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Typography,
  Grid,
  TextField,
  Button,
  FormControl,
  Select,
  MenuItem,
} from '@material-ui/core'
import Stack from '@mui/material/Stack'

import * as workerActions from 'modules/worker/actions'

interface EditWorkerModalProps {
  data: any
  open: boolean
  handleClose: () => void
  ministryId: number
  departmentId: number
}

export default function EditWorkerModal({
  data,
  open,
  handleClose,
  ministryId,
  departmentId,
}: EditWorkerModalProps) {
  const dispatch = useDispatch()
  const theme = useTheme()

  const validationSchema = yup.object({})
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      role: 'worker',
      nationalId: get(data, 'nationalId', ''),
      title: get(data, 'title', ''),
      firstName: get(data, 'firstName', ''),
      lastName: get(data, 'lastName', ''),
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(
        workerActions.editWorkerAccount(
          values,
          get(data, 'id', ''),
          ministryId,
          departmentId
        )
      )
      onCloseModal()
    },
  })

  const onCloseModal = () => {
    handleClose()
    formik.resetForm()
  }

  const { roles = [] } = useSelector((state: any) => state.info)
  const getRoleByKey = (key: string) => {
    return roles[key] || ''
  }

  return (
    <Dialog
      open={open}
      onClose={onCloseModal}
      PaperProps={{
        style: { borderRadius: 16, padding: 8 },
      }}
      fullWidth
      maxWidth='sm'
    >
      <form onSubmit={formik.handleSubmit}>
        <DialogTitle>
          <Typography
            color='secondary'
            variant='h6'
            style={{ fontWeight: 600 }}
          >
            แก้ไขผู้ปฏิบัติงาน
          </Typography>
        </DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2}>
            <Grid container alignItems='center'>
              <Grid item xs={12} md={6}>
                <Typography
                  variant='body1'
                  color='textPrimary'
                  style={{ fontWeight: 600 }}
                >
                  บทบาท
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth size='small'>
                  <Select
                    id='role'
                    name='role'
                    value={formik.values.role}
                    onChange={formik.handleChange}
                    variant='outlined'
                    displayEmpty
                    MenuProps={{
                      anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'left',
                      },
                      transformOrigin: {
                        vertical: 'top',
                        horizontal: 'left',
                      },
                      getContentAnchorEl: null,
                    }}
                    renderValue={(selected: any) => {
                      if (selected === null) {
                        return (
                          <span style={{ color: theme.palette.text.secondary }}>
                            เลือกบทบาท
                          </span>
                        )
                      }
                      return getRoleByKey(selected)
                    }}
                  >
                    {Object.entries(roles).map(([key, value]: any) => (
                      <MenuItem value={key}>{value}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Grid container alignItems='center'>
              <Grid item xs={12} md={6}>
                <Typography
                  variant='body1'
                  color='textPrimary'
                  style={{ fontWeight: 600 }}
                >
                  เลขประจำตัวประชาชน
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id='nationalId'
                  name='nationalId'
                  value={formik.values.nationalId}
                  onChange={formik.handleChange}
                  variant='outlined'
                  size='small'
                  fullWidth
                />
              </Grid>
            </Grid>
            <Grid container alignItems='center'>
              <Grid item xs={12} md={6}>
                <Typography
                  variant='body1'
                  color='textPrimary'
                  style={{ fontWeight: 600 }}
                >
                  คำนำหน้า
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id='title'
                  name='title'
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  variant='outlined'
                  size='small'
                  fullWidth
                />
              </Grid>
            </Grid>
            <Grid container alignItems='center'>
              <Grid item xs={12} md={6}>
                <Typography
                  variant='body1'
                  color='textPrimary'
                  style={{ fontWeight: 600 }}
                >
                  ชื่อ
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id='firstName'
                  name='firstName'
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  variant='outlined'
                  size='small'
                  fullWidth
                />
              </Grid>
            </Grid>
            <Grid container alignItems='center'>
              <Grid item xs={12} md={6}>
                <Typography
                  variant='body1'
                  color='textPrimary'
                  style={{ fontWeight: 600 }}
                >
                  นามสกุล
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id='lastName'
                  name='lastName'
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  variant='outlined'
                  size='small'
                  fullWidth
                />
              </Grid>
            </Grid>
          </Stack>
        </DialogContent>
        <DialogActions style={{ paddingTop: 16 }}>
          <Button onClick={onCloseModal} variant='outlined'>
            ยกเลิก
          </Button>
          <Button
            color='secondary'
            variant='contained'
            type='submit'
            disabled={!formik.dirty}
          >
            บันทึก
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
