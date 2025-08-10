import { useState } from 'react'
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import Login from './views/Login.jsx';
import Dashboard from './views/Dashboard.jsx';


function App() {
  return (
    <Router>
      <Routes>
          <Route exact path="/" element={<Dashboard />} />
          <Route exact path="/login" element={<Login />} />
      </Routes>
    </Router>
  )
}

export default App