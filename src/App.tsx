import './App.css'
import {Routes,Route, useLocation, useNavigate} from 'react-router-dom';
import { Exception } from './Routes/ExceptionScreen/Excpetion';
import NavbarWithComp from './Components/NavbarWithComp/NavbarWithComp';
import { MyProjectsScreen } from './Routes/MyProjects/MyProjects';
import { authRoutesArray, loginRoute, profileRoute, projectsRoute, registerRoute, workExperience } from './Components/Sidebar/utils';
import { MyProfile } from './Routes/MyProfile/MyProfile';
import { WorkExpereince } from './Routes/WorkExperience/WorkExpereince';
import { useEffect } from 'react';
import SignIn from './Routes/AuthRoutes/Login/Login';
import SignUp from './Routes/AuthRoutes/Register/Register';
import { isUserLoggedIn } from './Firebase/AuthFunction';
import { GlobalAlert } from './Components/GlobalAlert/GlobalAlert';


function App() {
  const isLoggedIn = isUserLoggedIn();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(()=>{
    routeHandler();
  })

  const routeHandler=()=>{
    const {pathname} = location;
    if(!isLoggedIn && !authRoutesArray.includes(pathname)){
      navigate(loginRoute);
    }else if(isLoggedIn && authRoutesArray.includes(pathname)){
      navigate(projectsRoute);
    }
  }

  return (
    <>
    <GlobalAlert/>
    {isLoggedIn ? <LoggedInRoutes/> : <LoggedOutRoutes/>}
    </>
  )
}

const LoggedInRoutes = ()=>{
  return  <NavbarWithComp>
  <Routes>
      <Route path={projectsRoute} Component={MyProjectsScreen}/>
      <Route path={profileRoute} Component={MyProfile}/>
      <Route path={workExperience} Component={WorkExpereince}/>
      <Route path='*' Component={Exception}/>
  </Routes>
</NavbarWithComp>
}

const LoggedOutRoutes=()=>{
  return <Routes>
      <Route path={loginRoute} Component={SignIn}></Route>
      <Route path={registerRoute} Component={SignUp}></Route>
  </Routes>
}

export default App;