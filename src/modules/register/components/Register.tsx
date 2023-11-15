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
} from '@material-ui/core'
import {
  ChevronRight as ChevronRightIcon,
  ChevronLeft as ChevronLeftIcon,
} from '@material-ui/icons'

import * as registerActions from 'modules/register/actions'
import DatePicker from './DatePicker'
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

export default function Register() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()

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
        registerActions.authenticateWithDota({
          id: values.id,
          firstName: values.firstName,
          lastName: values.lastName,
          birthDate: birthDate.replaceAll('-', '') || '',
          laser: values.laser,
        })
      )
    },
  })

  const onBack = () => {
    history.push(`${PATH}/login`)
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
                    <TextField
                      id='id'
                      name='id'
                      value={formik.values.id}
                      onChange={formik.handleChange}
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
                    <Typography
                      variant='body1'
                      color='textPrimary'
                      style={{ fontWeight: 600 }}
                    >
                      เลเซอร์ไอดี
                    </Typography>
                  </Grid>
                  <Grid xs={12} md={6}>
                    <TextField
                      id='laser'
                      name='laser'
                      value={formik.values.laser}
                      onChange={formik.handleChange}
                      variant='outlined'
                      size='small'
                      fullWidth
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
            >
              พิสูจน์ตัวจริงกับกรมการปกครอง
            </Button>
          </Box>
        </form>
      </Container>
    </>
  )
}
