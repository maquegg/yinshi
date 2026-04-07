import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ChatPage from './pages/ChatPage'
import AITest from './pages/AITest'
import './App.css'

function App() {
  return (
    <Router>
      <div className="App min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<ChatPage />} />
          <Route path="/ai-test" element={<AITest />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App