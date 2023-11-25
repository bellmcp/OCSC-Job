import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { getCookie } from 'utils/cookies'

import {
  Button,
  Typography,
  Avatar,
  Toolbar,
  Grid,
  Container,
  Chip,
  useMediaQuery,
} from '@material-ui/core'
import { Stack } from '@mui/material'
import { useTheme } from '@material-ui/core/styles'
import { amber } from '@material-ui/core/colors'
import {
  ChevronRight as ChevronRightIcon,
  Launch as LaunchIcon,
} from '@material-ui/icons'

import * as homeActions from 'modules/home/actions'
import { getRoleFromToken } from 'utils/isLogin'
import Loading from 'modules/ui/components/Loading'

const PATH = process.env.REACT_APP_BASE_PATH

export default function Home() {
  const dispatch = useDispatch()
  const history = useHistory()
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('md'))

  const { roles = [] } = useSelector((state: any) => state.info)
  const { menuItems = [], isLoading = false } = useSelector(
    (state: any) => state.home
  )

  const role = getRoleFromToken()
  const getRoleByKey = (key: string) => {
    return roles[key] || ''
  }
  const [roleName, setRoleName] = useState<string>('')

  useEffect(() => {
    setRoleName(getRoleByKey(role))
  }, [roles, role]) //eslint-disable-line

  useEffect(() => {
    dispatch(homeActions.loadMenuItems())
  }, [dispatch])

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

  const isExternalLink = (link: string) => {
    return link.includes('http')
  }

  const handleClickMenuItem = (link: string) => {
    if (isExternalLink(link)) {
      window.open(link, '_blank')
    } else {
      history.push(`${PATH}${link}`)
    }
  }

  const fullnameLabel = `${getCookie('firstName') || ''} ${
    getCookie('lastName') || ''
  }`

  const profileImage = getCookie('seal') || ''
  const ministry = getCookie('ministry') || ''
  const department = getCookie('department') || ''

  const renderContent = () => {
    if (isLoading) {
      return (
        <Grid item xs={12} md={8}>
          <Loading height={800}></Loading>
        </Grid>
      )
    } else {
      return (
        <Grid item xs={12} md={8}>
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
          </Stack>
          <Stack direction='column' alignItems='center' spacing={2}>
            {menuItems.map((menuItem: any, index: any) => (
              <Button
                key={index}
                size='large'
                color='secondary'
                variant={
                  isExternalLink(menuItem.url) ? 'outlined' : 'contained'
                }
                endIcon={
                  isExternalLink(menuItem.url) ? (
                    <LaunchIcon />
                  ) : (
                    <ChevronRightIcon />
                  )
                }
                fullWidth
                style={{
                  textAlign: 'left',
                  justifyContent: 'flex-start',
                }}
                onClick={() => handleClickMenuItem(menuItem.url)}
              >
                {menuItem.text}
              </Button>
            ))}
          </Stack>
        </Grid>
      )
    }
  }

  return (
    <Container maxWidth='md'>
      <Grid container style={{ paddingBlock: 128 }} spacing={6}>
        <Grid container item xs={12} md={4}>
          <Stack
            direction='column'
            alignItems={matches ? 'flex-start' : 'center'}
            spacing={4}
            width='100%'
          >
            <Avatar
              src={profileImage}
              style={{
                width: 180,
                height: 180,
                backgroundColor: theme.palette.common.white,
                boxShadow:
                  '0 2px 4px -2px rgba(0,0,0,0.24), 0 4px 24px -2px rgba(0, 0, 0, 0.2)',
              }}
            />
            <Stack
              direction='column'
              spacing={1}
              alignItems={matches ? 'flex-start' : 'center'}
            >
              <Typography
                component='h1'
                variant='h5'
                color='textPrimary'
                align={matches ? 'left' : 'center'}
                style={{ fontWeight: 600, lineHeight: 1.2 }}
              >
                {fullnameLabel}
              </Typography>
              <Chip
                size='small'
                label={roleName}
                variant='outlined'
                style={{
                  marginBottom: 16,
                  fontWeight: 500,
                  borderColor: getChipColorByRole(role),
                  color: getChipColorByRole(role),
                }}
              />
              <Typography
                variant='body1'
                color='textSecondary'
                align={matches ? 'left' : 'center'}
                style={{ lineHeight: 1.2 }}
              >
                {ministry}
              </Typography>
              <Typography
                variant='body1'
                color='textSecondary'
                align={matches ? 'left' : 'center'}
                style={{ lineHeight: 1.2 }}
              >
                {department}
              </Typography>
            </Stack>
          </Stack>
        </Grid>
        {renderContent()}
      </Grid>
    </Container>
  )
}
