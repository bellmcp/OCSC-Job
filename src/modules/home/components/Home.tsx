import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import {
  Button,
  Typography,
  Paper,
  Toolbar,
  Grid,
  Container,
  Chip,
} from '@material-ui/core'
import { Stack } from '@mui/material'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { amber } from '@material-ui/core/colors'

import { getRoleFromToken } from 'utils/isLogin'

const PATH = process.env.REACT_APP_BASE_PATH

const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: theme.palette.background.default,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
    padding: theme.spacing(16, 16),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(10, 4),
    },
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 1),
  },
}))

export default function Login() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()
  const theme = useTheme()

  const role = getRoleFromToken()
  const { roles = [] } = useSelector((state: any) => state.info)
  const getRoleByKey = (key: string) => {
    return roles[key] || ''
  }
  const [roleName, setRoleName] = useState<string>('')
  useEffect(() => {
    setRoleName(getRoleByKey(role))
  }, [roles, role]) //eslint-disable-line

  const onLink = () => {
    history.push(`${PATH}/somepath`)
  }

  const getChipColorByRole = (role: string) => {
    switch (role) {
      case 'ocsc':
        return amber[800]
      case 'administrator':
        return theme.palette.secondary.main
      case 'worker':
        return theme.palette.primary.main
    }
  }

  return (
    <Container maxWidth='lg'>
      <Grid container direction='row' justify='center' alignItems='center'>
        <Grid item xs={12} md={8}>
          <Paper className={classes.paper} elevation={0}>
            <Toolbar />
            <Stack
              direction='column'
              alignItems='center'
              spacing={1}
              sx={{ marginBottom: 4 }}
            >
              <Typography
                component='h1'
                variant='h4'
                align='center'
                color='secondary'
                style={{ fontWeight: 600 }}
              >
                หน้าหลัก
              </Typography>
              <Chip
                label={roleName}
                variant='outlined'
                style={{
                  marginBottom: 16,
                  fontWeight: 500,
                  borderColor: getChipColorByRole(role),
                  color: getChipColorByRole(role),
                }}
              />
            </Stack>
            <Button
              size='large'
              color='secondary'
              variant='contained'
              fullWidth
              onClick={onLink}
            >
              หน้า 1
            </Button>
            <Button
              size='large'
              color='secondary'
              variant='contained'
              fullWidth
              onClick={onLink}
              style={{ marginTop: 8 }}
            >
              หน้า 2
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}
