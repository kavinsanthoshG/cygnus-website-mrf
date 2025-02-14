import { Box, Container, Grid, Typography } from '@mui/material'
import Button from '@mui/material/Button'
import { doc, updateDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { db } from '../firebase'
import { findOne } from '../utils/firebase'
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined'
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined'

export default function User() {
  const [userData, setUserData] = useState({})
  const [searchParams] = useSearchParams()
  const uid = searchParams.get('user')
  useEffect(() => {
    findOne('users', uid.toString())
      .then((data) => setUserData(data))
      .catch((e) => console.error(e))
  }, [uid])

  const handleClick = (e) => {
    const docRef = doc(db, 'users', uid.toString())
    updateDoc(docRef, {
      isEligibleForFood: false,
    })
      .then(() => {
        setUserData({ ...userData, isEligibleForFood: false })
        console.log('success')
        //window.location.reload(false)
      })
      .catch((e) => console.error(e))
  }
  return (
    <Container>
      <Box sx={{ mt: '2rem' }}>
        {userData?.isEligibleForFood ? (
          <Grid container spacing={2} style={{ alignItems: 'center' }}>
            <Grid item>
              <ThumbUpAltOutlinedIcon />
            </Grid>
            <Grid item>
              <Typography variant="h5" component="h1">
                User is eligible for food!
              </Typography>
            </Grid>
          </Grid>
        ) : (
          <Grid container spacing={2} style={{ alignItems: 'center' }}>
            <Grid item>
              <ThumbDownAltOutlinedIcon />
            </Grid>
            <Grid item>
              <Typography variant="h5" component="h1">
                User is not eligible for food!
              </Typography>
            </Grid>
          </Grid>
        )}
        {userData.isEligibleForFood ? (
          <Button onClick={handleClick} variant="outlined" sx={{ mt: '1rem' }}>
            Mark user as bought the food
          </Button>
        ) : (
          <></>
        )}
      </Box>
    </Container>
  )
}
