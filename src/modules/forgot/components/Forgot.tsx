// @ts-nocheck
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useHistory } from 'react-router-dom'
import MaskedInput from 'react-text-mask'

import {
  createStyles,
  makeStyles,
  Theme,
  useTheme,
  withStyles,
} from '@material-ui/core/styles'
import {
  Container,
  Typography,
  Grid,
  Box,
  Button,
  TextField,
  Paper,
  Toolbar,
  Input,
  Tooltip,
  Collapse,
  InputAdornment,
  IconButton,
} from '@material-ui/core'
import { Stack } from '@mui/material'
import {
  ChevronRight as ChevronRightIcon,
  ChevronLeft as ChevronLeftIcon,
  Help as HelpIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from '@material-ui/icons'

import * as forgotActions from 'modules/forgot/actions'
import DatePicker from './DatePicker'
import laserID from 'assets/images/laser-id.png'

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

function TextMaskCitizenID(props) {
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

function TextMaskLaserID(props) {
  const { inputRef, ...other } = props
  return (
    <MaskedInput
      {...other}
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null)
      }}
      mask={[
        /^[A-Z]$/,
        /^[A-Z]$/,
        /\d/,
        '-',
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        '-',
        /\d/,
        /\d/,
      ]}
      placeholderChar='_'
      placeholder='AA-00000000-00'
    />
  )
}

const LaserIDTooltip = withStyles({
  tooltip: {
    backgroundColor: 'transparent',
  },
})(Tooltip)

export default function Register() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()
  const theme = useTheme()

  const { dopaToken = '' } = useSelector((state: any) => state.forgot)

  const [birthDate, setBirthDate] = useState<string>(null)

  const validationSchema = yup.object({})
  const authenticateForm = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: '',
      firstName: '',
      lastName: '',
      birthDate: '',
      laser: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const buddhistYear = parseInt(birthDate.split('-')[0]) + 543
      const buddhistBirthDate = `${buddhistYear}-${birthDate.split('-')[1]}-${
        birthDate.split('-')[2]
      }`

      dispatch(
        forgotActions.authenticateWithDopa({
          id: values.id.replaceAll('-', '') || '',
          firstName: values.firstName,
          lastName: values.lastName,
          birthDate: buddhistBirthDate.replaceAll('-', '') || '',
          laser: values.laser.replaceAll('-', '') || '',
        })
      )
    },
  })

  const registerForm = useFormik({
    enableReinitialize: true,
    initialValues: {
      password1: '',
      password2: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(
        forgotActions.resetPassword(
          {
            password1: values.password1,
            password2: values.password2,
          },
          dopaToken
        )
      )
    },
  })

  const onBack = () => {
    history.push(`${PATH}/login`)
    dispatch(forgotActions.clearDopaToken())
  }

  const isAuthenticateFormValid = () => {
    return (
      authenticateForm.values.id !== '' &&
      authenticateForm.values.id.length === 17 &&
      !authenticateForm.values.id.includes('_') &&
      authenticateForm.values.laser !== '' &&
      authenticateForm.values.laser.length === 14 &&
      !authenticateForm.values.laser.includes('_') &&
      authenticateForm.values.firstName !== '' &&
      authenticateForm.values.lastName !== '' &&
      birthDate !== null
    )
  }

  const isRegisterFormValid = () => {
    return (
      registerForm.values.password1 !== '' &&
      registerForm.values.password2 !== ''
    )
  }

  const [values, setValues] = useState({
    showPassword: false,
    showConfirmPassword: false,
  })

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
          ลืมรหัสผ่าน
        </Typography>

        <Collapse in={dopaToken === ''}>
          <form onSubmit={authenticateForm.handleSubmit}>
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
                        เลขประจำตัวประชาชน
                      </Typography>
                    </Grid>
                    <Grid xs={12} md={6}>
                      <Input
                        id='id'
                        name='id'
                        value={authenticateForm.values.id}
                        onChange={authenticateForm.handleChange}
                        size='small'
                        fullWidth
                        inputComponent={TextMaskCitizenID}
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
                        ชื่อจริง (ไม่ต้องมีคำนำหน้า)
                      </Typography>
                    </Grid>
                    <Grid xs={12} md={6}>
                      <TextField
                        id='firstName'
                        name='firstName'
                        value={authenticateForm.values.firstName}
                        onChange={authenticateForm.handleChange}
                        variant='outlined'
                        size='small'
                        fullWidth
                        placeholder='สมชาย'
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
                        นามสกุล
                      </Typography>
                    </Grid>
                    <Grid xs={12} md={6}>
                      <TextField
                        id='lastName'
                        name='lastName'
                        value={authenticateForm.values.lastName}
                        onChange={authenticateForm.handleChange}
                        variant='outlined'
                        size='small'
                        fullWidth
                        placeholder='รักเรียน'
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
                        วัน/เดือน/ปีเกิด (พ.ศ.)
                      </Typography>
                    </Grid>
                    <Grid xs={12} md={6}>
                      <DatePicker date={birthDate} setDate={setBirthDate} />
                    </Grid>
                  </Grid>
                  <Grid container item direction='row' alignItems='center'>
                    <Grid xs={12} md={6}>
                      <Stack direction='row' alignItems='center' gap={1}>
                        <Typography
                          variant='body1'
                          color='textPrimary'
                          style={{ fontWeight: 600 }}
                        >
                          เลเซอร์ไอดี
                        </Typography>
                        <LaserIDTooltip
                          title={
                            <div style={{ width: 1000, height: 200 }}>
                              <img
                                src={laserID}
                                alt='ตัวอย่างเลเซอร์ไอดี'
                                width='auto'
                                height='auto'
                                style={{
                                  borderRadius: 16,
                                  boxShadow:
                                    '0 2px 4px -2px rgba(0,0,0,0.24), 0 4px 24px -2px rgba(0, 0, 0, 0.2)',
                                }}
                              />
                            </div>
                          }
                          placement='top'
                        >
                          <HelpIcon
                            style={{
                              fontSize: 18,
                              color: theme.palette.secondary.main,
                            }}
                          />
                        </LaserIDTooltip>
                      </Stack>
                    </Grid>
                    <Grid xs={12} md={6}>
                      <Input
                        id='laser'
                        name='laser'
                        value={authenticateForm.values.laser}
                        onChange={authenticateForm.handleChange}
                        variant='outlined'
                        size='small'
                        fullWidth
                        inputComponent={TextMaskLaserID}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
              <Button
                fullWidth
                variant='contained'
                color='secondary'
                size='large'
                endIcon={<ChevronRightIcon />}
                style={{ marginTop: 32 }}
                type='submit'
                disabled={!isAuthenticateFormValid()}
              >
                พิสูจน์ตัวจริงกับกรมการปกครอง
              </Button>
            </Box>
          </form>
        </Collapse>

        <Collapse in={dopaToken !== ''}>
          <form onSubmit={registerForm.handleSubmit}>
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
                        รหัสผ่านใหม่
                      </Typography>
                    </Grid>
                    <Grid xs={12} md={6}>
                      <TextField
                        id='password1'
                        name='password1'
                        value={registerForm.values.password1}
                        onChange={registerForm.handleChange}
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
                        value={registerForm.values.password2}
                        onChange={registerForm.handleChange}
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
                disabled={!isRegisterFormValid()}
                variant='contained'
                color='secondary'
                size='large'
                endIcon={<ChevronRightIcon />}
                style={{ marginTop: 32 }}
                type='submit'
              >
                ตั้งรหัสผ่านใหม่
              </Button>
            </Box>
          </form>
        </Collapse>
      </Container>
    </>
  )
}
