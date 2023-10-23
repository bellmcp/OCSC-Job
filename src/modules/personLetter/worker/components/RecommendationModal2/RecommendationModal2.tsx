import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { get, isEmpty } from 'lodash'

import {
  Dialog,
  DialogContent,
  Slide,
  Toolbar,
  IconButton,
  Grid,
  AppBar,
  Typography,
  Button,
} from '@material-ui/core'
import { Stack } from '@mui/material'
import { Close as CloseIcon } from '@material-ui/icons'
import { TransitionProps } from '@material-ui/core/transitions'

import RecommendationTable from './RecommendationTable'
import { deepPurple } from '@material-ui/core/colors'

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />
})

export default function RecommendationModal2({
  isOpen,
  onClose,
  currentEditRowData,
  countries,
  educationLevels,
  selectionModel,
  setSelectionModel,
}: any) {
  const [recommendationList, setRecommendationList] = useState([])
  const [tempSelectionModel, setTempSelectionModel] = useState([])

  const getCountryById = (id: any) => {
    const result = countries.find((country: any) => country.id === id)
    return get(result, 'thainame', '')
  }

  const getEducationLevelById = (id: any) => {
    const result = educationLevels.find(
      (educationLevel: any) => educationLevel.id === id
    )
    return get(result, 'level', '')
  }

  const {
    isRecommending = false,
    recommendations2: initialRecommendations = [],
  } = useSelector((state: any) => state.curriculum)

  useEffect(() => {
    const parsed = initialRecommendations.map((item: any, index: number) => {
      return {
        id: index,
        order: index + 1,
        ...item,
      }
    })
    setRecommendationList(parsed)
  }, [initialRecommendations])

  const onCancel = () => {
    setSelectionModel([])
    setTempSelectionModel([])
    onClose()
  }

  const onSave = () => {
    setSelectionModel(tempSelectionModel)
    setTempSelectionModel([])
    onClose()
  }

  const currentEditRowDataList = [
    {
      title: 'เลขประจำตัวประชาชน',
      value: get(currentEditRowData, 'nationalId', ''),
    },
    {
      title: 'คำนำหน้าชื่อ',
      value: get(currentEditRowData, 'title', ''),
    },
    {
      title: 'ชื่อ',
      value: get(currentEditRowData, 'firstName', ''),
    },
    {
      title: 'นามสกุล',
      value: get(currentEditRowData, 'lastName', ''),
    },
    {
      title: 'ประเทศ',
      value: getCountryById(get(currentEditRowData, 'cntryId', '')),
    },
    {
      title: 'ระดับการศึกษา',
      value: getEducationLevelById(get(currentEditRowData, 'eduLevId', '')),
    },
    {
      title: 'มหาวิทยาลัย/สถาบันการศึกษา',
      value: get(currentEditRowData, 'university', ''),
    },
    {
      title: 'คณะ/หน่วยงานที่เทียบเท่าคณะ',
      value: get(currentEditRowData, 'faculty', ''),
    },
    {
      title: 'ชื่อปริญญา/ประกาศนียบัตร',
      value: get(currentEditRowData, 'degree', ''),
    },
    {
      title: 'สาขาวิชา/วิชาเอก',
      value: get(currentEditRowData, 'branch', ''),
    },
    {
      title: 'หัวข้อวิทยานิพนธ์',
      value: get(currentEditRowData, 'thesis', ''),
    },
  ]

  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={(_, reason) => {
          if (reason && reason === 'backdropClick') {
            return
          }
          onCancel()
        }}
        TransitionComponent={Transition}
        PaperProps={{
          style: { borderRadius: 16 },
        }}
        maxWidth='lg'
      >
        <AppBar
          style={{
            position: 'relative',
            paddingLeft: 24,
            paddingRight: 24,
            backgroundColor: deepPurple[500],
          }}
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
              คำแนะนำผลการรับรองคุณวุฒิ (บุคคล)
            </Typography>
            <Stack direction='row' spacing={1}>
              <Button
                variant='text'
                color='inherit'
                onClick={onCancel}
                style={{
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  paddingLeft: 16,
                  paddingRight: 16,
                }}
              >
                ยกเลิก (ESC)
              </Button>
              <Button
                variant='outlined'
                autoFocus
                color='inherit'
                onClick={onSave}
                disabled={isEmpty(tempSelectionModel)}
                style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
              >
                บันทึก
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
              <>
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
                    {currentEditRowDataItem.value}
                  </Typography>
                </Grid>
              </>
            ))}
          </Grid>
          <Typography
            variant='body2'
            style={{
              color: deepPurple[500],
              fontWeight: 500,
              paddingTop: 16,
              paddingBottom: 24,
            }}
          >
            <b>*</b> โปรดเลือกข้อมูล 'ผลการรับรอง' ที่ต้องการจะเติมค่าลงในฟิลด์
            'ผลการรับรอง' ของหน้าต่างก่อนหน้า และกดปุ่ม 'บันทึก'
          </Typography>
          <RecommendationTable
            data={recommendationList}
            loading={isRecommending}
            selectionModel={tempSelectionModel}
            setSelectionModel={setTempSelectionModel}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}
