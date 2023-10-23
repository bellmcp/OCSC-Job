import React from 'react'
import { get } from 'lodash'

import {
  DataGrid,
  GridColDef,
  bgBG,
  GridRenderCellParams,
  gridClasses,
} from '@mui/x-data-grid'

import Popper from '@mui/material/Popper'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import { Typography, Paper, Button } from '@material-ui/core'

import { createTheme, ThemeProvider, alpha, styled } from '@mui/material/styles'

const ODD_OPACITY = 0.07

interface DataTableProps {
  data: any
  loading: boolean
  countries: any
  salaryGroups: any
  educationLevels: any
  circularLetters: any
  handleOpenEditModal: any
}

const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
  [`& .${gridClasses.row}.even`]: {
    backgroundColor: 'transparent',
    '&:hover, &.Mui-hovered': {
      backgroundColor: alpha(theme.palette.secondary.main, ODD_OPACITY),
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
    },
  },
  [`& .${gridClasses.row}.odd`]: {
    '&:hover, &.Mui-hovered': {
      backgroundColor: alpha(theme.palette.secondary.main, ODD_OPACITY),
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
  countries = [],
  salaryGroups = [],
  educationLevels = [],
  circularLetters = [],
  handleOpenEditModal,
}: DataTableProps) {
  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'ลำดับ',
      width: 80,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'nationalId',
      headerName: 'เลขประจำตัวประชาชน',
      width: 180,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'title',
      headerName: 'คำนำหน้าชื่อ',
      width: 120,
    },
    {
      field: 'firstName',
      headerName: 'ชื่อ',
      width: 120,
    },
    {
      field: 'lastName',
      headerName: 'นามสกุล',
      width: 120,
    },
    {
      field: 'cntryId',
      headerName: 'ประเทศ',
      width: 180,
      renderCell: (params) => {
        const value = get(params, 'row.cntryId', 0)
        const result = countries.find((country: any) => country.id === value)
        return result.thainame ? result.thainame : ''
      },
    },
    {
      field: 'eduLevId',
      headerName: 'ระดับการศึกษา',
      width: 120,
      renderCell: (params) => {
        const value = get(params, 'row.eduLevId', 0)
        const result = educationLevels.find(
          (educationLevel: any) => educationLevel.id === value
        )
        return result.level ? result.level : ''
      },
    },
    {
      field: 'university',
      headerName: 'มหาวิทยาลัย/สถาบันการศึกษา',
      width: 250,
      renderCell: renderCellExpand,
    },
    {
      field: 'faculty',
      headerName: 'คณะ/หน่วยงานที่เทียบเท่าคณะ',
      width: 250,
      renderCell: renderCellExpand,
    },
    {
      field: 'degree',
      headerName: 'ชื่อปริญญา/ประกาศนียบัตร',
      width: 250,
      renderCell: renderCellExpand,
    },
    {
      field: 'branch',
      headerName: 'สาขาวิชา/วิชาเอก',
      width: 250,
      renderCell: renderCellExpand,
    },
    {
      field: 'thesis',
      headerName: 'หัวข้อวิทยานิพนธ์',
      width: 250,
      renderCell: renderCellExpand,
    },
    {
      field: 'appro',
      headerName: 'ผลการรับรอง',
      width: 300,
      cellClassName: 'blue',
      renderCell: renderCellExpand,
      renderHeader: () => {
        return (
          <Stack direction='row' alignItems='center' gap={0.5}>
            <Typography
              variant='body2'
              color='textPrimary'
              style={{ fontWeight: 500 }}
            >
              ผลการรับรอง
            </Typography>
            <Typography variant='body2' color='primary'>
              <b>*</b>
            </Typography>
          </Stack>
        )
      },
    },
    {
      field: 'note',
      headerName: 'หมายเหตุ',
      width: 300,
      cellClassName: 'blue',
      renderCell: renderCellExpand,
      renderHeader: () => {
        return (
          <Stack direction='row' alignItems='center' gap={0.5}>
            <Typography
              variant='body2'
              color='textPrimary'
              style={{ fontWeight: 500 }}
            >
              หมายเหตุ
            </Typography>
            <Typography variant='body2' color='primary'>
              <b>*</b>
            </Typography>
          </Stack>
        )
      },
    },
    {
      field: 'salGrpId',
      headerName: 'กลุ่มเงินเดือน',
      width: 220,
      cellClassName: 'blue',
      renderCell: (params) => {
        const value = get(params, 'row.salGrpId', 0)
        const result = salaryGroups.find(
          (salaryGroup: any) => salaryGroup.id === value
        )
        return result.salarygroup ? result.salarygroup : ''
      },
      renderHeader: () => {
        return (
          <Stack direction='row' alignItems='center' gap={0.5}>
            <Typography
              variant='body2'
              color='textPrimary'
              style={{ fontWeight: 500 }}
            >
              กลุ่มเงินเดือน
            </Typography>
            <Typography variant='body2' color='primary'>
              <b>*</b>
            </Typography>
          </Stack>
        )
      },
    },
    {
      field: 'circLetrId',
      headerName: 'หนังสือเวียน',
      width: 180,
      cellClassName: 'blue',
      renderCell: (params) => {
        const value = get(params, 'row.circLetrId', 0)
        const result = circularLetters.find(
          (circularLetter: any) => circularLetter.id === value
        )
        const no = get(result, 'no', '')
        const year = get(result, 'year', '')

        return `${no}${year ? ` (${year})` : ''}`
      },
      renderHeader: () => {
        return (
          <Stack direction='row' alignItems='center' gap={0.5}>
            <Typography
              variant='body2'
              color='textPrimary'
              style={{ fontWeight: 500 }}
            >
              หนังสือเวียน
            </Typography>
            <Typography variant='body2' color='primary'>
              <b>*</b>
            </Typography>
          </Stack>
        )
      },
    },
    {
      field: 'edit',
      headerName: 'แก้ไข',
      width: 120,
      align: 'center',
      headerAlign: 'center',
      disableColumnMenu: true,
      disableReorder: true,
      disableExport: true,
      filterable: false,
      sortable: false,
      renderCell: (params) => {
        const currentRowData = get(params, 'row', {})
        return (
          <Button
            variant='contained'
            color='secondary'
            size='small'
            style={{ padding: '4px 16px' }}
            onClick={() => handleOpenEditModal(currentRowData)}
          >
            แก้ไข
          </Button>
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
            '& .blue': {
              backgroundColor: alpha('#09348b', ODD_OPACITY),
              color: '#09348b',
            },
          }}
          experimentalFeatures={{ columnGrouping: true }}
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
