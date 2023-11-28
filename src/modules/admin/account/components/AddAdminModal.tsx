import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'
import * as yup from 'yup'
import MaskedInput from 'react-text-mask'

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
  Input,
} from '@material-ui/core'
import Stack from '@mui/material/Stack'

import * as adminActions from 'modules/admin/actions'

interface AddAdminModalProps {
  open: boolean
  handleClose: () => void
  ministryId: number
  departmentId: number
}

function TextMaskCitizenID(props: any) {
  const { inputRef, ...other } = props
  return (
    <MaskedInput
      {...other}
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null)
      }}
      mask={[
        /\d/,
        '-',
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        '-',
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        '-',
        /\d/,
        /\d/,
        '-',
        /\d/,
      ]}
      placeholderChar='_'
      placeholder='0-0000-00000-00-0'
    />
  )
}

export default function AddAdminModal({
  open,
  handleClose,
  ministryId,
  departmentId,
}: AddAdminModalProps) {
  const dispatch = useDispatch()
  const theme = useTheme()

  const note = (
    <span style={{ color: theme.palette.error.main, marginLeft: 2 }}>*</span>
  )

  const { roles = [] } = useSelector((state: any) => state.info)
  const getRoleByKey = (key: string) => {
    return roles[key] || ''
  }

  const validationSchema = yup.object({})
  const formik = useFormik({
    initialValues: {
      role: 'administrator',
      nationalId: '',
      title: '',
      firstName: '',
      lastName: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(
        adminActions.addAdminAccount(
          {
            ...values,
            nationalId: values.nationalId.replaceAll('-', '') || '',
            ministryId,
            departmentId,
          },
          onCloseModal
        )
      )
    },
  })

  const onCloseModal = () => {
    handleClose()
    formik.resetForm()
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
          <Grid container alignItems='flex-end' justify='space-between'>
            <Typography
              color='secondary'
              variant='h6'
              style={{ fontWeight: 600 }}
            >
              เพิ่มผู้ดูแลระบบ
            </Typography>
            <Typography
              variant='body2'
              color='error'
              style={{ fontWeight: 500 }}
            >
              <b>*</b> จำเป็น
            </Typography>
          </Grid>
        </DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2}>
            <Grid container alignItems='center'>
              <Grid item xs={12} md={6}>
                <Typography
                  variant='body1'
                  color='textSecondary'
                  style={{ fontWeight: 600 }}
                >
                  บทบาท
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth size='small'>
                  <Select
                    disabled
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
                  เลขประจำตัวประชาชน{note}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Input
                  id='nationalId'
                  name='nationalId'
                  value={formik.values.nationalId}
                  onChange={formik.handleChange}
                  fullWidth
                  inputComponent={TextMaskCitizenID}
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
                  คำนำหน้า{note}
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
                  ชื่อ{note}
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
                  นามสกุล{note}
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
            autoFocus
            type='submit'
            disabled={
              formik.values.nationalId === '' ||
              formik.values.nationalId.includes('_') ||
              formik.values.title === '' ||
              formik.values.firstName === '' ||
              formik.values.lastName === ''
            }
          >
            บันทึก
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
