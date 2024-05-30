import { useEffect } from 'react'
import './App.css'
import {Routes,Route} from 'react-router-dom';
import { Exception } from './Routes/Excpetion';
import NavbarWithComp from './Components/NavbarWithComp/NavbarWithComp';


function App() {
  useEffect(()=>{
  },[])

  return (
    <NavbarWithComp>
      <Routes>
          <Route path='/' Component={()=><></>}/>
          <Route path='*' Component={Exception}/>
      </Routes>
    </NavbarWithComp>
  )
}

export default App;