import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import {
  TextField,
  Button,
  FormHelperText,
  Typography,
  InputAdornment,
  IconButton,
  Paper,
  Toolbar,
  Grid,
  Container,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import {
  Person as PersonIcon,
  Lock as LockIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from '@material-ui/icons'

import * as actions from '../actions'

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

interface State {
  password: string
  showPassword: boolean
  userId: string
}

export default function Login() {
  const classes = useStyles()
  const dispatch = useDispatch()

  const [values, setValues] = useState({
    password: '',
    showPassword: false,
    userId: '',
  })

  const { messageLogin } = useSelector((state: any) => state.login)

  const handleChange =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value })
    }

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
  }

  const { register, handleSubmit, errors } = useForm({
    mode: 'onSubmit',
    validationSchema: yup.object().shape({
      userId: yup.string().required(''),
      password: yup.string().required(),
    }),
  })

  const onLogin = (loginInfo: any) => {
    const actionLogin = actions.loadLogin({
      userId: loginInfo.userId,
      password: loginInfo.password,
    })
    dispatch(actionLogin)
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
                style={{ fontWeight: 600, marginBottom: 16 }}
              >
                ระบบบริหารจัดการสมาชิก
                <br />
                และสิทธิ์การารใช้งานของส่วนราชการ
              </Typography>
            </Grid>
            <Typography
              component='h2'
              variant='body2'
              color='textSecondary'
            ></Typography>
            <form className={classes.form} noValidate>
              <TextField
                variant='outlined'
                margin='normal'
                required
                fullWidth
                inputRef={register}
                label='เลขประจำตัวประชาชน'
                name='userId'
                autoComplete='on'
                helperText={
                  errors.userId ? 'กรุณากรอกเลขประจำตัวประชาชน' : null
                }
                error={!!errors.userId}
                style={{ letterSpacing: ' 0.05em' }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <PersonIcon />
                    </InputAdornment>
                  ),
                }}
                value={values.userId}
                onChange={handleChange('userId')}
              />
              <TextField
                variant='outlined'
                margin='normal'
                required
                fullWidth
                inputRef={register}
                label='รหัสผ่าน'
                name='password'
                autoComplete='on'
                helperText={errors.password ? 'กรุณากรอกรหัสผ่าน' : null}
                error={!!errors.password}
                style={{ letterSpacing: ' 0.05em' }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <LockIcon />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {values.showPassword ? (
                          <VisibilityIcon />
                        ) : (
                          <VisibilityOffIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                type={values.showPassword ? 'text' : 'password'}
                value={values.password}
                onChange={handleChange('password')}
              />
              <FormHelperText
                error
                style={{ fontSize: '0.9rem', textAlign: 'center' }}
              >
                {messageLogin ? messageLogin : ''}
              </FormHelperText>
              <Button
                size='large'
                color='secondary'
                variant='contained'
                className={classes.submit}
                fullWidth
                type='submit'
                onClick={handleSubmit(onLogin)}
              >
                เข้าสู่ระบบ
              </Button>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}
