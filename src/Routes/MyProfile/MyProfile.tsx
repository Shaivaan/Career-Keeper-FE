import {Box,Avatar, Grid, IconButton, Button} from '@mui/material';
import {Edit} from "@mui/icons-material";
import "./MyProfile.css";
export const MyProfile = ()=>{
    return <Box className = 'global_uniform_vertical_style'>
        <ProfileDisplay/>
        <PersonalInformation/>
        <WorkShowCase/>
    </Box>
}

const DisplayValueWithLabel=({lable,value,isUsedForNavigation= false}:DisplayValueWithLabelType)=>{
    return <Box className = 'global_uniform_vertical_style' style={{rowGap:'0.2rem'}}>
        <Box color={'grey'}>{lable}</Box>
        {!isUsedForNavigation ? <Box>{value}</Box> : <Button variant='text' color='primary' style={{width:"5rem",textTransform:'none'}} target='_blank' href='value'>Visit</Button>} 
    </Box>
}




const ProfileDisplay=()=>{
    return <Box className = 'profileDisplayParent gridBackground'>
        <Avatar className = 'avatar_style'/>
        <Box className = 'global_uniform_vertical_style' style={{rowGap:'0.2rem'}}>
            <Box className = 'nameHead'>Jack Adams</Box>
            <Box className = 'worker'>Web Developer</Box>
            <Box>Email</Box>
        </Box>
    </Box>
}

const PersonalInformation=()=>{
    return <Box className = 'gridBackground global_uniform_vertical_style'style={{rowGap:'1.5rem'}}>
        <Box className = 'global_justify_space_between' width={'100%'}>
            <Box fontSize={'1.2rem'}>Personal Information</Box>
            <IconButton><Edit color='secondary'/></IconButton>
        </Box>
        <Grid container style={{rowGap:'1.5rem'}}>
            <Grid item lg={3} sm={6} xs={12}><DisplayValueWithLabel lable='First Name' value='Shivanshu'/></Grid>
            <Grid item lg={9} sm={6} xs={12}><DisplayValueWithLabel lable='First Name' value='Shivanshu'/></Grid>
            <Grid item lg={3} sm={6} xs={12}><DisplayValueWithLabel lable='First Name' value='Shivanshu'/></Grid>
            <Grid item lg={9} sm={6} xs={12}><DisplayValueWithLabel lable='First Name' value='Shivanshu'/></Grid>
        </Grid>
    </Box>
}

const WorkShowCase=()=>{
    return <Box className = 'gridBackground global_uniform_vertical_style'style={{rowGap:'1.5rem'}}>
        <Box className = 'global_justify_space_between' width={'100%'}>
            <Box fontSize={'1.2rem'}>Work Showcase</Box>
            <IconButton><Edit color='secondary'/></IconButton>
        </Box>
        <Grid container style={{rowGap:'1.5rem'}}>
           <Grid item lg={3} sm={6} xs={12}><DisplayValueWithLabel lable='Linked In' value='Shivanshu' isUsedForNavigation={true}/></Grid>
            <Grid item lg={9} sm={6} xs={12}><DisplayValueWithLabel lable='Resume' value='Shivanshu' isUsedForNavigation={true}/></Grid>
            <Grid item lg={3} sm={6} xs={12}><DisplayValueWithLabel lable='Github' value='Shivanshu' isUsedForNavigation={true}/></Grid>
            <Grid item lg={9} sm={6} xs={12}><DisplayValueWithLabel lable='Youtube' value='Shivanshu' isUsedForNavigation={true}/></Grid>
            <Grid item lg={3} sm={6} xs={12}><DisplayValueWithLabel lable='Instagram' value='Shivanshu' isUsedForNavigation={true}/></Grid>
        </Grid>
    </Box>
}