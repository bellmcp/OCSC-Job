import React from 'react'
import { get } from 'lodash'

import {
  DataGrid,
  GridColDef,
  bgBG,
  GridRenderCellParams,
  gridClasses,
  GRID_CHECKBOX_SELECTION_COL_DEF,
} from '@mui/x-data-grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import Popper from '@mui/material/Popper'

import { createTheme, ThemeProvider, alpha, styled } from '@mui/material/styles'
import { deepPurple } from '@material-ui/core/colors'

const ODD_OPACITY = 0.07

interface DataTableProps {
  data: any
  loading: boolean
  selectionModel: any
  setSelectionModel: any
}

interface GridAccreditationCellExpandProps {
  params: any
  width: number
}

interface GridCellExpandProps {
  value: string
  width: number
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

const GridAccreditationCellExpand = React.memo(
  function GridAccreditationCellExpand(
    props: GridAccreditationCellExpandProps
  ) {
    const { width, params } = props
    const wrapper = React.useRef<HTMLDivElement | null>(null)
    const cellDiv = React.useRef(null)
    const cellValue = React.useRef(null)
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
    const [showFullCell, setShowFullCell] = React.useState(false)
    const [showPopper, setShowPopper] = React.useState(false)

    const handleMouseEnter = () => {
      const isCurrentlyOverflown = true
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
          {get(params, 'row.accreditation', '')}
        </Box>
        {showPopper && (
          <Popper
            open={showFullCell && anchorEl !== null}
            anchorEl={anchorEl}
            style={{ width, marginLeft: -17, zIndex: 9999999 }}
          >
            <Paper
              elevation={3}
              style={{
                minHeight: wrapper.current!.offsetHeight - 3,
                padding: 16,
                borderRadius: 8,
              }}
            >
              <Typography variant='body2'>
                {get(params, 'row.accreditation', '')}
              </Typography>
            </Paper>
          </Popper>
        )}
      </Box>
    )
  }
)

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

function renderAccreditationCellExpand(params: GridRenderCellParams<string>) {
  return (
    <GridAccreditationCellExpand
      params={params}
      width={params.colDef.computedWidth}
    />
  )
}

const columns: GridColDef[] = [
  {
    field: 'order',
    headerName: 'ลำดับ',
    width: 80,
    align: 'center',
    headerAlign: 'center',
  },
  {
    ...GRID_CHECKBOX_SELECTION_COL_DEF,
    width: 50,
    cellClassName: 'blue',
  },
  {
    field: 'accreditation1',
    headerName: 'ผลการรับรอง',
    width: 425,
    renderCell: renderAccreditationCellExpand,
    cellClassName: 'blue',
  },
  {
    field: 'score',
    headerName: 'คะแนน',
    width: 100,
    align: 'center',
    headerAlign: 'center',
    cellClassName: 'blue',
  },
  {
    field: 'university',
    headerName: 'มหาวิทยาลัย/สถาบันการศึกษา',
    width: 220,
    renderCell: renderCellExpand,
  },
  {
    field: 'degree',
    headerName: 'ชื่อปริญญา/ประกาศนียบัตร',
    width: 220,
    renderCell: renderCellExpand,
  },
  {
    field: 'branch',
    headerName: 'สาขา/วิชาเอก',
    width: 220,
    renderCell: renderCellExpand,
  },
  {
    field: 'level',
    headerName: 'ระดับการศึกษา',
    width: 120,
    renderCell: renderCellExpand,
  },
  {
    field: 'faculty',
    headerName: 'คณะ/หน่วยงาน',
    width: 200,
    renderCell: renderCellExpand,
  },
  {
    field: 'note',
    headerName: 'หมายเหตุ',
    width: 300,
    renderCell: renderCellExpand,
  },
  {
    field: 'nationalId',
    headerName: 'เลขประจำตัวประชาชน',
    width: 180,
    renderCell: renderCellExpand,
  },
  {
    field: 'name',
    headerName: 'ชื่อ และ นามสกุล',
    width: 300,
    renderCell: renderCellExpand,
  },
]

export default function RecommendationTable({
  data,
  loading,
  selectionModel,
  setSelectionModel,
}: DataTableProps) {
  return (
    <ThemeProvider theme={theme}>
      <div style={{ minHeight: 500 }}>
        <StripedDataGrid
          checkboxSelection
          onSelectionModelChange={(newSelectionModel: any) => {
            const old = selectionModel
            const current = newSelectionModel
            const res = current.filter((item: number) => !old.includes(item))
            setSelectionModel(res)
          }}
          selectionModel={selectionModel}
          autoHeight
          sx={{
            '& .MuiDataGrid-columnHeaderCheckbox .MuiDataGrid-columnHeaderTitleContainer':
              {
                display: 'none',
              },
            '& .blue': {
              backgroundColor: alpha(deepPurple[500], ODD_OPACITY),
              color: deepPurple[500],
            },
            '& .MuiDataGrid-virtualScroller': {
              transform: 'rotateX(180deg)',
            },
            '& .MuiDataGrid-virtualScrollerContent': {
              transform: 'rotateX(180deg)',
            },
            '& .MuiDataGrid-virtualScroller::-webkit-scrollbar': {
              width: '0.4em',
            },
            '& .MuiDataGrid-virtualScroller::-webkit-scrollbar-track': {
              background: '#f1f1f1',
            },
            '& .MuiDataGrid-virtualScroller::-webkit-scrollbar-thumb': {
              backgroundColor: '#888',
              borderRadius: 8,
              border: '3px solid #f1f1f1',
            },
            '& .MuiDataGrid-virtualScroller::-webkit-scrollbar-thumb:hover': {
              background: '#555',
            },
          }}
          initialState={{
            pagination: {
              pageSize: 50,
            },
          }}
          rowsPerPageOptions={[25, 50, 100, 250, 500, 1000]}
          loading={loading}
          getRowClassName={(params) =>
            params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
          }
          rows={data}
          columns={columns}
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
