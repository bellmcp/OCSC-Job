// @ts-nocheck
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useHistory } from 'react-router-dom'
import { get } from 'lodash'
import { getCookie } from 'utils/cookies'
import { getRoleFromToken } from 'utils/isLogin'

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
  FormControl,
  Select,
  MenuItem,
  Avatar,
} from '@material-ui/core'

import {
  ChevronRight as ChevronRightIcon,
  ChevronLeft as ChevronLeftIcon,
} from '@material-ui/icons'

import * as agencyInfoActions from 'modules/edit/agencyInfo/actions'
import * as infoActions from 'modules/info/actions'
import { de } from 'date-fns/locale'

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

export default function EditAgencyInfo() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()
  const theme = useTheme()
  const validationSchema = yup.object({})
  const role = getRoleFromToken()
  const ministryId = parseInt(getCookie('ministryId'))
  const departmentId = parseInt(getCookie('departmentId'))

  const [selectedDepartmentId, setSelectedDepartmentId] = useState(departmentId)

  const {
    ministries = [],
    departments = [],
    department = {},
  } = useSelector((state: any) => state.info)

  const editAgencyInfoForm = useFormik({
    enableReinitialize: true,
    initialValues: {
      ministryId: null,
      departmentId: null,
      phone: null,
      address: null,
      website: null,
      seal: null,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(
        agencyInfoActions.editAgencyInfo({
          ministryId: values.ministryId,
          departmentId: values.departmentId,
          phone: values.phone,
          address: values.address,
          website: values.website,
        })
      )
    },
  })

  useEffect(() => {
    dispatch(infoActions.loadMininstries())
    dispatch(infoActions.loadDepartmentsByMinistryId(ministryId))
    editAgencyInfoForm.setFieldValue('ministryId', ministryId)
    editAgencyInfoForm.setFieldValue('departmentId', departmentId)
  }, []) //eslint-disable-line

  useEffect(() => {
    if (selectedDepartmentId !== null) {
      dispatch(infoActions.loadDepartment(selectedDepartmentId))
    }
  }, [selectedDepartmentId]) //eslint-disable-line

  useEffect(() => {
    editAgencyInfoForm.setFieldValue('address', department.address || '')
    editAgencyInfoForm.setFieldValue('phone', department.phone || '')
    editAgencyInfoForm.setFieldValue('website', department.website || '')
    editAgencyInfoForm.setFieldValue('seal', department.seal || '')
  }, [department]) //eslint-disable-line

  useEffect(() => {
    // if user change ministryId
    if (
      editAgencyInfoForm.values.ministryId !== null &&
      editAgencyInfoForm.values.ministryId !== ministryId
    ) {
      dispatch(
        infoActions.loadDepartmentsByMinistryId(
          editAgencyInfoForm.values.ministryId
        )
      )
      editAgencyInfoForm.setFieldValue('departmentId', null)
      setSelectedDepartmentId(null)
      editAgencyInfoForm.setFieldValue('address', '')
      editAgencyInfoForm.setFieldValue('phone', '')
      editAgencyInfoForm.setFieldValue('website', '')
      editAgencyInfoForm.setFieldValue('seal', '')
    }

    if (editAgencyInfoForm.values.ministryId === ministryId) {
      dispatch(
        infoActions.loadDepartmentsByMinistryId(
          editAgencyInfoForm.values.ministryId
        )
      )
    }
  }, [editAgencyInfoForm.values.ministryId]) //eslint-disable-line

  const onBack = () => {
    history.push(`${PATH}/`)
  }

  const isEditAgencyInfoFormDirty = () => {
    return (
      (editAgencyInfoForm.values.phone !== department.phone ||
        editAgencyInfoForm.values.address !== department.address ||
        editAgencyInfoForm.values.website !== department.website) &&
      (editAgencyInfoForm.values.phone !== '' ||
        editAgencyInfoForm.values.address !== '' ||
        editAgencyInfoForm.values.website !== '')
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

  const getDepartmentSealById = (id: any) => {
    const result = departments.find((department: any) => department.id === id)
    return get(result, 'seal', '')
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
          แก้ไขข้อมูลหน่วยงาน
        </Typography>

        <form onSubmit={editAgencyInfoForm.handleSubmit}>
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
                      กระทรวง
                    </Typography>
                  </Grid>
                  <Grid xs={12} md={6}>
                    <FormControl fullWidth size='small'>
                      <Select
                        disabled={role !== 'ocsc'}
                        id='ministryId'
                        name='ministryId'
                        value={editAgencyInfoForm.values.ministryId}
                        onChange={editAgencyInfoForm.handleChange}
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
                        disabled={role !== 'ocsc'}
                        id='departmentId'
                        name='departmentId'
                        value={editAgencyInfoForm.values.departmentId}
                        onChange={editAgencyInfoForm.handleChange}
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
                          setSelectedDepartmentId(selected)
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
                <Grid
                  container
                  item
                  direction='row'
                  alignItems='center'
                  justify='space-between'
                  style={{ paddingBlock: 24 }}
                >
                  <Grid md={6}>
                    <Typography
                      variant='body1'
                      color='textPrimary'
                      style={{ fontWeight: 600 }}
                    >
                      ตราประจำกรม
                    </Typography>
                  </Grid>
                  <Grid md={6}>
                    <Avatar
                      src={editAgencyInfoForm.values.seal || ''}
                      style={{
                        width: 125,
                        height: 125,
                        backgroundColor: theme.palette.common.white,
                        boxShadow:
                          '0 2px 4px -2px rgba(0,0,0,0.24), 0 4px 24px -2px rgba(0, 0, 0, 0.2)',
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
                      ที่อยู่
                    </Typography>
                  </Grid>
                  <Grid xs={12} md={6}>
                    <TextField
                      id='address'
                      name='address'
                      value={editAgencyInfoForm.values.address}
                      onChange={editAgencyInfoForm.handleChange}
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
                      value={editAgencyInfoForm.values.phone}
                      onChange={editAgencyInfoForm.handleChange}
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
                      เว็บไซต์
                    </Typography>
                  </Grid>
                  <Grid xs={12} md={6}>
                    <TextField
                      id='website'
                      name='website'
                      value={editAgencyInfoForm.values.website}
                      onChange={editAgencyInfoForm.handleChange}
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
              disabled={!isEditAgencyInfoFormDirty()}
              variant='contained'
              color='secondary'
              size='large'
              endIcon={<ChevronRightIcon />}
              style={{ marginTop: 32 }}
              type='submit'
            >
              แก้ไขข้อมูลหน่วยงาน
            </Button>
          </Box>
        </form>
      </Container>
    </>
  )
}
