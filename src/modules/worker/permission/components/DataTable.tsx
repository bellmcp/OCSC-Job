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
} from '@material-ui/core'
import { Stack } from '@mui/material'
import { CheckCircle as CheckIcon } from '@material-ui/icons'
import { green } from '@material-ui/core/colors'

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
  workerPermissions,
  isPermissionLoading,
}: any) {
  const classes = useStyles()

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
              เลขประจำตัวประชาชน
            </StyledTableCell>
            <StyledTableCell
              align='center'
              style={{ lineHeight: 1.3, verticalAlign: 'top' }}
            >
              คำนำหน้า
            </StyledTableCell>
            <StyledTableCell
              align='center'
              style={{ lineHeight: 1.3, verticalAlign: 'top' }}
            >
              ชื่อ
            </StyledTableCell>
            <StyledTableCell
              align='center'
              style={{ lineHeight: 1.3, verticalAlign: 'top' }}
            >
              นามสกุล
            </StyledTableCell>
            <StyledTableCell
              align='center'
              style={{ lineHeight: 1.3, verticalAlign: 'top' }}
            >
              พิสูจน์ตัวจริง และสมัครสมาชิกแล้ว
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
          {workerPermissions.map((workerPermission: any, index: number) => (
            <StyledTableRow key={workerPermission.departmentName}>
              <StyledTableCell component='th' scope='row' align='center'>
                {index + 1}
              </StyledTableCell>
              <StyledTableCell>{workerPermission.nationalId}</StyledTableCell>
              <StyledTableCell style={{ fontWeight: 500 }}>
                {workerPermission.title}
              </StyledTableCell>
              <StyledTableCell style={{ fontWeight: 500 }}>
                {workerPermission.firstName}
              </StyledTableCell>
              <StyledTableCell style={{ fontWeight: 500 }}>
                {workerPermission.lastName}
              </StyledTableCell>
              <StyledTableCell align='center'>
                <Stack alignItems='center'>
                  {workerPermission.isActivated ? (
                    <CheckIcon
                      style={{
                        fontSize: 28,
                        color: green[800],
                      }}
                    />
                  ) : (
                    <></>
                  )}
                </Stack>
              </StyledTableCell>
              {workerPermission.permission.map(
                (permission: any, index: number) => (
                  <StyledTableCell align='center' key={`permission-${index}`}>
                    <CheckBox
                      isLoading={isPermissionLoading}
                      permission={permission}
                      agencyId={workerPermission.id}
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
