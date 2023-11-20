// @ts-nocheck
import React from 'react'

import {
  MenuItem,
  Menu,
  ListItemIcon,
  ListItemText,
  Divider,
  ListItem,
  Avatar,
  Typography,
} from '@material-ui/core'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { MeetingRoom as LogoutIcon } from '@material-ui/icons'

import { getCookie } from 'utils/cookies'

interface NavDropdownDesktopProps {
  isLoggedIn: boolean
  logout: () => void
  linkToHome: () => void
  linkToChangePassword: () => void
  anchorEl: any
  menuId: number
  isMenuOpen: boolean
  handleMenuClose: () => void
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    listItemIcon: {
      minWidth: 40,
    },
    bold: {
      fontWeight: 600,
    },
  })
)

export default function NavDropdownDesktop({
  isLoggedIn,
  logout,
  anchorEl,
  menuId,
  isMenuOpen,
  handleMenuClose,
  roleName,
  profileImage,
}: NavDropdownDesktopProps) {
  const classes = useStyles()

  const fullnameLabel = `${
    getCookie('firstName') ? getCookie('firstName') : ''
  } ${getCookie('lastName') ? getCookie('lastName') : ''}`

  return (
    <Menu
      anchorEl={anchorEl}
      id={menuId}
      keepMounted
      open={isMenuOpen}
      onClose={handleMenuClose}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
    >
      <ListItem dense>
        <ListItemIcon color='inherit'>
          <Avatar src={profileImage} />
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
          <ListItemIcon className={classes.listItemIcon}>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary='ออกจากระบบ' />
        </MenuItem>
      )}
    </Menu>
  )
}
