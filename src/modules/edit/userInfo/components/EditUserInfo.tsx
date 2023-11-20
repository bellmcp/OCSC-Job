// @ts-nocheck
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useHistory } from 'react-router-dom'
import { format } from 'date-fns'
import { get } from 'lodash'

import {
  createStyles,
  makeStyles,
  Theme,
  useTheme,
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
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  Select,
  MenuItem,
} from '@material-ui/core'

import {
  ChevronRight as ChevronRightIcon,
  ChevronLeft as ChevronLeftIcon,
} from '@material-ui/icons'

import * as userInfoActions from 'modules/edit/userInfo/actions'
import * as infoActions from 'modules/info/actions'

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

export default function EditUserInfo() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()
  const theme = useTheme()
  const validationSchema = yup.object({})

  useEffect(() => {
    dispatch(infoActions.loadMininstries())
    dispatch(infoActions.loadDepartments())
    dispatch(userInfoActions.loadUserInfo())
  }, [dispatch])

  const { userInfo = {} } = useSelector((state: any) => state.userInfo)
  const { ministries = [], departments = [] } = useSelector(
    (state: any) => state.info
  )

  const editUserInfoForm = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: userInfo.title || '',
      firstName: userInfo.firstName || '',
      lastName: userInfo.lastName || '',
      gender: userInfo.gender || null,
      ministryId: userInfo.ministryId || '',
      departmentId: userInfo.departmentId || '',
      division: userInfo.division || '',
      position: userInfo.position || '',
      email: userInfo.email || '',
      phone: userInfo.phone || '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(
        userInfoActions.editUserInfo({
          title: values.title,
          gender: values.gender,
          ministryId: values.ministryId,
          departmentId: values.departmentId,
          division: values.division,
          position: values.position,
          email: values.email,
          phone: values.phone,
        })
      )
    },
  })

  const onBack = () => {
    history.push(`${PATH}/`)
  }

  const isEditUserInfoFormDirty = () => {
    return (
      editUserInfoForm.values.title !== userInfo.title ||
      editUserInfoForm.values.gender !== userInfo.gender ||
      editUserInfoForm.values.ministryId !== userInfo.ministryId ||
      editUserInfoForm.values.departmentId !== userInfo.departmentId ||
      editUserInfoForm.values.division !== userInfo.division ||
      editUserInfoForm.values.position !== userInfo.position ||
      editUserInfoForm.values.email !== userInfo.email ||
      editUserInfoForm.values.phone !== userInfo.phone
    )
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
          แก้ไขข้อมูลส่วนบุคคล
        </Typography>

        <form onSubmit={editUserInfoForm.handleSubmit}>
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
                      value={editUserInfoForm.values.title}
                      onChange={editUserInfoForm.handleChange}
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
                      {userInfo.firstName || ''}
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
                      {userInfo.lastName || ''}
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
                      {userInfo.birthDate
                        ? format(
                            new Date(userInfo.birthDate),
                            'dd/MM/yyyy'
                          ).toString()
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
                      value={editUserInfoForm.values.gender}
                      onChange={editUserInfoForm.handleChange}
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
                        value={editUserInfoForm.values.ministryId}
                        onChange={editUserInfoForm.handleChange}
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
                        value={editUserInfoForm.values.departmentId}
                        onChange={editUserInfoForm.handleChange}
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
                      value={editUserInfoForm.values.division}
                      onChange={editUserInfoForm.handleChange}
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
                      value={editUserInfoForm.values.position}
                      onChange={editUserInfoForm.handleChange}
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
                      value={editUserInfoForm.values.email}
                      onChange={editUserInfoForm.handleChange}
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
                      value={editUserInfoForm.values.phone}
                      onChange={editUserInfoForm.handleChange}
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
              disabled={!isEditUserInfoFormDirty()}
              variant='contained'
              color='secondary'
              size='large'
              endIcon={<ChevronRightIcon />}
              style={{ marginTop: 32 }}
              type='submit'
            >
              แก้ไขข้อมูลส่วนบุคคล
            </Button>
          </Box>
        </form>
      </Container>
    </>
  )
}
