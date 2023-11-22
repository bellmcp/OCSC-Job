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
  IconButton,
  Tooltip,
} from '@material-ui/core'
import { Stack } from '@mui/material'
import {
  CheckCircle as CheckIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@material-ui/icons'
import { green } from '@material-ui/core/colors'

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
              บทบาท
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
            <StyledTableCell></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {workerPermissions.map((workerPermission: any, index: number) => (
            <StyledTableRow key={workerPermission.departmentName}>
              <StyledTableCell component='th' scope='row' align='center'>
                {index + 1}
              </StyledTableCell>
              <StyledTableCell>Role</StyledTableCell>
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
              <StyledTableCell style={{ fontWeight: 500 }}>
                <Stack direction='row' alignItems='center' spacing={1}>
                  <Tooltip title='แก้ไข'>
                    <IconButton size='small'>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title='ลบ'>
                    <IconButton size='small'>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </Stack>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
