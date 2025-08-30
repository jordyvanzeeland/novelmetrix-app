import { useState } from 'react'
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import Login from './views/Login.jsx';
import Dashboard from './views/Dashboard.jsx';
import Stories from './views/Write/Stories.jsx';


function App() {
  return (
    <Router>
      <Routes>
          <Route exact path="/" element={<Dashboard />} />
          <Route exact path="/write/stories" element={<Stories />} />
          <Route exact path="/write/stories/:storyid" element={<Stories />} />
          <Route exact path="/write/stories/:storyid/chapter/:chapterid" element={<Stories />} />
          <Route exact path="/login" element={<Login />} />
      </Routes>
    </Router>
  )
}

export default App