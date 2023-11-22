import React from 'react'
import { get } from 'lodash'
import {
  withStyles,
  Theme,
  createStyles,
  makeStyles,
} from '@material-ui/core/styles'
import { alpha } from '@mui/material/styles'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
} from '@material-ui/core'
import { Stack } from '@mui/material'

import CheckBox from './CheckBox'

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  })
)(TableCell)

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: alpha(theme.palette.secondary.main, 0.07),
      },
    },
  })
)(TableRow)

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
})

export default function DataTable({
  ocscServices,
  adminPermissions,
  ministries,
  departments,
  isPermissionLoading,
}: any) {
  const classes = useStyles()

  const getMinistrySealById = (id: number) => {
    const result = ministries.find((ministry: any) => ministry.id === id)
    return get(result, 'seal', '')
  }
  const getDepartmentSealById = (id: number) => {
    const result = departments.find((department: any) => department.id === id)
    return get(result, 'seal', '')
  }
  const getOCSCServiceIdByIndex = (index: number) => {
    const result = ocscServices[index]
    return get(result, 'id', null)
  }

  return (
    <TableContainer
      component={Paper}
      style={{
        maxHeight: 800,
        borderRadius: 8,
        boxShadow:
          '0 2px 4px -2px rgba(0,0,0,0.24), 0 4px 24px -2px rgba(0, 0, 0, 0.2)',
      }}
    >
      <Table stickyHeader className={classes.table}>
        <TableHead>
          <TableRow>
            <StyledTableCell
              align='center'
              style={{ lineHeight: 1.3, verticalAlign: 'top' }}
            >
              ลำดับ
            </StyledTableCell>
            <StyledTableCell
              align='center'
              style={{ lineHeight: 1.3, verticalAlign: 'top' }}
            >
              กระทรวง
            </StyledTableCell>
            <StyledTableCell
              align='center'
              style={{ lineHeight: 1.3, verticalAlign: 'top' }}
            >
              กรม
            </StyledTableCell>
            {ocscServices.map((ocscService: any, index: number) => (
              <StyledTableCell
                key={`service-${index}`}
                align='center'
                style={{ lineHeight: 1.3, verticalAlign: 'top' }}
              >
                {ocscService.service}
              </StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {adminPermissions.map((adminPermission: any, index: number) => (
            <StyledTableRow key={adminPermission.departmentName}>
              <StyledTableCell component='th' scope='row' align='center'>
                {index + 1}
              </StyledTableCell>
              <StyledTableCell style={{ fontWeight: 500 }}>
                <Stack direction='row' alignItems='center' spacing={2}>
                  <Avatar
                    style={{ width: 32, height: 32 }}
                    src={getMinistrySealById(adminPermission.ministryId)}
                  />
                  <div>{adminPermission.ministryName}</div>
                </Stack>
              </StyledTableCell>
              <StyledTableCell>
                <Stack direction='row' alignItems='center' spacing={2}>
                  <Avatar
                    style={{ width: 32, height: 32 }}
                    src={getDepartmentSealById(adminPermission.departmentId)}
                  />
                  <div>{adminPermission.departmentName}</div>
                </Stack>
              </StyledTableCell>
              {adminPermission.permission.map(
                (permission: any, index: number) => (
                  <StyledTableCell align='center' key={`permission-${index}`}>
                    <CheckBox
                      isLoading={isPermissionLoading}
                      permission={permission}
                      departmentId={adminPermission.departmentId}
                      ocscServiceId={getOCSCServiceIdByIndex(index)}
                    />
                  </StyledTableCell>
                )
              )}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
