import './App.css'
import {Routes,Route} from 'react-router-dom';
import { Exception } from './Routes/ExceptionScreen/Excpetion';
import NavbarWithComp from './Components/NavbarWithComp/NavbarWithComp';
import { MyProjectsScreen } from './Routes/MyProjects/MyProjects';
import { profileRoute, projectsRoute, workExperience } from './Components/Sidebar/utils';
import { MyProfile } from './Routes/MyProfile/MyProfile';
import { WorkExpereince } from './Routes/WorkExperience/WorkExpereince';


function App() {
  return (
    <NavbarWithComp>
      <Routes>
          <Route path={projectsRoute} Component={MyProjectsScreen}/>
          <Route path={profileRoute} Component={MyProfile}/>
          <Route path={workExperience} Component={WorkExpereince}/>
          <Route path='*' Component={Exception}/>
      </Routes>
    </NavbarWithComp>
  )
}

export default App;