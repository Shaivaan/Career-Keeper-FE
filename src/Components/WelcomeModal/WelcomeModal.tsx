import {Box, Button, Typography}  from '@mui/material';
import { GeneralModalParent } from "../GeneralModalParent/GeneralModalParent";
import "./WelcomeModal.css";
import { useNavigate } from 'react-router-dom';
import { docRoute } from '../Sidebar/utils';


export const WelcomeModal=({handleClose,isOpen} :WelcomeModalProps)=>{
    const navigate = useNavigate();
    return <GeneralModalParent handleClose={handleClose} isOpen={isOpen}>
        <Box className="global_uniform_vertical_style">
            <Box className = 'careerHead'>Hi👋, Welcome to Career Keeper</Box>
            <Box component={'ul'}>
                <Box component={'li'}>
                    Store and manage your career data efficiently.
                </Box>
                <Box component={'li'}>
                   Showcase your profile, projects, and work experience.
                </Box>
                <Box component={'li'}>
                   Integrate your data into your portfolio and other platforms seamlessly using our API.
                </Box>
            </Box>
            <Typography variant="body1" gutterBottom>
            Career Keeper is useful for storing your professional information and allows you to use this data on your platform via our API, saving you from hardcoding the data.
        </Typography>
        <Typography variant="body1" gutterBottom>
          For more details and to get started, please refer to my <Box className='navigation_text' component={'span'} onClick={()=>navigate(docRoute)}>documentation</Box>. We’re here to support you every step of the way.
        </Typography>
        <Button onClick={handleClose} variant='outlined'> Okay, I understand</Button>
        </Box>
    </GeneralModalParent>
}