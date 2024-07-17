import { useState } from 'react'
import "./App.css"
import { Route, Routes } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import ErrorPage from "./pages/ErrorPage"
import SecuredRoute from './components/Auth/SecuredRoute';
import Home from "./pages/Home"



function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      


      <Routes>

        <Route
          path="/home"
          element={<Home/>}
        />

        <Route 
          path="/"
          element={
            <SecuredRoute>
              <Login />
            </SecuredRoute>
          } 
        />

        <Route 
          path='/signup' 
          element={
            <SecuredRoute>
              <Signup/>
            </SecuredRoute>
          }

        />


        <Route path='*' element={<ErrorPage/>}/>



      </Routes>


    </div>
  );
}

export default App
