import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { AuthRoutes } from '../auth/routes/AuthRoutes'
import { JournalRoutes } from '../journal/routes/JournalRoutes'
import { CheckingAuth } from '../ui'
import { useCheckAuth } from '../hooks'

export const AppRouter = () => {

  const status= useCheckAuth();

  if (status === 'checking') {
    return (<CheckingAuth />)
  }

  return (

    <Routes>
      {/* Login y Registro /auth/*}
       {/* JournalApp  */}
      {
        (status === 'authenticated')
          ? <Route path='./*' element={<JournalRoutes />} />
          : <Route path='./auth/*' element={<AuthRoutes />} />
      }
      {/* En caso de que no este autentificado mandara a login  */}
      <Route path="/*" element={<Navigate to="./auth/login" />} />
    </Routes>
  )
}
