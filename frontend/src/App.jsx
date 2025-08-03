import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import './App.css'
import Home from './Pages/Home/Home'
import Profile from './Pages/Profile/Profile'
import Login from './Pages/Auth/Login'
import Register from './Pages/Auth/Register'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/profile' element={<Profile />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/register' element={<Register />}></Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
