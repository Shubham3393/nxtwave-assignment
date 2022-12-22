import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import CreateItem from './Pages/CreateItem';
import Signin from "./Pages/Signin";
import Login from "./Pages/Login"



function App() {
  return (
    <Routes>
      <Route path='/' element={<Navigate to='/sign-in' />} />
      <Route path='/sign-in' element={<Signin />} />
      <Route path='/log-in' element = {<Login/>} />
      <Route path='/home' element={<Home/>}/>
      <Route path='/create-item' element={<CreateItem/>}/>
    </Routes>
  )
}

export default App;
