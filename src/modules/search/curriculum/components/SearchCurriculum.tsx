// @ts-nocheck
import React, { useEffect, useState } from 'react'
import { get, isEmpty } from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'
import * as yup from 'yup'

import {
  createStyles,
  makeStyles,
  Theme,
  useTheme,
} from '@material-ui/core/styles'
import {
  useMediaQuery,
  Container,
  Typography,
  Grid,
  Box,
  Select,
  Button,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormHelperText,
  FormControl,
  Paper,
  MenuItem,
  Divider,
  Fab,
  Zoom,
  useScrollTrigger,
  Toolbar,
  Hidden,
} from '@material-ui/core'
import Stack from '@mui/material/Stack'
import {
  Search as SearchIcon,
  UnfoldLess as ShrinkIcon,
  UnfoldMore as ExpandIcon,
} from '@material-ui/icons'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'

import * as searchActions from 'modules/search/actions'
import Loading from 'modules/ui/components/Loading'
import DataTable from './DataTable'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      paddingTop: theme.spacing(3),
    },
    sectionTitle: {
      fontSize: '1.7rem',
      fontWeight: 600,
      lineHeight: '1.3',
      zIndex: 3,
      color: theme.palette.secondary.main,
    },
    seeAllButton: {
      marginBottom: '0.35em',
      zIndex: 3,
    },
    root: {
      position: 'fixed',
      bottom: theme.spacing(4),
      right: theme.spacing(4),
    },
  })
)

function ScrollTop(props: any) {
  const { children } = props
  const classes = useStyles()
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  })

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const anchor = (
      (event.target as HTMLDivElement).ownerDocument || document
    ).querySelector('#back-to-top-anchor')

    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role='presentation' className={classes.root}>
        {children}
      </div>
    </Zoom>
  )
}

export default function SearchCurriculum() {
  const classes = useStyles()
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('sm'))
  const dispatch = useDispatch()

  const validationSchema = yup.object({})

  const getLevelIdByLabel = (label: string) => {
    const result = educationLevels.find((item: any) => {
      return item.level === label
    })
    return get(result, 'id', 0)
  }

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      type: 'both',
      level: 0,
      status: 'active',
      university: '',
      faculty: '',
      degree: '',
      branch: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(
        searchActions.searchCurriculums({
          isGov:
            get(values, 'type', 'both') === 'gov' ||
            get(values, 'type', 'both') === 'both',
          isPrivate:
            get(values, 'type', 'both') === 'org' ||
            get(values, 'type', 'both') === 'both',
          level: getLevelIdByLabel(get(values, 'level', 0)),
          university: get(values, 'university', ''),
          faculty: get(values, 'faculty', ''),
          degree: get(values, 'degree', ''),
          branch: get(values, 'branch', ''),
          isLetter: get(values, 'status', 'active') === 'active',
        })
      )
    },
  })

  useEffect(() => {
    dispatch(searchActions.loadEducationlevels())
    dispatch(searchActions.incrementVisitor())
    return () => {
      dispatch(searchActions.clearSearchResult())
    }
  }, [dispatch])

  const note = (
    <span style={{ color: theme.palette.primary.main, marginLeft: 2 }}>*</span>
  )

  const [educationLevels, setEducationLevels] = useState([])
  const [searchResults, setSearchResults] = useState([])
  const [tableMaxWidth, setTableMaxWidth] = useState<any>(false)

  const handleSwitchTableMaxWidth = () => {
    if (tableMaxWidth === 'lg') setTableMaxWidth(false)
    else setTableMaxWidth('lg')
  }

  const {
    educationLevels: initalEducationLevels = [],
    visitor = 0,
    isIncrementing = false,
    searchResults: initialSearchResults = [],
    isSearching = false,
  } = useSelector((state: any) => state.search)

  useEffect(() => {
    const parsed = initialSearchResults.map((item: any, index: number) => {
      return {
        order: index + 1,
        accreditation: get(item, 'accreditation1', ''),
        ...item,
      }
    })
    setSearchResults(parsed)
  }, [initialSearchResults])

  useEffect(() => {
    setEducationLevels(initalEducationLevels)
  }, [initalEducationLevels])

  const renderSearchResult = () => {
    if (isSearching) {
      return <Loading height={300}></Loading>
    } else {
      if (isEmpty(searchResults)) {
        return <></>
      } else {
        return (
          <Box mb={4}>
            <Box mt={6} mb={4}>
              <Divider />
            </Box>
            <Container
              maxWidth='lg'
              style={{ padding: tableMaxWidth === 'lg' ? 0 : '0 24px' }}
            >
              <Grid
                container
                justify='space-between'
                style={{ margin: '24px 0' }}
              >
                <Typography
                  component='h2'
                  variant='h6'
                  className={classes.sectionTitle}
                >
                  ผลการค้นหา
                </Typography>
                <Stack direction='row' spacing={2}>
                  <Hidden mdDown>
                    <Button
                      variant='contained'
                      color='secondary'
                      onClick={handleSwitchTableMaxWidth}
                      startIcon={
                        tableMaxWidth === 'lg' ? (
                          <ExpandIcon style={{ transform: 'rotate(90deg)' }} />
                        ) : (
                          <ShrinkIcon style={{ transform: 'rotate(90deg)' }} />
                        )
                      }
                    >
                      {tableMaxWidth === 'lg' ? 'ขยาย' : 'ย่อ'}ตาราง
                    </Button>
                  </Hidden>
                </Stack>
              </Grid>
            </Container>
            <Paper
              elevation={0}
              style={{
                borderRadius: 16,
                padding: 24,
                boxShadow: '0 0 20px 0 rgba(204,242,251,0.3)',
                border: '1px solid rgb(204 242 251)',
                minHeight: 300,
              }}
            >
              <DataTable data={searchResults} loading={isSearching} />
            </Paper>
          </Box>
        )
      }
    }
  }

  return (
    <>
      <Toolbar id='back-to-top-anchor' />
      <Container maxWidth='lg' className={classes.content}>
        <form onSubmit={formik.handleSubmit}>
          <Box mt={2} mb={4}>
            <Grid
              container
              direction='row'
              justify={matches ? 'space-between' : 'center'}
              alignItems='center'
              style={{ marginBottom: 24 }}
            >
              <Grid item xs={6}>
                <Typography
                  component='h2'
                  variant='h6'
                  className={classes.sectionTitle}
                >
                  ค้นหาการรับรองคุณวุฒิหลักสูตร
                </Typography>
              </Grid>
              <Grid
                item
                xs={6}
                container
                direction='column'
                alignItems='flex-end'
                spacing={0}
              >
                <Grid item>
                  <Typography variant='body2'>จำนวนครั้งที่เข้าชม</Typography>
                </Grid>
                <Grid item>
                  <Typography variant='h6' color='secondary'>
                    <span style={{ fontWeight: 600 }}>
                      {isIncrementing ? '...' : visitor.toLocaleString()}
                    </span>{' '}
                    ครั้ง
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Paper
              elevation={0}
              style={{
                borderRadius: 16,
                padding: 24,
                boxShadow: '0 0 20px 0 rgba(204,242,251,0.3)',
                border: '1px solid rgb(204 242 251)',
              }}
            >
              <Grid container item spacing={2}>
                <Grid container item direction='row' alignItems='center'>
                  <Grid xs={12} md={3}>
                    <Typography
                      variant='body1'
                      color='textPrimary'
                      style={{ fontWeight: 600 }}
                    >
                      ประเภทหลักสูตร
                    </Typography>
                  </Grid>
                  <Grid xs={12} md={9}>
                    <RadioGroup
                      row
                      id='type'
                      name='type'
                      value={formik.values.type}
                      onChange={formik.handleChange}
                    >
                      <FormControlLabel
                        value='both'
                        control={<Radio size='small' />}
                        label='หลักสูตรของรัฐ และเอกชน'
                        style={{ marginRight: 96 }}
                      />
                      <FormControlLabel
                        value='gov'
                        control={<Radio size='small' />}
                        label='หลักสูตรของรัฐ'
                        style={{ marginRight: 96 }}
                      />
                      <FormControlLabel
                        value='org'
                        control={<Radio size='small' />}
                        label='หลักสูตรของเอกชน'
                      />
                    </RadioGroup>
                  </Grid>
                </Grid>
                <Grid container item direction='row' alignItems='center'>
                  <Grid xs={12} md={3}>
                    <Typography
                      variant='body1'
                      color='textPrimary'
                      style={{ fontWeight: 600 }}
                      gutterBottom
                    >
                      ระดับการศึกษา
                    </Typography>
                  </Grid>
                  <Grid xs={12} md={9}>
                    <FormControl fullWidth size='small'>
                      <Select
                        id='level'
                        name='level'
                        value={formik.values.level}
                        onChange={formik.handleChange}
                        variant='outlined'
                        size='small'
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
                          if (selected === 0) {
                            return (
                              <span
                                style={{ color: theme.palette.text.secondary }}
                              >
                                เลือกระดับการศึกษา
                              </span>
                            )
                          }
                          return selected
                        }}
                      >
                        {educationLevels.map((educationLevel: any) => (
                          <MenuItem value={get(educationLevel, 'level', '')}>
                            {get(educationLevel, 'level', '')}
                          </MenuItem>
                        ))}
                      </Select>
                      <FormHelperText>
                        <Typography variant='body2' color='textSecondary'>
                          ระดับปวช./ปวส.
                          ที่ใช้หลักสูตรกลางของอาชีวะไม่ต้องระบุสถานศึกษา
                        </Typography>
                      </FormHelperText>
                    </FormControl>
                  </Grid>
                </Grid>
                <Grid container item direction='row' alignItems='center'>
                  <Grid xs={12} md={3}>
                    <Typography
                      variant='body1'
                      color='textPrimary'
                      style={{ fontWeight: 600 }}
                    >
                      สถานะหลักสูตร
                    </Typography>
                  </Grid>
                  <Grid xs={12} md={9}>
                    <RadioGroup
                      row
                      id='status'
                      name='status'
                      value={formik.values.status}
                      onChange={formik.handleChange}
                    >
                      <FormControlLabel
                        value='active'
                        control={<Radio size='small' />}
                        label='หลักสูตรที่ออกหนังสือเวียนแล้ว'
                        style={{ marginRight: 66 }}
                      />
                      <FormControlLabel
                        value='pending'
                        control={<Radio size='small' />}
                        label='หลักสูตรที่รอออกหนังสือเวียน'
                      />
                    </RadioGroup>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
            <Paper
              elevation={0}
              style={{
                borderRadius: 16,
                padding: 24,
                boxShadow: '0 0 20px 0 rgba(204,242,251,0.3)',
                border: '1px solid rgb(204 242 251)',
                minHeight: 300,
                marginTop: 24,
              }}
            >
              <Grid container item spacing={2}>
                <Grid container item direction='row' alignItems='center'>
                  <Grid xs={12}>
                    <Typography
                      variant='body2'
                      color='primary'
                      style={{ fontWeight: 500 }}
                    >
                      <b>*</b> ไม่จำเป็นต้องระบุข้อมูลที่ใช้ค้นหาครบทุกฟิลด์
                      จะค้นจาก มหาวิทยาลัย หรือ คณะ หรือ ชื่อปริญญา หรือ
                      สาขาวิชา หรือ ทั้งหมดก็ได้
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container item direction='row' alignItems='center'>
                  <Grid xs={12} md={3}>
                    <Typography
                      variant='body1'
                      color='textPrimary'
                      style={{ fontWeight: 600 }}
                      gutterBottom
                    >
                      มหาวิทยาลัย/สถาบันการศึกษา{note}
                    </Typography>
                  </Grid>
                  <Grid xs={12} md={9}>
                    <TextField
                      id='university'
                      name='university'
                      value={formik.values.university}
                      onChange={formik.handleChange}
                      placeholder='ใส่คำค้นหาได้ไม่เกิน 3 คำ เช่น กกก ขขข คคค หมายถึง ในชื่อต้องมีคำค้นหาทั้งหมดปรากฏอยู่'
                      variant='outlined'
                      size='small'
                      fullWidth
                      multiline={!matches}
                      rows={4}
                    />
                  </Grid>
                </Grid>
                <Grid container item direction='row' alignItems='center'>
                  <Grid xs={12} md={3}>
                    <Typography
                      variant='body1'
                      color='textPrimary'
                      style={{ fontWeight: 600 }}
                      gutterBottom
                    >
                      คณะ/หน่วยงานที่เทียบเท่าคณะ{note}
                    </Typography>
                  </Grid>
                  <Grid xs={12} md={9}>
                    <TextField
                      id='faculty'
                      name='faculty'
                      value={formik.values.faculty}
                      onChange={formik.handleChange}
                      placeholder='ใส่คำค้นหาได้ไม่เกิน 3 คำ เช่น กกก ขขข คคค หมายถึง ในชื่อต้องมีคำค้นหาทั้งหมดปรากฏอยู่'
                      variant='outlined'
                      size='small'
                      fullWidth
                      multiline={!matches}
                      rows={4}
                    />
                  </Grid>
                </Grid>
                <Grid container item direction='row' alignItems='center'>
                  <Grid xs={12} md={3}>
                    <Typography
                      variant='body1'
                      color='textPrimary'
                      style={{ fontWeight: 600 }}
                      gutterBottom
                    >
                      ชื่อปริญญา/ประกาศนียบัตร{note}
                    </Typography>
                  </Grid>
                  <Grid xs={12} md={9}>
                    <TextField
                      id='degree'
                      name='degree'
                      value={formik.values.degree}
                      onChange={formik.handleChange}
                      placeholder='ใส่คำค้นหาได้ไม่เกิน 3 คำ เช่น กกก ขขข คคค หมายถึง ในชื่อต้องมีคำค้นหาทั้งหมดปรากฏอยู่'
                      variant='outlined'
                      size='small'
                      fullWidth
                      multiline={!matches}
                      rows={4}
                    />
                  </Grid>
                </Grid>
                <Grid container item direction='row' alignItems='center'>
                  <Grid xs={12} md={3}>
                    <Typography
                      variant='body1'
                      color='textPrimary'
                      style={{ fontWeight: 600 }}
                      gutterBottom
                    >
                      สาขาวิชา/วิชาเอก{note}
                    </Typography>
                  </Grid>
                  <Grid xs={12} md={9}>
                    <TextField
                      id='branch'
                      name='branch'
                      value={formik.values.branch}
                      onChange={formik.handleChange}
                      placeholder='ใส่คำค้นหาได้ไม่เกิน 3 คำ เช่น กกก ขขข คคค หมายถึง ในชื่อต้องมีคำค้นหาทั้งหมดปรากฏอยู่'
                      variant='outlined'
                      size='small'
                      fullWidth
                      multiline={!matches}
                      rows={4}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
            <Button
              fullWidth
              variant='contained'
              color='secondary'
              startIcon={<SearchIcon />}
              style={{ marginTop: 32 }}
              type='submit'
            >
              ค้นหา
            </Button>
            {/* <Grid
              container
              spacing={1}
              direction='row'
              justify='center'
              alignItems='center'
              alignContent='center'
              wrap='nowrap'
              style={{ marginTop: 16 }}
            >
              <Typography
                variant='body2'
                color='secondary'
                align='center'
                style={{ margin: '0 16px', fontWeight: 500 }}
              >
                จำกัดผลการค้นหาแค่ 50 รายการแรกเท่านั้น
                โปรดใช้คำค้นหาที่เฉพาะเจาะจง
              </Typography>
            </Grid> */}
          </Box>
        </form>
      </Container>
      <Container maxWidth={tableMaxWidth} style={{ marginBottom: 36 }}>
        {renderSearchResult()}
      </Container>
      <ScrollTop>
        <Fab color='primary' size='medium'>
          <KeyboardArrowUpIcon style={{ color: 'white' }} />
        </Fab>
      </ScrollTop>
    </>
  )
}
