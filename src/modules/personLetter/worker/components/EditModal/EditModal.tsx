import React, { useState, useEffect } from 'react'
import { get, isEmpty } from 'lodash'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'

import { useTheme } from '@material-ui/core/styles'
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Typography,
  Grid,
  TextField,
  Button,
  FormControl,
  Select,
  MenuItem,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Tooltip,
} from '@material-ui/core'
import Stack from '@mui/material/Stack'

import { deepOrange, deepPurple } from '@material-ui/core/colors'

import {
  Filter1 as Filter1Icon,
  Filter2 as Filter2Icon,
} from '@material-ui/icons'

import RecommendationModal1 from '../RecommendationModal1/RecommendationModal1'
import RecommendationModal2 from '../RecommendationModal2/RecommendationModal2'

import * as personLetterActions from 'modules/personLetter/actions'
import * as curriculumActions from 'modules/curriculum/actions'

interface EditModalProps {
  data: any
  letterId: any
  open: boolean
  handleClose: () => void
  countries: any
  educationLevels: any
  salaryGroups: any
  circularLetters: any
}

export default function EditModal({
  data,
  letterId,
  open,
  handleClose,
  countries,
  educationLevels,
  salaryGroups,
  circularLetters,
}: EditModalProps) {
  const theme = useTheme()
  const dispatch = useDispatch()

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

  const getSalaryGroupById = (id: any) => {
    const result = salaryGroups.find(
      (salaryGroup: any) => salaryGroup.id === id
    )
    return get(result, 'salarygroup', '')
  }

  const getCircularLetterById = (id: any) => {
    const result = circularLetters.find(
      (circularLetter: any) => circularLetter.id === id
    )
    return `${get(result, 'no', '')} (${get(result, 'year', '')})`
  }

  const validationSchema = yup.object({})
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      nationalId: get(data, 'nationalId', ''),
      title: get(data, 'title', ''),
      firstName: get(data, 'firstName', ''),
      lastName: get(data, 'lastName', ''),
      cntryId: getCountryById(get(data, 'cntryId', '')),
      eduLevId: getEducationLevelById(get(data, 'eduLevId', '')),
      university: get(data, 'university', ''),
      faculty: get(data, 'faculty', ''),
      degree: get(data, 'degree', ''),
      branch: get(data, 'branch', ''),
      thesis: get(data, 'thesis', ''),
      appro: get(data, 'appro', ''),
      note: get(data, 'note', ''),
      salGrpId: get(data, 'salGrpId', ''),
      circLetrId: get(data, 'circLetrId', ''),
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(
        personLetterActions.editPersonLetterDegree({
          letterId: letterId,
          degreeId: get(data, 'id', ''),
          appro: get(values, 'appro', ''),
          note: get(values, 'note', ''),
          salGrpId: get(values, 'salGrpId', ''),
          circLetrId: get(values, 'circLetrId', ''),
        })
      )
      onCloseModal()
    },
  })

  const onCloseModal = () => {
    handleClose()
    formik.resetForm()
  }

  const [isOpenRecommendation1Modal, setIsOpenRecommendation1Modal] =
    useState(false)

  const onOpenRecommendation1Modal = () => {
    dispatch(
      curriculumActions.loadRecommendation(
        get(data, 'university', ''),
        get(data, 'faculty', ''),
        get(data, 'degree', ''),
        get(data, 'branch', '')
      )
    )
    setIsOpenRecommendation1Modal(true)
  }
  const onCloseRecommendation1Modal = () => {
    setIsOpenRecommendation1Modal(false)
  }

  const [isOpenRecommendation2Modal, setIsOpenRecommendation2Modal] =
    useState(false)

  const onOpenRecommendation2Modal = () => {
    dispatch(
      curriculumActions.loadRecommendation2(
        get(data, 'university', ''),
        get(data, 'faculty', ''),
        get(data, 'degree', ''),
        get(data, 'branch', '')
      )
    )
    setIsOpenRecommendation2Modal(true)
  }
  const onCloseRecommendation2Modal = () => {
    setIsOpenRecommendation2Modal(false)
  }

  const [selectionModel1, setSelectionModel1] = useState<any>([])
  const [selectionModel2, setSelectionModel2] = useState<any>([])

  const { recommendations = [], recommendations2 = [] } = useSelector(
    (state: any) => state.curriculum
  )

  useEffect(() => {
    const selectedApproId = selectionModel1[0]
    const selectedAppro = get(recommendations, `[${selectedApproId}]`, {})
    const value = get(selectedAppro, 'accreditation', '')
    const letterId = get(selectedAppro, 'letterId', 0)

    if (!isEmpty(selectionModel1)) {
      formik.setFieldValue('appro', value)
      formik.setFieldValue('circLetrId', letterId)
    }
  }, [selectionModel1]) //eslint-disable-line

  useEffect(() => {
    const selectedApproId = selectionModel2[0]
    const selectedAppro = get(recommendations2, `[${selectedApproId}]`, {})
    const value = get(selectedAppro, 'accreditation', '')

    if (!isEmpty(selectionModel2)) {
      formik.setFieldValue('appro', value)
    }
  }, [selectionModel2]) //eslint-disable-line

  return (
    <Dialog
      open={open}
      onClose={(_, reason) => {
        if (reason && reason === 'backdropClick') {
          return
        }
        onCloseModal()
      }}
      PaperProps={{
        style: { borderRadius: 16, padding: 8 },
      }}
      fullWidth
      maxWidth='md'
    >
      <form onSubmit={formik.handleSubmit}>
        <DialogTitle>
          <Typography
            color='secondary'
            variant='h6'
            style={{ fontWeight: 600 }}
          >
            แก้ไข
          </Typography>
        </DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2}>
            <Grid container alignItems='center'>
              <Grid item xs={12} md={6}>
                <Typography
                  variant='body1'
                  color='textSecondary'
                  style={{ fontWeight: 600 }}
                >
                  เลขประจำตัวประชาชน
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  disabled
                  id='nationalId'
                  name='nationalId'
                  value={formik.values.nationalId}
                  onChange={formik.handleChange}
                  size='small'
                  fullWidth
                />
              </Grid>
            </Grid>
            <Grid container alignItems='center'>
              <Grid item xs={12} md={6}>
                <Typography
                  variant='body1'
                  color='textSecondary'
                  style={{ fontWeight: 600 }}
                >
                  คำนำหน้าชื่อ
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  disabled
                  id='title'
                  name='title'
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  size='small'
                  fullWidth
                />
              </Grid>
            </Grid>
            <Grid container alignItems='center'>
              <Grid item xs={12} md={6}>
                <Typography
                  variant='body1'
                  color='textSecondary'
                  style={{ fontWeight: 600 }}
                >
                  ชื่อ
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  disabled
                  id='firstName'
                  name='firstName'
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  size='small'
                  fullWidth
                />
              </Grid>
            </Grid>
            <Grid container alignItems='center'>
              <Grid item xs={12} md={6}>
                <Typography
                  variant='body1'
                  color='textSecondary'
                  style={{ fontWeight: 600 }}
                >
                  นามสกุล
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  disabled
                  id='lastName'
                  name='lastName'
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  size='small'
                  fullWidth
                />
              </Grid>
            </Grid>
            <Grid container alignItems='center'>
              <Grid item xs={12} md={6}>
                <Typography
                  variant='body1'
                  color='textSecondary'
                  style={{ fontWeight: 600 }}
                >
                  ประเทศ
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  disabled
                  id='cntryId'
                  name='cntryId'
                  value={formik.values.cntryId}
                  onChange={formik.handleChange}
                  size='small'
                  fullWidth
                />
              </Grid>
            </Grid>
            <Grid container alignItems='center'>
              <Grid item xs={12} md={6}>
                <Typography
                  variant='body1'
                  color='textSecondary'
                  style={{ fontWeight: 600 }}
                >
                  ระดับการศึกษา
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  disabled
                  id='eduLevId'
                  name='eduLevId'
                  value={formik.values.eduLevId}
                  onChange={formik.handleChange}
                  size='small'
                  fullWidth
                />
              </Grid>
            </Grid>
            <Grid container alignItems='center'>
              <Grid item xs={12} md={6}>
                <Typography
                  variant='body1'
                  color='textSecondary'
                  style={{ fontWeight: 600 }}
                >
                  มหาวิทยาลัย/สถาบันการศึกษา
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  disabled
                  id='university'
                  name='university'
                  value={formik.values.university}
                  onChange={formik.handleChange}
                  size='small'
                  fullWidth
                />
              </Grid>
            </Grid>
            <Grid container alignItems='center'>
              <Grid item xs={12} md={6}>
                <Typography
                  variant='body1'
                  color='textSecondary'
                  style={{ fontWeight: 600 }}
                >
                  คณะ/หน่วยงานที่เทียบเท่าคณะ
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  disabled
                  id='faculty'
                  name='faculty'
                  value={formik.values.faculty}
                  onChange={formik.handleChange}
                  size='small'
                  fullWidth
                />
              </Grid>
            </Grid>
            <Grid container alignItems='center'>
              <Grid item xs={12} md={6}>
                <Typography
                  variant='body1'
                  color='textSecondary'
                  style={{ fontWeight: 600 }}
                >
                  ชื่อปริญญา/ประกาศนียบัตร
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  disabled
                  id='degree'
                  name='degree'
                  value={formik.values.degree}
                  onChange={formik.handleChange}
                  size='small'
                  fullWidth
                />
              </Grid>
            </Grid>
            <Grid container alignItems='center'>
              <Grid item xs={12} md={6}>
                <Typography
                  variant='body1'
                  color='textSecondary'
                  style={{ fontWeight: 600 }}
                >
                  สาขาวิชา/วิชาเอก
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  disabled
                  id='branch'
                  name='branch'
                  value={formik.values.branch}
                  onChange={formik.handleChange}
                  size='small'
                  fullWidth
                />
              </Grid>
            </Grid>
            <Grid container alignItems='center'>
              <Grid item xs={12} md={6}>
                <Typography
                  variant='body1'
                  color='textSecondary'
                  style={{ fontWeight: 600 }}
                >
                  หัวข้อวิทยานิพนธ์
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  disabled
                  id='thesis'
                  name='thesis'
                  value={formik.values.thesis}
                  onChange={formik.handleChange}
                  size='small'
                  fullWidth
                />
              </Grid>
            </Grid>
            <Grid container alignItems='center'>
              <Grid item xs={12} md={6}>
                <Typography
                  variant='body1'
                  color='textPrimary'
                  style={{ fontWeight: 600 }}
                >
                  ผลการรับรอง
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <OutlinedInput
                  id='appro'
                  name='appro'
                  value={formik.values.appro}
                  onChange={formik.handleChange}
                  fullWidth
                  multiline
                  rows={3}
                  endAdornment={
                    <InputAdornment position='end'>
                      <Stack direction='column' justifyContent='center' gap={1}>
                        <Tooltip title='ขอคำแนะนำผลการรับรองคุณวุฒิ (หลักสูตร)'>
                          <IconButton
                            size='small'
                            onClick={() => onOpenRecommendation1Modal()}
                          >
                            <Filter1Icon
                              style={{ color: deepOrange[500], fontSize: 24 }}
                            />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title='ขอคำแนะนำผลการรับรองคุณวุฒิ (บุคคล)'>
                          <IconButton
                            size='small'
                            onClick={() => onOpenRecommendation2Modal()}
                          >
                            <Filter2Icon
                              style={{ color: deepPurple[500], fontSize: 24 }}
                            />
                          </IconButton>
                        </Tooltip>
                      </Stack>
                    </InputAdornment>
                  }
                />
              </Grid>
            </Grid>
            <Grid container alignItems='center'>
              <Grid item xs={12} md={6}>
                <Typography
                  variant='body1'
                  color='textPrimary'
                  style={{ fontWeight: 600 }}
                >
                  หมายเหตุ
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id='note'
                  name='note'
                  value={formik.values.note}
                  onChange={formik.handleChange}
                  variant='outlined'
                  size='small'
                  fullWidth
                  multiline
                  rows={3}
                />
              </Grid>
            </Grid>
            <Grid container alignItems='center'>
              <Grid item xs={12} md={6}>
                <Typography
                  variant='body1'
                  color='textPrimary'
                  style={{ fontWeight: 600 }}
                >
                  กลุ่มเงินเดือน
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth size='small'>
                  <Select
                    id='salGrpId'
                    name='salGrpId'
                    value={formik.values.salGrpId}
                    onChange={formik.handleChange}
                    variant='outlined'
                    displayEmpty
                    MenuProps={{
                      anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'left',
                      },
                      transformOrigin: {
                        vertical: 'top',
                        horizontal: 'left',
                      },
                      getContentAnchorEl: null,
                    }}
                    renderValue={(selected) => {
                      if (selected === null) {
                        return (
                          <span style={{ color: theme.palette.text.secondary }}>
                            เลือกกลุ่มเงินเดือน
                          </span>
                        )
                      }
                      return getSalaryGroupById(selected)
                    }}
                  >
                    {salaryGroups.map((salaryGroup: any) => (
                      <MenuItem value={get(salaryGroup, 'id', '')}>
                        {get(salaryGroup, 'salarygroup', '')}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Grid container alignItems='center'>
              <Grid item xs={12} md={6}>
                <Typography
                  variant='body1'
                  color='textPrimary'
                  style={{ fontWeight: 600 }}
                >
                  หนังสือเวียน
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth size='small'>
                  <Select
                    id='circLetrId'
                    name='circLetrId'
                    value={formik.values.circLetrId}
                    onChange={formik.handleChange}
                    variant='outlined'
                    displayEmpty
                    MenuProps={{
                      anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'left',
                      },
                      transformOrigin: {
                        vertical: 'top',
                        horizontal: 'left',
                      },
                      getContentAnchorEl: null,
                    }}
                    renderValue={(selected) => {
                      if (selected === null) {
                        return (
                          <span style={{ color: theme.palette.text.secondary }}>
                            เลือกหนังสือเวียน
                          </span>
                        )
                      }
                      return getCircularLetterById(selected)
                    }}
                  >
                    {circularLetters.map((circularLetter: any) => (
                      <MenuItem value={get(circularLetter, 'id', '')}>
                        {get(circularLetter, 'no', '')} (
                        {get(circularLetter, 'year', '')})
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Stack>
        </DialogContent>
        <DialogActions style={{ paddingTop: 16 }}>
          <Button onClick={onCloseModal} variant='outlined'>
            ยกเลิก
          </Button>
          <Button
            color='secondary'
            variant='contained'
            type='submit'
            disabled={!formik.dirty}
          >
            บันทึก
          </Button>
        </DialogActions>
      </form>
      <RecommendationModal1
        isOpen={isOpenRecommendation1Modal}
        onClose={onCloseRecommendation1Modal}
        currentEditRowData={data}
        countries={countries}
        educationLevels={educationLevels}
        selectionModel={selectionModel1}
        setSelectionModel={setSelectionModel1}
      />
      <RecommendationModal2
        isOpen={isOpenRecommendation2Modal}
        onClose={onCloseRecommendation2Modal}
        currentEditRowData={data}
        countries={countries}
        educationLevels={educationLevels}
        selectionModel={selectionModel2}
        setSelectionModel={setSelectionModel2}
      />
    </Dialog>
  )
}
