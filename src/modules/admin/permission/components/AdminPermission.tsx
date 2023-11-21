// @ts-nocheck
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as yup from 'yup'
import { useHistory } from 'react-router-dom'
import { getCookie } from 'utils/cookies'

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import {
  Container,
  Typography,
  Box,
  Button,
  Paper,
  Toolbar,
} from '@material-ui/core'

import { ChevronLeft as ChevronLeftIcon } from '@material-ui/icons'

import * as adminActions from 'modules/admin/actions'

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

  const validationSchema = yup.object({})

  const ministryId = parseInt(getCookie('ministryId'))
  const departmentId = parseInt(getCookie('departmentId'))

  useEffect(() => {
    dispatch(adminActions.loadOCSCServices())
  }, [dispatch])

  const { ocscServices = {} } = useSelector((state: any) => state.admin)

  const onBack = () => {
    history.push(`${PATH}/`)
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
          สิทธิ์ของหน่วยงาน
        </Typography>

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
            xxxx
          </Paper>
        </Box>
      </Container>
    </>
  )
}
