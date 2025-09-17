import { useState } from 'react'
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import Login from './views/Login.jsx';
import Dashboard from './views/Dashboard.jsx';
import Story from './views/Write/Story.jsx';
import Chapter from './views/Write/Chapter.jsx';
import Books from './views/Books.jsx';


function App() {
  return (
    <Router>
      <Routes>
          <Route exact path="/" element={<Dashboard />} />
          <Route exact path="/books" element={<Books />} />
          <Route exact path="/write/stories" element={<Story />} />
          <Route exact path="/write/stories/new" element={<Story new="true" />} />
          <Route exact path="/write/story/:storyid" element={<Story />} />
          <Route exact path="/write/story/:storyid/chapter/:chapterid" element={<Chapter />} />
          <Route exact path="/login" element={<Login />} />
      </Routes>
    </Router>
  )
}

export default App