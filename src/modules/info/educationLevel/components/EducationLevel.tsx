import React, { useState, useEffect } from 'react'
import { get } from 'lodash'
import { useDispatch, useSelector } from 'react-redux'

import {
  createStyles,
  makeStyles,
  Theme,
  useTheme,
} from '@material-ui/core/styles'
import {
  Container,
  Typography,
  Grid,
  Box,
  Paper,
  useMediaQuery,
} from '@material-ui/core'

import Header from 'modules/ui/components/Header'
import Loading from 'modules/ui/components/Loading'
import DataTable from './DataTable'

import * as infoActions from 'modules/info/actions'
import { EducationLevelType } from 'modules/info/types'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(3),
    },
    sectionTitle: {
      fontSize: '1.7rem',
      fontWeight: 600,
      zIndex: 3,
      marginBottom: '24px',
      lineHeight: '1.3',
    },
    table: {
      minWidth: 650,
    },
  })
)

function createData(id: number, level: string) {
  return {
    id,
    level,
  }
}

export default function EducationLevel() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('sm'))

  const [tableData, setTableData] = useState([])

  const { educationLevels: initialEducationLevels = [], isLoading = false } =
    useSelector((state: any) => state.info)

  useEffect(() => {
    dispatch(infoActions.loadEducationLevels())
  }, [dispatch])

  useEffect(() => {
    const parsedData = initialEducationLevels.map(
      (educationLevel: EducationLevelType) =>
        createData(get(educationLevel, 'id'), get(educationLevel, 'level'))
    )
    setTableData(parsedData)
  }, [initialEducationLevels])

  return (
    <>
      <Header />
      <Container maxWidth='lg' className={classes.content}>
        <Box mt={2} mb={4}>
          <Grid container direction='column'>
            <Typography
              gutterBottom
              component='h2'
              variant='h6'
              color='secondary'
              className={classes.sectionTitle}
              align={matches ? 'left' : 'center'}
            >
              ข้อมูลพื้นฐาน : ระดับการศึกษา
            </Typography>
          </Grid>
          <Paper
            elevation={0}
            style={{
              borderRadius: 16,
              padding: 24,
              paddingTop: 12,
              boxShadow: '0 0 20px 0 rgba(204,242,251,0.3)',
              border: '1px solid rgb(204 242 251)',
              minHeight: 300,
            }}
          >
            {!isLoading ? (
              <DataTable data={tableData} />
            ) : (
              <Loading height={200} />
            )}
          </Paper>
        </Box>
      </Container>
    </>
  )
}
