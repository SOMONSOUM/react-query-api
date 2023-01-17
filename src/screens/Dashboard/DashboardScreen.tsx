import React, { useContext } from 'react'
import { Container } from 'reactstrap'
import AuthContext from '../../hooks/AuthContext'

export const DashboardScreen = () => {
  const { me } = useContext(AuthContext)

  return (
    <Container className='mt-4'>
      <h2>Dashboard</h2>
    </Container>
  )
}