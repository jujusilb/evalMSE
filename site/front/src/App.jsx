import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes, Navigate } from 'react-router-dom'
import Register from './connexion/register'
import Login from './connexion/login'
import Presentation from './affichage/presentation'
import MarketPlace from './jeu/boutique'
//import Inventaire from './affichage/footer/inventaire'
import Labo from './jeu/labo'


function App() {

  return (
    <div>
        <Routes>
          <Route path="/" element={<Presentation />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path='/boutique' element={<MarketPlace />} />
          <Route path='/labo' element={<Labo />} />
        </Routes>
    </div>
  )
}

export default App
