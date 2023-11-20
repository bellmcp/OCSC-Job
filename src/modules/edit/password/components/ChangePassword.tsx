// @ts-nocheck
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useHistory } from 'react-router-dom'

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import {
  Container,
  Typography,
  Grid,
  Box,
  Button,
  TextField,
  Paper,
  Toolbar,
  InputAdornment,
  IconButton,
} from '@material-ui/core'
import {
  ChevronRight as ChevronRightIcon,
  ChevronLeft as ChevronLeftIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from '@material-ui/icons'

import * as changePasswordActions from 'modules/edit/password/actions'

const PATH = process.env.REACT_APP_BASE_PATH

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      padding: theme.spacing(4, 0),
      [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(4, 4),
      },
    },
    sectionTitle: {
      fontSize: '1.7rem',
      fontWeight: 600,
      lineHeight: '1.3',
      zIndex: 3,
      color: theme.palette.secondary.main,
    },
    seeAllButton: {
      marginBottom: '0.35em',
      zIndex: 3,
    },
    root: {
      position: 'fixed',
      bottom: theme.spacing(4),
      right: theme.spacing(4),
    },
  })
)

export default function Register() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()

  const validationSchema = yup.object({})

  const changePasswordForm = useFormik({
    enableReinitialize: true,
    initialValues: {
      currentPassword: '',
      password1: '',
      password2: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(
        changePasswordActions.changePassword({
          currentPassword: values.currentPassword,
          password1: values.password1,
          password2: values.password2,
        })
      )
    },
  })

  const onBack = () => {
    history.push(`${PATH}/`)
  }

  const isChangePasswordFormValid = () => {
    return (
      changePasswordForm.values.currentPassword !== '' &&
      changePasswordForm.values.password1 !== '' &&
      changePasswordForm.values.password2 !== ''
    )
  }

  const [values, setValues] = useState({
    showCurrentPassword: false,
    showPassword: false,
    showConfirmPassword: false,
  })

  const handleClickShowCurrentPassword = () => {
    setValues({ ...values, showCurrentPassword: !values.showCurrentPassword })
  }

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const handleClickShowConfirmPassword = () => {
    setValues({ ...values, showConfirmPassword: !values.showConfirmPassword })
  }

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
  }

  return (
    <>
      <Toolbar id='back-to-top-anchor' />
      <Container maxWidth='sm' className={classes.content}>
        <Button
          variant='text'
          color='primary'
          onClick={onBack}
          style={{ marginLeft: '-8px', marginBottom: 12 }}
          startIcon={<ChevronLeftIcon />}
        >
          กลับ
        </Button>
        <Typography
          component='h1'
          variant='h4'
          color='secondary'
          style={{ fontWeight: 600, marginBottom: 24 }}
        >
          เปลี่ยนรหัสผ่าน
        </Typography>

        <form onSubmit={changePasswordForm.handleSubmit}>
          <Box mt={2} mb={4}>
            <Paper
              elevation={0}
              style={{
                borderRadius: 16,
                padding: 24,
                boxShadow: '0 0 20px 0 rgba(204,242,251,0.3)',
                border: '1px solid rgb(204 242 251)',
              }}
            >
              <Grid container item spacing={2}>
                <Grid container item direction='row' alignItems='center'>
                  <Grid xs={12} md={6}>
                    <Typography
                      variant='body1'
                      color='textPrimary'
                      style={{ fontWeight: 600 }}
                    >
                      รหัสผ่านปัจจุบัน
                    </Typography>
                  </Grid>
                  <Grid xs={12} md={6}>
                    <TextField
                      id='currentPassword'
                      name='currentPassword'
                      value={changePasswordForm.values.currentPassword}
                      onChange={changePasswordForm.handleChange}
                      variant='outlined'
                      size='small'
                      fullWidth
                      type={values.showCurrentPassword ? 'text' : 'password'}
                      autoComplete='new-password'
                      placeholder='รหัสผ่านปัจจุบัน'
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position='end'>
                            <IconButton
                              size='small'
                              onClick={handleClickShowCurrentPassword}
                              onMouseDown={handleMouseDownPassword}
                            >
                              {values.showCurrentPassword ? (
                                <VisibilityIcon style={{ fontSize: 18 }} />
                              ) : (
                                <VisibilityOffIcon style={{ fontSize: 18 }} />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid container item direction='row' alignItems='center'>
                  <Grid xs={12} md={6}>
                    <Typography
                      variant='body1'
                      color='textPrimary'
                      style={{ fontWeight: 600 }}
                    >
                      รหัสผ่านใหม่
                    </Typography>
                  </Grid>
                  <Grid xs={12} md={6}>
                    <TextField
                      id='password1'
                      name='password1'
                      value={changePasswordForm.values.password1}
                      onChange={changePasswordForm.handleChange}
                      variant='outlined'
                      size='small'
                      fullWidth
                      type={values.showPassword ? 'text' : 'password'}
                      autoComplete='new-password'
                      placeholder='โปรดกำหนดรหัสผ่านใหม่'
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position='end'>
                            <IconButton
                              size='small'
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                            >
                              {values.showPassword ? (
                                <VisibilityIcon style={{ fontSize: 18 }} />
                              ) : (
                                <VisibilityOffIcon style={{ fontSize: 18 }} />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid container item direction='row' alignItems='center'>
                  <Grid xs={12} md={6}>
                    <Typography
                      variant='body1'
                      color='textPrimary'
                      style={{ fontWeight: 600 }}
                    >
                      ยืนยันรหัสผ่าน
                    </Typography>
                  </Grid>
                  <Grid xs={12} md={6}>
                    <TextField
                      id='password2'
                      name='password2'
                      value={changePasswordForm.values.password2}
                      onChange={changePasswordForm.handleChange}
                      variant='outlined'
                      size='small'
                      fullWidth
                      type={values.showConfirmPassword ? 'text' : 'password'}
                      autoComplete='new-password'
                      placeholder='โปรดยืนยันรหัสผ่าน'
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position='end'>
                            <IconButton
                              size='small'
                              onClick={handleClickShowConfirmPassword}
                              onMouseDown={handleMouseDownPassword}
                            >
                              {values.showConfirmPassword ? (
                                <VisibilityIcon style={{ fontSize: 18 }} />
                              ) : (
                                <VisibilityOffIcon style={{ fontSize: 18 }} />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
            <Button
              fullWidth
              disabled={!isChangePasswordFormValid()}
              variant='contained'
              color='secondary'
              size='large'
              endIcon={<ChevronRightIcon />}
              style={{ marginTop: 32 }}
              type='submit'
            >
              เปลี่ยนรหัสผ่าน
            </Button>
          </Box>
        </form>
      </Container>
    </>
  )
}
