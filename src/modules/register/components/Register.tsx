// @ts-nocheck
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
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
} from '@material-ui/core'
import { Stack } from '@mui/material'
import {
  ChevronRight as ChevronRightIcon,
  ChevronLeft as ChevronLeftIcon,
  Help as HelpIcon,
} from '@material-ui/icons'

import * as registerActions from 'modules/register/actions'
import DatePicker from './DatePicker'
import laserID from 'assets/images/laser-id.png'

const PATH = process.env.REACT_APP_BASE_PATH

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      padding: theme.spacing(16, 0),
      [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(10, 4),
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

  const [birthDate, setBirthDate] = useState<string>(null)

  const validationSchema = yup.object({})

  const formik = useFormik({
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
      dispatch(
        registerActions.authenticateWithDopa({
          id: values.id.replaceAll('-', '') || '',
          firstName: values.firstName,
          lastName: values.lastName,
          birthDate: birthDate.replaceAll('-', '') || '',
          laser: values.laser.replaceAll('-', '') || '',
        })
      )
    },
  })

  const onBack = () => {
    history.push(`${PATH}/login`)
  }

  const isValid = () => {
    return (
      formik.values.id !== '' &&
      formik.values.id.length === 17 &&
      !formik.values.id.includes('_') &&
      formik.values.laser !== '' &&
      formik.values.laser.length === 14 &&
      !formik.values.laser.includes('_') &&
      formik.values.firstName !== '' &&
      formik.values.lastName !== '' &&
      birthDate !== null
    )
  }

  return (
    <>
      <Toolbar id='back-to-top-anchor' />
      <Container maxWidth='sm' className={classes.content}>
        <form onSubmit={formik.handleSubmit}>
          <Box mt={2} mb={4}>
            <Button
              variant='text'
              color='primary'
              onClick={onBack}
              style={{ marginLeft: '-8px', marginBottom: 24 }}
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
                      value={formik.values.id}
                      onChange={formik.handleChange}
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
                      value={formik.values.firstName}
                      onChange={formik.handleChange}
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
                      value={formik.values.lastName}
                      onChange={formik.handleChange}
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
                      วัน/เดือน/ปีเกิด
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
                      value={formik.values.laser}
                      onChange={formik.handleChange}
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
              disabled={!isValid()}
            >
              พิสูจน์ตัวจริงกับกรมการปกครอง
            </Button>
          </Box>
        </form>
      </Container>
    </>
  )
}
