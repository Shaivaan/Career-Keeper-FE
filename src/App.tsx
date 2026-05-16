import './App.css'
import {Routes,Route, useLocation, useNavigate} from 'react-router-dom';
import { Exception } from './Routes/ExceptionScreen/Excpetion';
import NavbarWithComp from './Components/NavbarWithComp/NavbarWithComp';
import { MyProjectsScreen } from './Routes/MyProjects/MyProjects';
import { authRoutesArray, docRoute, forgotPasswordRoute, handleTitleText, loginRoute, profileRoute, projectsRoute, registerRoute, workExperience } from './Components/Sidebar/utils';
import { MyProfile } from './Routes/MyProfile/MyProfile';
import { WorkExpereince } from './Routes/WorkExperience/WorkExpereince';
import { useEffect, useState } from 'react';
import SignIn from './Routes/AuthRoutes/Login/Login';
import SignUp from './Routes/AuthRoutes/Register/Register';
import { GlobalAlert } from './Components/GlobalComponents/GlobalAlert';
import { supabase } from './Supabase/supabase';
import { useZustandStore } from './Zustand/Zustand';
import { Box, CircularProgress } from '@mui/material';
import { Helmet } from 'react-helmet';
import { Documentation } from './Routes/Documentation/Documentation';
import ForgotPassword from './Routes/AuthRoutes/ForgotPassword/ForgotPassword';



function App() {
  const [isLoggedIn,setIsLoggedIn] = useState(false);
  const setCurrentUserData = useZustandStore((state) => state.setCurrentUserData);

  const location = useLocation();
  const navigate = useNavigate();
  const [isVerifyingUser,setIsVerifyingUser] = useState(true);

  // Subscribe to auth state once, on mount.
  useEffect(()=>{
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      const user: AppUser | null = session?.user
        ? { uid: session.user.id, email: session.user.email ?? null }
        : null;
      handleIsLoggedIn(user);
      setCurrentUserData(user);
      setIsVerifyingUser(false);
    });
    return () => subscription.unsubscribe();
  },[])

  // Redirect whenever route or auth state changes.
  useEffect(()=>{
    routeHandler();
  },[location.pathname,isLoggedIn,isVerifyingUser])

  const handleIsLoggedIn=(user:null | AppUser)=>{
    if(user === null){
      setIsLoggedIn(false);
    }else{
      setIsLoggedIn(true);
    }
  }

  const routeHandler=()=>{
    const {pathname} = location;
    if(!isVerifyingUser && !isLoggedIn && !authRoutesArray.includes(pathname)){
      navigate(loginRoute);
    }else if(!isVerifyingUser && isLoggedIn && authRoutesArray.includes(pathname)){
      navigate(projectsRoute);
    }
  }

  return (
    <>
    <GlobalAlert/>
    <TitleComp/>
    { isVerifyingUser ? <LoadingProgress/> : isLoggedIn ? <LoggedInRoutes/> : <LoggedOutRoutes/>}
    </>
  )
}

const LoggedInRoutes = ()=>{
  return  <NavbarWithComp>
  <Routes>
      <Route path={projectsRoute} Component={MyProjectsScreen}/>
      <Route path={profileRoute} Component={MyProfile}/>
      <Route path={workExperience} Component={WorkExpereince}/>
      <Route path={docRoute} Component={Documentation}/>
      <Route path='*' Component={Exception}/>
  </Routes>
</NavbarWithComp>
}

const LoggedOutRoutes=()=>{
  return <Routes>
      <Route path={loginRoute} Component={SignIn}></Route>
      <Route path={registerRoute} Component={SignUp}></Route>
      <Route path={forgotPasswordRoute} Component={ForgotPassword}></Route>
  </Routes>
}

const LoadingProgress=()=>{
  return <Box className = 'loader_main global_center_style'>
    <CircularProgress/>
  </Box>
}

const TitleComp=()=>{
  const {pathname} = useLocation();
  return <Helmet>
  <title>{handleTitleText(pathname)}</title>
  <meta name="description" content="Welcome to the homepage of my awesome app." />
</Helmet>
}

export default App;