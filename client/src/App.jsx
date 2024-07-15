import { useState } from 'react'
import "./App.css"
import { Route, Routes } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import ErrorPage from "./pages/ErrorPage"



function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      


      <Routes>


        <Route 
          path="/"
          element={<Login />} 
          
        />

        <Route 
          path='/signup' 
          element={<Signup/>}

        />


        <Route path='*' element={<ErrorPage/>}/>



      </Routes>


    </div>
  );
}

export default App
