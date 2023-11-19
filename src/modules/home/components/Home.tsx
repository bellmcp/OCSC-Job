import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import {
  Button,
  Typography,
  Paper,
  Toolbar,
  Grid,
  Container,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

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

  const onLink = () => {
    history.push(`${PATH}/somepath`)
  }

  return (
    <Container maxWidth='lg'>
      <Grid container direction='row' justify='center' alignItems='center'>
        <Grid item xs={12} md={8}>
          <Paper className={classes.paper} elevation={0}>
            <Toolbar />
            <Grid
              container
              direction='row'
              justify='center'
              alignItems='center'
            >
              <Typography
                component='h1'
                variant='h4'
                align='center'
                color='secondary'
                style={{ fontWeight: 600, marginBottom: 48 }}
              >
                หน้าหลัก
              </Typography>
            </Grid>
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
