// @ts-nocheck
import React, { useEffect, useState } from 'react'
import { get } from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import { getRoleFromToken } from 'utils/isLogin'
import { getCookie } from 'utils/cookies'
import { useHistory } from 'react-router-dom'

import {
  createStyles,
  makeStyles,
  Theme,
  useTheme,
} from '@material-ui/core/styles'
import {
  useMediaQuery,
  Container,
  Typography,
  Grid,
  Box,
  Button,
  Paper,
  Fab,
  Zoom,
  useScrollTrigger,
  Toolbar,
  FormControl,
  Select,
  MenuItem,
} from '@material-ui/core'
import { Stack } from '@mui/material'

import {
  KeyboardArrowUp as KeyboardArrowUpIcon,
  Add as AddIcon,
  ChevronLeft as ChevronLeftIcon,
} from '@material-ui/icons'

import * as infoActions from 'modules/info/actions'
import * as adminActions from 'modules/admin/actions'

import Loading from 'modules/ui/components/Loading'
import DataTable from './DataTable'
import AddAdminModal from './AddAdminModal'
import EditAdminModal from './EditAdminModal'
import DeleteAdminModal from './DeleteAdminModal'

const PATH = process.env.REACT_APP_BASE_PATH

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      paddingTop: theme.spacing(3),
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

function ScrollTop(props: any) {
  const { children } = props
  const classes = useStyles()
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  })

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const anchor = (
      (event.target as HTMLDivElement).ownerDocument || document
    ).querySelector('#back-to-top-anchor')

    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role='presentation' className={classes.root}>
        {children}
      </div>
    </Zoom>
  )
}

export default function AdminAccount() {
  const classes = useStyles()
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('sm'))
  const dispatch = useDispatch()
  const role = getRoleFromToken()
  const history = useHistory()

  const [searchResults, setSearchResults] = useState([])

  const [open, setOpen] = React.useState<boolean>(false)
  const [openEditModal, setOpenEditModal] = useState<boolean>(false)
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false)
  const [currentEditData, setCurrentEditData] = useState<any>({})

  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }
  const handleClickOpenEditModal = () => {
    setOpenEditModal(true)
  }
  const handleCloseEditModal = () => {
    setOpenEditModal(false)
  }
  const handleClickOpenDeleteModal = () => {
    setOpenDeleteModal(true)
  }
  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false)
  }

  const { ministries = [], departments = [] } = useSelector(
    (state: any) => state.info
  )
  const { adminAccounts = [], isLoading } = useSelector(
    (state: any) => state.admin
  )

  useEffect(() => {
    const parsed = adminAccounts.map((item: any, index: number) => {
      return {
        order: index + 1,
        edit: null,
        ...item,
      }
    })
    setSearchResults(parsed)
  }, [adminAccounts]) //eslint-disable-line

  const cookieMinistryId = parseInt(getCookie('ministryId'))
  const cookieDepartmentId = parseInt(getCookie('departmentId'))

  const [departmentId, setDepartmentId] = useState(null)
  const [ministryId, setMinistryId] = useState(null)

  const onBack = () => {
    history.push(`${PATH}/`)
  }

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
    dispatch(adminActions.loadAdminAccounts(ministryId, event.target.value))
  }

  useEffect(() => {
    dispatch(infoActions.loadMininstries())
    dispatch(adminActions.loadOCSCServices())
    setMinistryId(cookieMinistryId)
    setDepartmentId(cookieDepartmentId)
    dispatch(
      adminActions.loadAdminAccounts(cookieMinistryId, cookieDepartmentId)
    )
  }, [cookieMinistryId, cookieDepartmentId]) //eslint-disable-line

  useEffect(() => {
    if (ministryId !== null && ministryId !== cookieMinistryId) {
      dispatch(infoActions.loadDepartmentsByMinistryId(ministryId))
    } else {
      dispatch(infoActions.loadDepartmentsByMinistryId(cookieMinistryId))
    }
  }, [ministryId]) //eslint-disable-line

  const getMinistryNameById = (id: any) => {
    const result = ministries.find((ministry: any) => ministry.id === id)
    return get(result, 'ministry', '')
  }

  const getDepartmentNameById = (id: any) => {
    const result = departments.find((department: any) => department.id === id)
    return get(result, 'department', '')
  }

  const renderSearchResult = () => {
    if (isLoading) {
      return <Loading height={800}></Loading>
    } else {
      return (
        <Box mb={4}>
          <DataTable
            data={searchResults}
            loading={isLoading}
            handleOpenEditModal={handleClickOpenEditModal}
            handleOpenDeleteModal={handleClickOpenDeleteModal}
            setCurrentEditData={setCurrentEditData}
          />
        </Box>
      )
    }
  }

  return (
    <>
      <Toolbar id='back-to-top-anchor' />
      <Container maxWidth='lg' className={classes.content}>
        <Box mt={2} mb={4}>
          <Grid
            container
            direction={matches ? 'row' : 'column'}
            justify={matches ? 'space-between' : 'center'}
            alignItems='center'
            style={{ marginBottom: 24 }}
            spacing={2}
          >
            <Grid item xs={6}>
              <Stack alignItems={!matches ? 'center' : 'start'}>
                <div>
                  <Button
                    variant='text'
                    color='primary'
                    onClick={onBack}
                    style={{ marginLeft: '-8px', marginBottom: 12 }}
                    startIcon={<ChevronLeftIcon />}
                  >
                    กลับ
                  </Button>
                </div>
              </Stack>
              <Typography
                component='h1'
                variant='h4'
                color='secondary'
                align={!matches ? 'center' : 'left'}
                style={{ fontWeight: 600 }}
              >
                ผู้ดูแลระบบ
              </Typography>
            </Grid>
            <div>
              <Button
                disabled={departmentId === null}
                color='secondary'
                variant='contained'
                startIcon={<AddIcon />}
                onClick={handleClickOpen}
              >
                เพิ่มผู้ดูแลระบบ
              </Button>
            </div>
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
                <Grid xs={12} md={2}>
                  <Typography
                    variant='body1'
                    color='textPrimary'
                    style={{ fontWeight: 600 }}
                  >
                    กระทรวง
                  </Typography>
                </Grid>
                <Grid xs={12} md={4}>
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
                <Grid xs={12} md={2}>
                  <Typography
                    variant='body1'
                    color='textPrimary'
                    style={{ fontWeight: 600 }}
                  >
                    กรมต้นสังกัด
                  </Typography>
                </Grid>
                <Grid xs={12} md={4}>
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
      <Container maxWidth='xl' style={{ marginBottom: 36 }}>
        {renderSearchResult()}
      </Container>
      <ScrollTop>
        <Fab color='primary' size='medium'>
          <KeyboardArrowUpIcon style={{ color: 'white' }} />
        </Fab>
      </ScrollTop>
      <AddAdminModal
        open={open}
        handleClose={handleClose}
        ministryId={ministryId}
        departmentId={departmentId}
      />
      <EditAdminModal
        open={openEditModal}
        handleClose={handleCloseEditModal}
        data={currentEditData}
        ministryId={ministryId}
        departmentId={departmentId}
      />
      <DeleteAdminModal
        open={openDeleteModal}
        handleClose={handleCloseDeleteModal}
        data={currentEditData}
        ministryId={ministryId}
        departmentId={departmentId}
      />
    </>
  )
}
