import { useState } from 'react'
import FastingCalculator from './components/FastingCalculator'
import './index.css'

function App() {
  return (
    <div className={'h-screen w-screen grid place-items-center bg-sea-blue overflow-x-hidden'}>
      <FastingCalculator />
    </div>
  )
}

export default App
