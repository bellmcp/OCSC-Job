// @ts-nocheck
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { getCookie, eraseCookie } from 'utils/cookies'

import { fade, makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Hidden,
  Container,
  Avatar,
  Button,
} from '@material-ui/core'
import { KeyboardArrowDown as ArrowDownIcon } from '@material-ui/icons'
import { grey, amber } from '@material-ui/core/colors'

import NavDropdownMobile from './NavDropdownMobile'
import NavDropdownDesktop from './NavDropdownDesktop'

import * as uiActions from 'modules/ui/actions'
import * as infoActions from 'modules/info/actions'
import { isLogin, getRoleFromToken } from 'utils/isLogin'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    selected: {
      borderLeft: `4px solid ${theme.palette.primary.main} !important`,
    },
    dropdownMenu: {
      borderLeft: `4px solid transparent`,
    },
    grow: {
      flexGrow: 1,
    },
    appBar: {
      backgroundColor: 'rgb(255, 255, 255)',
      // backgroundColor: 'rgba(255, 255, 255, 0.85)',
      // backdropFilter: 'saturate(180%) blur(20px)',
      boxShadow: 'rgb(0 0 0 / 15%) 0px 0px 10px',
      [theme.breakpoints.up('sm')]: {
        zIndex: theme.zIndex.drawer + 1,
      },
    },
    menuButton: {
      marginRight: theme.spacing(1),
    },
    title: {
      display: 'none',
      marginRight: theme.spacing(4),
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
      '&:hover': {
        cursor: 'pointer',
      },
    },
    logo: {
      display: 'block',
      maxWidth: 140,
      marginRight: theme.spacing(3),
      [theme.breakpoints.down('xs')]: {
        maxWidth: 130,
      },
      '&:hover': {
        cursor: 'pointer',
      },
    },
    link: {
      textDecoration: 'none !important',
    },
    search: {
      position: 'relative',
      backgroundColor: fade(theme.palette.common.white, 0.9),
      borderRadius: theme.shape.borderRadius,
      width: '100%',
    },
    searchIcon: {
      color: grey[400],
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: theme.palette.text.primary,
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      paddingRight: `calc(3em)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      borderRadius: theme.shape.borderRadius,
      border: `1px solid ${theme.palette.grey[300]}`,
      '&:hover': {
        border: `1px solid ${theme.palette.grey[400]}`,
      },
      '&:focus': {
        border: `1px solid ${theme.palette.primary.main}`,
      },
    },
    sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
    },
    sectionMobile: {
      display: 'flex',
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
    notLoggedIn: {
      width: theme.spacing(4),
      height: theme.spacing(4),
      backgroundColor: grey[700],
    },
    loggedIn: {
      color: theme.palette.common.white,
      width: theme.spacing(4),
      height: theme.spacing(4),
      backgroundColor: process.env.REACT_APP_PRIMARY_COLOR_HEX,
    },
    loggedInAsAdmin: {
      color: theme.palette.common.white,
      width: theme.spacing(4),
      height: theme.spacing(4),
      backgroundColor: process.env.REACT_APP_SECONDARY_COLOR_HEX,
    },
    loggedInAsOCSC: {
      color: theme.palette.common.white,
      width: theme.spacing(4),
      height: theme.spacing(4),
      backgroundColor: amber[700],
    },
    noDecorationLink: {
      textDecoration: 'none',
    },
    navMenu: {
      minWidth: '270px',
    },
    navItem: {
      color: theme.palette.text.primary,
    },
    navItemActive: {
      color: theme.palette.primary.main,
    },
    badge: {
      zIndex: 10,
    },
    divider: {
      width: 2,
      height: 32,
      margin: theme.spacing(2),
      backgroundColor: '#A7A8AB',
    },
    bold: {
      fontWeight: 600,
    },
    topScrollPaper: {
      alignItems: 'flex-start',
    },
    topPaperScrollBody: {
      verticalAlign: 'top',
    },
  })
)

export default function NavBar() {
  const classes = useStyles()
  const history = useHistory()
  const dispatch = useDispatch()
  const PATH = process.env.REACT_APP_BASE_PATH
  const LogoImage = require('assets/images/logo.png')

  useEffect(() => {
    dispatch(infoActions.loadRoles())
  }, [dispatch])

  const role = getRoleFromToken()
  const { roles = [] } = useSelector((state: any) => state.info)
  const getRoleByKey = (key: string) => {
    return roles[key] || ''
  }
  const [roleName, setRoleName] = useState<string>('')
  useEffect(() => {
    setRoleName(getRoleByKey(role))
  }, [roles, role]) //eslint-disable-line

  const menuId = 'primary-account-menu'
  const mobileMenuId = 'primary-account-menu-mobile'

  const isLoggedIn = isLogin()

  const getUsernameLabel = () => {
    if (isLoggedIn) return getCookie('firstName')
    else return 'เข้าสู่ระบบ'
  }
  const usernameLabel = getUsernameLabel()

  const getAvatarClassName = () => {
    if (isLoggedIn) {
      switch (role) {
        case 'ocsc':
          return classes.loggedInAsOCSC
        case 'administrator':
          return classes.loggedInAsAdmin
        case 'worker':
          return classes.loggedIn
      }
    } else {
      return classes.notLoggedIn
    }
  }

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    useState<null | HTMLElement>(null)

  const isMenuOpen = Boolean(anchorEl)
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget)
  }
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null)
  }

  const linkToHome = () => {
    handleMenuClose()
    history.push(`${PATH}`)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    handleMobileMenuClose()
  }

  const logout = () => {
    handleMenuClose()
    eraseCookie('token')
    eraseCookie('firstName')
    eraseCookie('lastName')
    eraseCookie('ministry')
    eraseCookie('ministryId')
    eraseCookie('department')
    eraseCookie('departmentId')
    eraseCookie('id')
    eraseCookie('seal')
    dispatch(uiActions.setFlashMessage('ออกจากระบบเรียบร้อยแล้ว', 'success'))
    setTimeout(() => {
      history.push(`${PATH}/login`)
    }, 2000)
    window.location.reload()
  }

  return (
    <div className={classes.grow}>
      <AppBar position='fixed' className={classes.appBar} elevation={0}>
        <Container maxWidth='lg'>
          <Toolbar>
            {/* SITE LOGO */}
            <img
              src={LogoImage}
              alt='OCSC Logo'
              className={classes.logo}
              onClick={linkToHome}
              style={{ filter: 'saturate(1.3)' }}
            />
            <div className={classes.grow} />

            {/* DESKTOP USER DROPDOWN */}
            <div className={classes.sectionDesktop}>
              <Button
                onClick={handleProfileMenuOpen}
                disabled={!isLoggedIn}
                color='primary'
                size='small'
                style={{
                  borderRadius: 50,
                  padding: '5px 12px 5px 8px',
                  margin: '6px 0',
                  border: '1px solid rgba(224, 224, 224, 1)',
                }}
                startIcon={<Avatar className={getAvatarClassName()} />}
                endIcon={
                  isLoggedIn && (
                    <ArrowDownIcon style={{ fontSize: 24 }} color='action' />
                  )
                }
              >
                <Typography color='textPrimary' className={classes.bold} noWrap>
                  {usernameLabel}
                </Typography>
              </Button>
            </div>

            {/* MOBILE USER DROPDOWN */}
            <Hidden only={['xs', 'lg', 'md', 'xl']}>
              <div className={classes.grow} />
            </Hidden>
            <div className={classes.sectionMobile}>
              <IconButton
                disabled={!isLoggedIn}
                aria-controls={mobileMenuId}
                onClick={handleMobileMenuOpen}
                color='inherit'
              >
                <Avatar className={getAvatarClassName()} />
              </IconButton>
            </div>
          </Toolbar>
        </Container>
      </AppBar>

      <NavDropdownMobile
        isLoggedIn={isLoggedIn}
        logout={logout}
        mobileMenuId={mobileMenuId}
        mobileMoreAnchorEl={mobileMoreAnchorEl}
        isMobileMenuOpen={isMobileMenuOpen}
        handleMobileMenuClose={handleMobileMenuClose}
        role={role}
        roleName={roleName}
      />
      <NavDropdownDesktop
        isLoggedIn={isLoggedIn}
        logout={logout}
        anchorEl={anchorEl}
        menuId={menuId}
        isMenuOpen={isMenuOpen}
        handleMenuClose={handleMenuClose}
        role={role}
        roleName={roleName}
      />
    </div>
  )
}
