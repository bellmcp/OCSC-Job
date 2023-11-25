// @ts-nocheck
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { get, isEmpty } from 'lodash'
import { getCookie } from 'utils/cookies'

import { useHistory } from 'react-router-dom'

import {
  createStyles,
  makeStyles,
  Theme,
  useTheme,
} from '@material-ui/core/styles'
import {
  Container,
  Typography,
  Box,
  Button,
  Toolbar,
  Paper,
  Select,
  Grid,
  MenuItem,
  FormControl,
} from '@material-ui/core'
import { ChevronLeft as ChevronLeftIcon } from '@material-ui/icons'

import { getRoleFromToken } from 'utils/isLogin'
import DataTable from './DataTable'
import Loading from 'modules/ui/components/Loading'
import Empty from 'modules/ui/components/Empty'
import * as workerActions from 'modules/worker/actions'
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

export default function WorkerPermission() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()
  const theme = useTheme()
  const role = getRoleFromToken()
  const cookieMinistryId = parseInt(getCookie('ministryId'))
  const cookieDepartmentId = parseInt(getCookie('departmentId'))

  const [departmentId, setDepartmentId] = useState<>(null)
  const [ministryId, setMinistryId] = useState<>(null)

  const { ministries = [], departments = [] } = useSelector(
    (state: any) => state.info
  )

  const handleChangeMinistryId = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setMinistryId(event.target.value as number)
    setDepartmentId(null)
  }
  const handleChangeDepartmentId = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setDepartmentId(event.target.value as number)
    dispatch(
      workerActions.loadWorkerPermissions(ministryId, event.target.value)
    )
  }

  useEffect(() => {
    dispatch(infoActions.loadMininstries())
    dispatch(workerActions.loadOCSCServices())
    setMinistryId(cookieMinistryId)
    setDepartmentId(cookieDepartmentId)
    dispatch(
      workerActions.loadWorkerPermissions(cookieMinistryId, cookieDepartmentId)
    )
  }, []) //eslint-disable-line

  useEffect(() => {
    if (ministryId !== null && ministryId !== cookieMinistryId) {
      dispatch(infoActions.loadDepartmentsByMinistryId(ministryId))
    } else {
      dispatch(infoActions.loadDepartmentsByMinistryId(cookieMinistryId))
    }
  }, [ministryId]) //eslint-disable-line

  const {
    ocscServices = [],
    workerPermissions = [],
    isLoading,
    isPermissionLoading,
  } = useSelector((state: any) => state.worker)

  const onBack = () => {
    history.push(`${PATH}/`)
  }

  const renderResult = () => {
    if (isLoading || isPermissionLoading) {
      return <Loading height={500} />
    } else if (isEmpty(workerPermissions)) {
      return <Empty height={500} />
    } else {
      return (
        <DataTable
          ocscServices={ocscServices}
          workerPermissions={workerPermissions}
          isPermissionLoading={isPermissionLoading}
        />
      )
    }
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
      <Container
        maxWidth='lg'
        className={classes.content}
        style={{ paddingBottom: 0 }}
      >
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
          style={{ fontWeight: 600 }}
        >
          สิทธิ์ของผู้ปฏิบัติงาน
        </Typography>
        <Box mt={4}>
          <Paper
            elevation={0}
            style={{
              borderRadius: 16,
              padding: 24,
              boxShadow: '0 0 20px 0 rgba(204,242,251,0.3)',
              border: '1px solid rgb(204 242 251)',
              width: '50%',
            }}
          >
            <Grid container spacing={2}>
              <Grid container item direction='row' alignItems='center'>
                <Grid xs={12} md={4}>
                  <Typography
                    variant='body1'
                    color='textPrimary'
                    style={{ fontWeight: 600 }}
                  >
                    กระทรวง
                  </Typography>
                </Grid>
                <Grid xs={12} md={8}>
                  <FormControl fullWidth size='small'>
                    <Select
                      disabled={role !== 'ocsc'}
                      id='ministryId'
                      name='ministryId'
                      value={ministryId}
                      onChange={handleChangeMinistryId}
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
                <Grid xs={12} md={4}>
                  <Typography
                    variant='body1'
                    color='textPrimary'
                    style={{ fontWeight: 600 }}
                  >
                    กรมต้นสังกัด
                  </Typography>
                </Grid>
                <Grid xs={12} md={8}>
                  <FormControl fullWidth size='small'>
                    <Select
                      disabled={role !== 'ocsc'}
                      id='departmentId'
                      name='departmentId'
                      value={departmentId}
                      onChange={handleChangeDepartmentId}
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
            </Grid>
          </Paper>
        </Box>
      </Container>
      <Container
        maxWidth='xl'
        className={classes.content}
        style={{ paddingLeft: 24, paddingRight: 24 }}
      >
        <Box mt={2} mb={4}>
          {renderResult()}
        </Box>
      </Container>
    </>
  )
}
