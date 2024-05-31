import './App.css'
import {Routes,Route} from 'react-router-dom';
import { Exception } from './Routes/ExceptionScreen/Excpetion';
import NavbarWithComp from './Components/NavbarWithComp/NavbarWithComp';


function App() {

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