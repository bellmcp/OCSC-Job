// @ts-nocheck
import React, { useState } from 'react'
import { get } from 'lodash'
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
import { ChevronRight as ChevronRightIcon } from '@material-ui/icons'

import * as personLetterActions from 'modules/personLetter/actions'
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

export default function PersonLetterSupervisor() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()

  const [startDate, setStartDate] = useState<string>(null)

  const validationSchema = yup.object({})

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      letterNo: '',
      letterDate: '',
      replyDate: '',
      status1: true,
      status2: true,
      status3: true,
      status4: true,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const searchQuery = {
        letterNo: encodeURIComponent(get(values, 'letterNo', '')),
        letterDate: startDate,
        replyDate: '',
        status1: true,
        status2: true,
        status3: true,
        status4: true,
      }
      setCurrentSearchQuery(searchQuery)
      dispatch(personLetterActions.getPersonLetterAdmin(searchQuery))
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
            <Grid
              container
              direction='row'
              justify='center'
              alignItems='center'
              style={{ marginBottom: 24 }}
              spacing={2}
            >
              <Typography
                component='h1'
                variant='h4'
                align='center'
                color='secondary'
                style={{ fontWeight: 600, marginBottom: 16 }}
              >
                ลงทะเบียน
              </Typography>
            </Grid>
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
                      id='letterNo'
                      name='letterNo'
                      value={formik.values.letterNo}
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
                      id='letterNo'
                      name='letterNo'
                      value={formik.values.letterNo}
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
                      id='letterNo'
                      name='letterNo'
                      value={formik.values.letterNo}
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
                    <DatePicker date={startDate} setDate={setStartDate} />
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
                      id='letterNo'
                      name='letterNo'
                      value={formik.values.letterNo}
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
            <Button
              fullWidth
              variant='text'
              color='secondary'
              size='large'
              style={{ marginTop: 8 }}
              onClick={onBack}
            >
              กลับ
            </Button>
          </Box>
        </form>
      </Container>
    </>
  )
}