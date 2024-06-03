import './App.css'
import {Routes,Route} from 'react-router-dom';
import { Exception } from './Routes/ExceptionScreen/Excpetion';
import NavbarWithComp from './Components/NavbarWithComp/NavbarWithComp';
import { MyProjectsScreen } from './Routes/MyProjects/MyProjects';
import { profileRoute, projectsRoute } from './Components/Sidebar/utils';
import { MyProfile } from './Routes/MyProfile/MyProfile';


function App() {
  return (
    <NavbarWithComp>
      <Routes>
          <Route path={projectsRoute} Component={MyProjectsScreen}/>
          <Route path={profileRoute} Component={MyProfile}/>
          <Route path='*' Component={Exception}/>
      </Routes>
    </NavbarWithComp>
  )
}

export default App;