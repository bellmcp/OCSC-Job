// @ts-nocheck
import React, { useEffect } from 'react'
import { isEmpty } from 'lodash'
import { useDispatch, useSelector } from 'react-redux'

import { useHistory } from 'react-router-dom'

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { Container, Typography, Box, Button, Toolbar } from '@material-ui/core'
import { ChevronLeft as ChevronLeftIcon } from '@material-ui/icons'

import DataTable from './DataTable'
import Loading from 'modules/ui/components/Loading'
import Empty from 'modules/ui/components/Empty'
import * as adminActions from 'modules/admin/actions'
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

export default function AdminPermission() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    dispatch(adminActions.loadOCSCServices())
    dispatch(adminActions.loadAdminPermissions())
    dispatch(infoActions.loadMininstries())
    dispatch(infoActions.loadDepartments())
  }, [dispatch])

  const {
    ocscServices = [],
    adminPermissions = [],
    isLoading: isAdminLoading,
    isPermissionLoading,
  } = useSelector((state: any) => state.admin)

  const {
    ministries = [],
    departments = [],
    isLoading: isInfoLoading,
  } = useSelector((state: any) => state.info)

  const onBack = () => {
    history.push(`${PATH}/`)
  }

  const renderResult = () => {
    if (isAdminLoading || isInfoLoading || isPermissionLoading) {
      return <Loading height={500} />
    } else if (isEmpty(adminPermissions)) {
      return <Empty height={500} />
    } else {
      return (
        <DataTable
          ocscServices={ocscServices}
          adminPermissions={adminPermissions}
          ministries={ministries}
          departments={departments}
          isPermissionLoading={isPermissionLoading}
        />
      )
    }
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
          สิทธิ์ของหน่วยงาน
        </Typography>
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
