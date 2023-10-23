import React, { useState } from 'react'
import { get } from 'lodash'

import {
  Dialog,
  DialogContent,
  Slide,
  Toolbar,
  IconButton,
  AppBar,
  Typography,
  Button,
  Grid,
} from '@material-ui/core'
import { Stack } from '@mui/material'
import { Close as CloseIcon } from '@material-ui/icons'
import { TransitionProps } from '@material-ui/core/transitions'

import DataTable from './DataTable'
import EditModal from '../EditModal/EditModal'

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />
})

export default function DetailModal({
  isOpen,
  onClose,
  data = [],
  isLoading = false,
  countries = [],
  salaryGroups = [],
  educationLevels = [],
  circularLetters = [],
  currentRowData = {},
}: any) {
  const onCancel = () => {
    onClose()
  }

  const currentEditRowDataList = [
    {
      title: 'ลำดับ',
      value: get(currentRowData, 'order', ''),
    },
    {
      title: 'เลขที่',
      value: get(currentRowData, 'id', ''),
    },
    {
      title: 'หนังสือเข้า - เลขที่',
      value: get(currentRowData, 'letterNo', ''),
    },
    {
      title: 'หนังสือเข้า - วันที่',
      value: get(currentRowData, 'letterDatePrint', ''),
    },
    {
      title: 'หนังสือเข้า - หน่วยงาน',
      value: get(currentRowData, 'letterAgency', ''),
    },
    {
      title: 'จำนวนคุณวุฒิ - ไทย',
      value: get(currentRowData, 'numThDegs', ''),
    },
    {
      title: 'จำนวนคุณวุฒิ - เทศ',
      value: get(currentRowData, 'numNonThDegs', ''),
    },
    {
      title: 'หนังสือออก - เลขที่',
      value: get(currentRowData, 'replyNo', ''),
    },
    {
      title: 'หนังสือออก - วันที่',
      value: get(currentRowData, 'replyDatePrint', ''),
    },
    {
      title: 'สถานะ',
      value: get(currentRowData, 'status', ''),
    },
    {
      title: 'หมายเหตุ',
      value: get(currentRowData, 'note', ''),
    },
  ]

  const [isOpenEditModal, setIsOpenEditModal] = useState<boolean>(false)
  const [currentEditRowData, setCurrentEditRowData] = useState<boolean>(false)

  const handleOpenEditModal = (currentRowData: any) => {
    setCurrentEditRowData(currentRowData)
    setIsOpenEditModal(true)
  }
  const handleCloseEditModal = () => {
    setIsOpenEditModal(false)
  }

  return (
    <>
      <Dialog
        open={isOpen}
        onClose={onCancel}
        fullScreen
        TransitionComponent={Transition}
      >
        <AppBar
          style={{ position: 'relative', paddingLeft: 24, paddingRight: 24 }}
          color='secondary'
        >
          <Toolbar>
            <IconButton
              edge='start'
              color='inherit'
              onClick={onCancel}
              aria-label='close'
            >
              <CloseIcon />
            </IconButton>
            <Typography
              style={{ marginLeft: 2, flex: 1 }}
              variant='h6'
              component='div'
            >
              แนะนำ
            </Typography>
            <Stack direction='row' spacing={1}>
              <Button
                variant='outlined'
                autoFocus
                color='inherit'
                onClick={onCancel}
                style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
              >
                ปิด (ESC)
              </Button>
            </Stack>
          </Toolbar>
        </AppBar>
        <DialogContent>
          <Grid
            container
            spacing={1}
            style={{ paddingTop: 16, paddingBottom: 24 }}
          >
            {currentEditRowDataList.map((currentEditRowDataItem: any) => (
              <Grid container alignItems='center' style={{ minHeight: 28 }}>
                <Grid item xs={2} style={{ maxWidth: 220 }}>
                  <Typography
                    variant='body2'
                    color='secondary'
                    style={{ fontWeight: 600 }}
                  >
                    {currentEditRowDataItem.title}
                  </Typography>
                </Grid>
                <Grid item xs={10}>
                  <Typography
                    variant='body2'
                    color='secondary'
                    style={{ fontWeight: 500 }}
                  >
                    <div
                      dangerouslySetInnerHTML={{
                        __html: get(currentEditRowDataItem, 'value', ''),
                      }}
                    />
                  </Typography>
                </Grid>
              </Grid>
            ))}
          </Grid>
          <Typography
            variant='body2'
            color='primary'
            style={{ fontWeight: 500, paddingTop: 16, paddingBottom: 24 }}
          >
            <b>*</b> คอลัมน์ที่แก้ไขข้อมูลได้
          </Typography>
          <DataTable
            data={data}
            loading={isLoading}
            countries={countries}
            educationLevels={educationLevels}
            salaryGroups={salaryGroups}
            circularLetters={circularLetters}
            handleOpenEditModal={handleOpenEditModal}
          />
        </DialogContent>
      </Dialog>
      <EditModal
        data={currentEditRowData}
        letterId={get(currentRowData, 'id', '')}
        open={isOpenEditModal}
        handleClose={handleCloseEditModal}
        countries={countries}
        educationLevels={educationLevels}
        salaryGroups={salaryGroups}
        circularLetters={circularLetters}
      />
    </>
  )
}
