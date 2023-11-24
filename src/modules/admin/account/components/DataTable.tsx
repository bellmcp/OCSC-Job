import React from 'react'
import { get } from 'lodash'
import { useSelector } from 'react-redux'

import {
  DataGrid,
  GridColDef,
  bgBG,
  GridRenderCellParams,
  gridClasses,
} from '@mui/x-data-grid'

import Popper from '@mui/material/Popper'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import { Typography, Paper, Tooltip, IconButton } from '@material-ui/core'

import {
  CheckCircle as CheckIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@material-ui/icons'
import { createTheme, alpha, styled, ThemeProvider } from '@mui/material/styles'
import { green } from '@material-ui/core/colors'

const ODD_OPACITY = 0.07

interface DataTableProps {
  data: any
  loading: boolean
  handleOpenEditModal: () => void
  handleOpenDeleteModal: () => void
  setCurrentEditData: any
}

const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
  '& .MuiDataGrid-sortIcon': {
    opacity: 1,
    color: 'white',
  },
  '& .MuiDataGrid-menuIconButton': {
    opacity: 1,
    color: 'white',
  },
  '& .MuiDataGrid-iconSeparator': {
    opacity: 0.15,
    color: 'white',
  },
  [`& .${gridClasses.row}.even`]: {
    backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY),
    '&:hover, &.Mui-hovered': {
      backgroundColor: alpha(theme.palette.primary.main, 0.1),
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
    },
  },
  [`& .${gridClasses.row}.odd`]: {
    '&:hover, &.Mui-hovered': {
      backgroundColor: alpha(theme.palette.primary.main, 0.1),
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
    },
  },
}))

const theme = createTheme(
  {
    typography: {
      fontFamily: ['Prompt', 'sans-serif'].join(','),
    },
    palette: {
      primary: { main: '#09348b' },
      secondary: { main: '#17aacf' },
    },
  },
  bgBG
)

interface GridCellExpandProps {
  value: string
  width: number
}

function isOverflown(element: Element): boolean {
  return (
    element.scrollHeight > element.clientHeight ||
    element.scrollWidth > element.clientWidth
  )
}

const GridCellExpand = React.memo(function GridCellExpand(
  props: GridCellExpandProps
) {
  const { width, value } = props
  const wrapper = React.useRef<HTMLDivElement | null>(null)
  const cellDiv = React.useRef(null)
  const cellValue = React.useRef(null)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const [showFullCell, setShowFullCell] = React.useState(false)
  const [showPopper, setShowPopper] = React.useState(false)

  const handleMouseEnter = () => {
    const isCurrentlyOverflown = isOverflown(cellValue.current!)
    setShowPopper(isCurrentlyOverflown)
    setAnchorEl(cellDiv.current)
    setShowFullCell(true)
  }

  const handleMouseLeave = () => {
    setShowFullCell(false)
  }

  React.useEffect(() => {
    if (!showFullCell) {
      return undefined
    }

    function handleKeyDown(nativeEvent: KeyboardEvent) {
      // IE11, Edge (prior to using Bink?) use 'Esc'
      if (nativeEvent.key === 'Escape' || nativeEvent.key === 'Esc') {
        setShowFullCell(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [setShowFullCell, showFullCell])

  return (
    <Box
      ref={wrapper}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      sx={{
        alignItems: 'center',
        lineHeight: '24px',
        width: 1,
        height: 1,
        position: 'relative',
        display: 'flex',
      }}
    >
      <Box
        ref={cellDiv}
        sx={{
          height: 1,
          width,
          display: 'block',
          position: 'absolute',
          top: 0,
        }}
      />
      <Box
        ref={cellValue}
        sx={{
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {value}
      </Box>
      {showPopper && (
        <Popper
          open={showFullCell && anchorEl !== null}
          anchorEl={anchorEl}
          style={{ width, marginLeft: -17, zIndex: 9999999 }}
        >
          <Paper
            elevation={1}
            style={{ minHeight: wrapper.current!.offsetHeight - 3 }}
          >
            <Typography variant='body2' style={{ padding: 8 }}>
              {value}
            </Typography>
          </Paper>
        </Popper>
      )}
    </Box>
  )
})

function renderCellExpand(params: GridRenderCellParams<string>) {
  return (
    <GridCellExpand
      value={params.value || ''}
      width={params.colDef.computedWidth}
    />
  )
}

export default function DataTable({
  data,
  loading,
  handleOpenEditModal,
  handleOpenDeleteModal,
  setCurrentEditData,
}: DataTableProps) {
  const handleClickEdit = (row: any) => {
    setCurrentEditData(row)
    handleOpenEditModal()
  }

  const handleClickDelete = (row: any) => {
    setCurrentEditData(row)
    handleOpenDeleteModal()
  }

  const { roles = [] } = useSelector((state: any) => state.info)
  const getRoleByKey = (key: string) => {
    return roles[key] || ''
  }

  const columns: GridColDef[] = [
    {
      field: 'order',
      headerName: 'ลำดับ',
      width: 80,
      align: 'center',
      headerAlign: 'center',
      headerClassName: 'header',
    },
    {
      field: 'role',
      headerName: 'บทบาท',
      width: 150,
      align: 'center',
      headerAlign: 'center',
      headerClassName: 'header',
      valueParser: (params) => {
        const value = get(params, 'value', '')
        return getRoleByKey(value)
      },
      renderCell: (params) => {
        const value = get(params, 'value', '')
        return getRoleByKey(value)
      },
    },
    {
      field: 'nationalId',
      headerName: 'เลขประจำตัวประชาชน',
      width: 200,
      align: 'center',
      headerAlign: 'center',
      headerClassName: 'header',
    },
    {
      field: 'title',
      headerName: 'คำนำหน้า',
      width: 120,
      align: 'center',
      headerAlign: 'center',
      headerClassName: 'header',
      renderCell: renderCellExpand,
    },
    {
      field: 'firstName',
      headerName: 'ชื่อ',
      width: 200,
      align: 'center',
      headerAlign: 'center',
      headerClassName: 'header',
      renderCell: renderCellExpand,
    },
    {
      field: 'lastName',
      headerName: 'นามสกุล',
      headerAlign: 'center',
      headerClassName: 'header',
      width: 200,
      renderCell: renderCellExpand,
    },
    {
      field: 'isActivated',
      headerName: 'พิสูจน์ตัวจริง และสมัครสมาชิกแล้ว',
      width: 260,
      flex: 0.5,
      align: 'center',
      headerAlign: 'center',
      headerClassName: 'header',
      valueParser: (params) => {
        const value = get(params, 'value', '')
        return value === true ? 'สำเร็จ' : ''
      },
      renderCell: (params) => {
        const value = get(params, 'value', '')

        switch (value) {
          case true:
            return (
              <Stack direction='row' alignItems='center' spacing={1}>
                <CheckIcon
                  style={{
                    color: green[800],
                  }}
                />
                <Typography
                  variant='body2'
                  style={{ color: green[800], fontWeight: 600 }}
                >
                  สำเร็จ
                </Typography>
              </Stack>
            )
          case false:
            return <></>
          default:
            return <></>
        }
      },
    },
    {
      field: 'edit',
      flex: 0.5,
      headerName: 'จัดการข้อมูล',
      width: 200,
      align: 'center',
      headerAlign: 'center',
      disableColumnMenu: true,
      disableReorder: true,
      disableExport: true,
      filterable: false,
      sortable: false,
      headerClassName: 'header',
      renderCell: (params) => {
        const row = get(params, 'row', {})
        return (
          <Stack direction='row' alignItems='center' spacing={1}>
            <Tooltip title='แก้ไข'>
              <IconButton size='small' onClick={() => handleClickEdit(row)}>
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title='ลบ'>
              <IconButton size='small' onClick={() => handleClickDelete(row)}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </Stack>
        )
      },
    },
  ]

  return (
    <ThemeProvider theme={theme}>
      <div style={{ minHeight: 500 }}>
        <StripedDataGrid
          autoHeight
          sx={{
            maxHeight: 800,
            boxShadow:
              '0 2px 4px -2px rgba(0,0,0,0.24), 0 4px 24px -2px rgba(0, 0, 0, 0.2)',
            '& .header': {
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.common.white,
            },
          }}
          initialState={{
            pagination: {
              pageSize: 100,
            },
          }}
          loading={loading}
          getRowClassName={(params) =>
            params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
          }
          rows={data}
          columns={columns}
          disableSelectionOnClick
          rowsPerPageOptions={[25, 50, 100, 250, 500, 1000]}
          localeText={{
            // Root
            noRowsLabel: 'ไม่มีข้อมูล',
            noResultsOverlayLabel: 'ไม่พบผลลัพธ์',
            errorOverlayDefaultLabel: 'เกิดข้อผิดพลาดบางอย่าง',

            // Density selector toolbar button text
            toolbarDensity: 'ขนาดของแถว',
            toolbarDensityLabel: 'ขนาดของแถว',
            toolbarDensityCompact: 'กะทัดรัด',
            toolbarDensityStandard: 'มาตรฐาน',
            toolbarDensityComfortable: 'สบายตา',

            // Columns selector toolbar button text
            toolbarColumns: 'จัดการคอลัมน์',
            toolbarColumnsLabel: 'เลือกคอลัมน์',

            // Filters toolbar button text
            toolbarFilters: 'ตัวกรอง',
            toolbarFiltersLabel: 'แสดงตัวกรอง',
            toolbarFiltersTooltipHide: 'ซ่อนตัวกรอง',
            toolbarFiltersTooltipShow: 'แสดงตัวกรอง',
            toolbarFiltersTooltipActive: (count) =>
              count !== 1
                ? `${count} ตัวกรองที่ใช้อยู่`
                : `${count} ตัวกรองที่ใช้อยู่`,

            // Quick filter toolbar field
            toolbarQuickFilterPlaceholder: 'ค้นหา...',
            toolbarQuickFilterLabel: 'ค้นหา',
            toolbarQuickFilterDeleteIconLabel: 'ล้าง',

            // Export selector toolbar button text
            toolbarExport: 'ส่งออก',
            toolbarExportLabel: 'ส่งออก',
            toolbarExportCSV: 'ส่งออกเป็นไฟล์ CSV',
            toolbarExportPrint: 'สั่งพิมพ์',
            toolbarExportExcel: 'ส่งออกเป็นไฟล์ Excel',

            // Columns panel text
            columnsPanelTextFieldLabel: 'ค้นหาคอลัมน์',
            columnsPanelTextFieldPlaceholder: 'ชื่อคอลัมน์',
            columnsPanelDragIconLabel: 'Reorder column',
            columnsPanelShowAllButton: 'แสดงทั้งหมด',
            columnsPanelHideAllButton: 'ซ่อนทั้งหมด',

            // Filter panel text
            filterPanelAddFilter: 'เพิ่มตัวกรอง',
            filterPanelDeleteIconLabel: 'ลบ',
            filterPanelLinkOperator: 'เงื่อนไข',
            filterPanelOperators: 'เงื่อนไข', // TODO v6: rename to filterPanelOperator
            filterPanelOperatorAnd: 'และ',
            filterPanelOperatorOr: 'หรือ',
            filterPanelColumns: 'คอลัมน์',
            filterPanelInputLabel: 'คำค้นหา',
            filterPanelInputPlaceholder: 'คำค้นหา',

            // Filter operators text
            filterOperatorContains: 'ประกอบด้วย',
            filterOperatorEquals: 'เท่ากับ',
            filterOperatorStartsWith: 'เริ่มต้นด้วย',
            filterOperatorEndsWith: 'ลงท้ายด้วย',
            filterOperatorIs: 'มีค่าเป็น',
            filterOperatorNot: 'ไม่ได้มีค่าเป็น',
            filterOperatorAfter: 'อยู่ถัดจาก',
            filterOperatorOnOrAfter: 'อยู่เท่ากับ หรือ ถัดจาก',
            filterOperatorBefore: 'อยู่ก่อนหน้า',
            filterOperatorOnOrBefore: 'อยู่เท่ากับ หรือ ก่อนหน้า',
            filterOperatorIsEmpty: 'ไม่มีค่า',
            filterOperatorIsNotEmpty: 'มีค่า',
            filterOperatorIsAnyOf: 'เป็นหนึ่งใน',

            // Filter values text
            filterValueAny: 'ใดๆ',
            filterValueTrue: 'ถูก',
            filterValueFalse: 'ผิด',

            // Column menu text
            columnMenuLabel: 'เมนู',
            columnMenuShowColumns: 'จัดการคอลัมน์',
            columnMenuFilter: 'ตัวกรอง',
            columnMenuHideColumn: 'ซ่อน',
            columnMenuUnsort: 'เลิกเรียงลำดับ',
            columnMenuSortAsc: 'เรียงน้อยไปมาก',
            columnMenuSortDesc: 'เรียงมากไปน้อย',

            // Column header text
            columnHeaderFiltersTooltipActive: (count) =>
              count !== 1
                ? `${count} ตัวกรองที่ใช้อยู่`
                : `${count} ตัวกรองที่ใช้อยู่`,
            columnHeaderFiltersLabel: 'แสดงตัวกรอง',
            columnHeaderSortIconLabel: 'เรียงลำดับ',

            // Rows selected footer text
            footerRowSelected: (count) =>
              count !== 1
                ? `${count.toLocaleString()} แถวถูกเลือก`
                : `${count.toLocaleString()} แถวถูกเลือก`,

            // Total row amount footer text
            footerTotalRows: 'จำนวนแถวทั้งหมด',

            // Total visible row amount footer text
            footerTotalVisibleRows: (visibleCount, totalCount) =>
              `${visibleCount.toLocaleString()} จาก ${totalCount.toLocaleString()}`,

            // Checkbox selection text
            checkboxSelectionHeaderName: 'Checkbox selection',
            checkboxSelectionSelectAllRows: 'Select all rows',
            checkboxSelectionUnselectAllRows: 'Unselect all rows',
            checkboxSelectionSelectRow: 'Select row',
            checkboxSelectionUnselectRow: 'Unselect row',

            // Boolean cell text
            booleanCellTrueLabel: 'yes',
            booleanCellFalseLabel: 'no',

            // Actions cell more text
            actionsCellMore: 'more',

            // Column pinning text
            pinToLeft: 'Pin to left',
            pinToRight: 'Pin to right',
            unpin: 'Unpin',

            // Tree Data
            treeDataGroupingHeaderName: 'Group',
            treeDataExpand: 'see children',
            treeDataCollapse: 'hide children',

            // Grouping columns
            groupingColumnHeaderName: 'Group',
            groupColumn: (name) => `Group by ${name}`,
            unGroupColumn: (name) => `Stop grouping by ${name}`,

            // Master/detail
            expandDetailPanel: 'Expand',
            collapseDetailPanel: 'Collapse',

            // Used core components translation keys
            MuiTablePagination: {
              labelRowsPerPage: 'จำนวนแถวต่อหน้า',
              labelDisplayedRows: ({ from, to, count }) =>
                `${from}-${to} จาก ${count}`,
            },

            // Row reordering text
            rowReorderingHeaderName: 'Row reordering',
          }}
        />
      </div>
    </ThemeProvider>
  )
}
