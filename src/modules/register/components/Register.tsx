// @ts-nocheck
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useHistory } from 'react-router-dom'
import MaskedInput from 'react-text-mask'
import { format } from 'date-fns'
import { get } from 'lodash'

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
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  Select,
  MenuItem,
} from '@material-ui/core'
import { Stack } from '@mui/material'
import {
  ChevronRight as ChevronRightIcon,
  ChevronLeft as ChevronLeftIcon,
  Help as HelpIcon,
} from '@material-ui/icons'

import * as registerActions from 'modules/register/actions'
import * as infoActions from 'modules/info/actions'
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

  useEffect(() => {
    dispatch(infoActions.loadMininstries())
    dispatch(infoActions.loadDepartments())
  }, [dispatch])

  const { dopaToken = '' } = useSelector((state: any) => state.register)
  const { ministries = [], departments = [] } = useSelector(
    (state: any) => state.info
  )

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
        registerActions.authenticateWithDopa({
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
      title: '',
      gender: 'm',
      ministryId: null,
      departmentId: null,
      division: '',
      position: '',
      email: '',
      phone: '',
      password1: '',
      password2: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const buddhistYear = parseInt(birthDate.split('-')[0]) + 543
      const buddhistBirthDate = `${buddhistYear}-${birthDate.split('-')[1]}-${
        birthDate.split('-')[2]
      }`

      dispatch(
        registerActions.register(
          {
            title: values.title,
            firstName: authenticateForm.values.firstName,
            lastName: authenticateForm.values.lastName,
            birthDate: buddhistBirthDate.replaceAll('-', '') || '',
            gender: 'm',
            ministryId: values.ministryId,
            departmentId: values.departmentId,
            division: values.division,
            position: values.position,
            email: values.email,
            phone: values.phone,
            password1: values.password1,
            password2: values.password2,
          },
          dopaToken
        )
      )

      dispatch(registerActions.clearDopaToken())
    },
  })

  const onBack = () => {
    history.push(`${PATH}/login`)
    dispatch(registerActions.clearDopaToken())
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
    return true
  }

  const getMinistryNameById = (id: any) => {
    const result = ministries.find((ministry: any) => ministry.id === id)
    return get(result, 'ministry', '')
  }

  const getDepartmentNameById = (id: any) => {
    const result = departments.find((department: any) => department.id === id)
    return get(result, 'department', '')
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
          สมัครสมาชิก
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
                        คำนำหน้า
                      </Typography>
                    </Grid>
                    <Grid xs={12} md={6}>
                      <TextField
                        id='title'
                        name='title'
                        value={registerForm.values.title}
                        onChange={registerForm.handleChange}
                        variant='outlined'
                        size='small'
                        fullWidth
                      />
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    item
                    direction='row'
                    alignItems='center'
                    style={{ minHeight: 48 }}
                  >
                    <Grid xs={12} md={6}>
                      <Typography
                        variant='body1'
                        color='textPrimary'
                        style={{ fontWeight: 600 }}
                      >
                        ชื่อ
                      </Typography>
                    </Grid>
                    <Grid xs={12} md={6}>
                      <Typography
                        variant='body1'
                        color='secondary'
                        style={{ fontWeight: 500 }}
                      >
                        {authenticateForm.values.firstName}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    item
                    direction='row'
                    alignItems='center'
                    style={{ minHeight: 48 }}
                  >
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
                      <Typography
                        variant='body1'
                        color='secondary'
                        style={{ fontWeight: 500 }}
                      >
                        {authenticateForm.values.lastName}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    item
                    direction='row'
                    alignItems='center'
                    style={{ minHeight: 48 }}
                  >
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
                      <Typography
                        variant='body1'
                        color='secondary'
                        style={{ fontWeight: 500 }}
                      >
                        {birthDate
                          ? format(new Date(birthDate), 'dd/MM/yyyy').toString()
                          : ''}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid container item direction='row' alignItems='center'>
                    <Grid xs={12} md={6}>
                      <Typography
                        variant='body1'
                        color='textPrimary'
                        style={{ fontWeight: 600 }}
                      >
                        เพศ
                      </Typography>
                    </Grid>
                    <Grid xs={12} md={6}>
                      <RadioGroup
                        row
                        id='gender'
                        name='gender'
                        value={registerForm.values.gender}
                        onChange={registerForm.handleChange}
                      >
                        <FormControlLabel
                          value='m'
                          control={<Radio size='small' />}
                          label='ชาย'
                          style={{ marginRight: 64 }}
                        />
                        <FormControlLabel
                          value='f'
                          control={<Radio size='small' />}
                          label='หญิง'
                        />
                      </RadioGroup>
                    </Grid>
                  </Grid>
                  <Grid container item direction='row' alignItems='center'>
                    <Grid xs={12} md={6}>
                      <Typography
                        variant='body1'
                        color='textPrimary'
                        style={{ fontWeight: 600 }}
                      >
                        กระทรวง
                      </Typography>
                    </Grid>
                    <Grid xs={12} md={6}>
                      <FormControl fullWidth size='small'>
                        <Select
                          id='ministryId'
                          name='ministryId'
                          value={registerForm.values.ministryId}
                          onChange={registerForm.handleChange}
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
                          renderValue={(selected) => {
                            if (selected === null) {
                              return (
                                <span
                                  style={{
                                    color: theme.palette.text.secondary,
                                  }}
                                >
                                  โปรดเลือกกระทรวง
                                </span>
                              )
                            }
                            return getMinistryNameById(selected)
                          }}
                        >
                          {ministries.map((ministry: any) => (
                            <MenuItem value={get(ministry, 'id', '')}>
                              {get(ministry, 'ministry', '')}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                  <Grid container item direction='row' alignItems='center'>
                    <Grid xs={12} md={6}>
                      <Typography
                        variant='body1'
                        color='textPrimary'
                        style={{ fontWeight: 600 }}
                      >
                        กรมต้นสังกัด
                      </Typography>
                    </Grid>
                    <Grid xs={12} md={6}>
                      <FormControl fullWidth size='small'>
                        <Select
                          id='departmentId'
                          name='departmentId'
                          value={registerForm.values.departmentId}
                          onChange={registerForm.handleChange}
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
                          renderValue={(selected) => {
                            if (selected === null) {
                              return (
                                <span
                                  style={{
                                    color: theme.palette.text.secondary,
                                  }}
                                >
                                  โปรดเลือกกรมต้นสังกัด
                                </span>
                              )
                            }
                            return getDepartmentNameById(selected)
                          }}
                        >
                          {departments.map((department: any) => (
                            <MenuItem value={get(department, 'id', '')}>
                              {get(department, 'department', '')}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                  <Grid container item direction='row' alignItems='center'>
                    <Grid xs={12} md={6}>
                      <Typography
                        variant='body1'
                        color='textPrimary'
                        style={{ fontWeight: 600 }}
                      >
                        ชื่อส่วนราชการที่สังกัด
                      </Typography>
                    </Grid>
                    <Grid xs={12} md={6}>
                      <TextField
                        id='division'
                        name='division'
                        value={registerForm.values.division}
                        onChange={registerForm.handleChange}
                        variant='outlined'
                        size='small'
                        fullWidth
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
                        ตำแหน่ง
                      </Typography>
                    </Grid>
                    <Grid xs={12} md={6}>
                      <TextField
                        id='position'
                        name='position'
                        value={registerForm.values.position}
                        onChange={registerForm.handleChange}
                        variant='outlined'
                        size='small'
                        fullWidth
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
                        อีเมล
                      </Typography>
                    </Grid>
                    <Grid xs={12} md={6}>
                      <TextField
                        id='email'
                        name='email'
                        value={registerForm.values.email}
                        onChange={registerForm.handleChange}
                        variant='outlined'
                        size='small'
                        fullWidth
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
                        เบอร์โทรศัพท์
                      </Typography>
                    </Grid>
                    <Grid xs={12} md={6}>
                      <TextField
                        id='phone'
                        name='phone'
                        value={registerForm.values.phone}
                        onChange={registerForm.handleChange}
                        variant='outlined'
                        size='small'
                        fullWidth
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
                        รหัสผ่าน
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
                        type='password'
                        autoComplete='new-password'
                        placeholder='โปรดกำหนดรหัสผ่าน'
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
                        type='password'
                        autoComplete='new-password'
                        placeholder='โปรดยืนยันรหัสผ่าน'
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
                สมัครสมาชิก
              </Button>
            </Box>
          </form>
        </Collapse>
      </Container>
    </>
  )
}
