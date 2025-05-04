import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { JournalPage } from '../pages/JournalPage'

export const JournalRoutes=()=>{
  return (
    <Routes>
        <Route path='JournalApp/' element={<JournalPage/>} />
        <Route path='JournalApp/*' element={<Navigate to="JournalApp/" />} />
    </Routes>
  )
}
