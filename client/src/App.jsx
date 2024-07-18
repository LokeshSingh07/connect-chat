import { useState } from 'react'
import "./App.css"
import { Route, Routes } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import ErrorPage from "./pages/ErrorPage"
import SecuredRoute from './components/Auth/SecuredRoute';
import OpenRoute from "./components/Auth/OpenRoute.jsx";
import Home from "./pages/Home"



function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      


      <Routes>


        <Route 
          path="/"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />

        <Route 
          path='/signup' 
          element={
            <OpenRoute>
              <Signup/>
            </OpenRoute>
          }

        />


        <Route
          path="/home"
          element={
            <SecuredRoute>
              <Home/>
            </SecuredRoute>  
          }
        />


        <Route path='*' element={<ErrorPage/>}/>
      </Routes>


    </div>
  );
}

export default App
