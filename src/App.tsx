import './App.css'
import {Routes,Route} from 'react-router-dom';
import { Exception } from './Routes/ExceptionScreen/Excpetion';
import NavbarWithComp from './Components/NavbarWithComp/NavbarWithComp';
import { MyProjectsScreen } from './Routes/MyProjects/MyProjects';


function App() {

  return (
    <NavbarWithComp>
      <Routes>
          <Route path='/' Component={MyProjectsScreen}/>
          <Route path='*' Component={Exception}/>
      </Routes>
    </NavbarWithComp>
  )
}

export default App;