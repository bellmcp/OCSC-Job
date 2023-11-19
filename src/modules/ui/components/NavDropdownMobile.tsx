// @ts-nocheck
import React from 'react'

import {
  MenuItem,
  Menu,
  Avatar,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@material-ui/core'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { amber } from '@material-ui/core/colors'
import { MeetingRoom as LogoutIcon } from '@material-ui/icons'
import { grey } from '@material-ui/core/colors'

import { getCookie } from 'utils/cookies'

interface NavDropdownMobileProps {
  isLoggedIn: boolean
  logout: () => void
  mobileMenuId: number
  mobileMoreAnchorEl: any
  isMobileMenuOpen: boolean
  handleMobileMenuClose: () => void
  linkToLogin: () => void
  linkToHome: () => void
  linkToChangePassword: () => void
  usernameLabel: string
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    small: {
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
    bold: {
      fontWeight: 600,
    },
  })
)

export default function NavDropdownMobile({
  isLoggedIn,
  logout,
  mobileMenuId,
  mobileMoreAnchorEl,
  isMobileMenuOpen,
  handleMobileMenuClose,
  role,
  roleName,
}: NavDropdownMobileProps) {
  const classes = useStyles()

  const fullnameLabel = `${
    getCookie('firstName') ? getCookie('firstName') : ''
  } ${getCookie('lastName') ? getCookie('lastName') : ''}`

  const getAvatarClassName = () => {
    switch (role) {
      case 'ocsc':
        return classes.loggedInAsOCSC
      case 'administrator':
        return classes.loggedInAsAdmin
      case 'worker':
        return classes.loggedIn
    }
  }

  return (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <ListItem dense>
        <ListItemIcon color='inherit'>
          <Avatar className={getAvatarClassName()} />
        </ListItemIcon>
        <ListItemText
          className={classes.bold}
          primary={
            <Typography style={{ fontWeight: 600, lineHeight: '1.2' }}>
              {fullnameLabel}
            </Typography>
          }
          secondary={
            <Typography variant='body2' color='textSecondary'>
              {roleName}
            </Typography>
          }
        />
      </ListItem>
      <Divider style={{ marginTop: 8 }} />
      {isLoggedIn && (
        <MenuItem onClick={logout}>
          <ListItemIcon color='inherit'>
            <LogoutIcon style={{ margin: 8, marginLeft: 4 }} />
          </ListItemIcon>
          <ListItemText primary='ออกจากระบบ'></ListItemText>
        </MenuItem>
      )}
    </Menu>
  )
}
