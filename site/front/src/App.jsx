import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes, Navigate } from 'react-router-dom'
import Register from './connexion/register'
import Login from './connexion/login'
import Presentation from './affichage/presentation'

function App() {

  return (
    <div>
        <Routes>
          <Route path="/" element={<Presentation />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
    </div>
  )
}

export default App
