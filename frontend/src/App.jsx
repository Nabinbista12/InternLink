import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import './App.css'
import Home from './Pages/Home/Home'
import Profile from './Pages/Profile/Profile'
import UserProfile from './Pages/Profile/UserProfile'
import Login from './Pages/Auth/Login'
import Register from './Pages/Auth/Register'
import ProtectedRoute from './Component/ProtectedRoute'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/profile' element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }></Route>
          <Route path='/user/:userId' element={<UserProfile />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/register' element={<Register />}></Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
