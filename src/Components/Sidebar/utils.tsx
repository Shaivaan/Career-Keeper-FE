import {PersonOutline, WorkOutline,WhatshotOutlined} from '@mui/icons-material';

const profileRoute = '/profile';
const projectsRoute = '/';
const contactMeRoute = '/contact-me';
const workExperience = '/work-exp';
const loginRoute = '/login';
const registerRoute = '/register';
const authRoutesArray = [loginRoute,registerRoute];
const navbarListArray:SidebarEachType[] = [
    {
        title : 'Projects',
        icon : <WhatshotOutlined/>,
        route : projectsRoute
    },
    {
        title : 'Profile',
        icon : <PersonOutline/>,
        route : profileRoute
    },
    {
        title : 'Experience',
        icon : <WorkOutline/>,
        route : workExperience
    }
]



const navbarHeading = (currentRoute: string) => {
    switch (currentRoute) {
        case profileRoute:
            return 'My Profile';
        case projectsRoute:
            return 'Manage Projects';
        case contactMeRoute:
            return 'Contact Me';
        case workExperience:
            return 'Work Experience';
        default:
            return "Hey, Please go back!"; 
    }
}

const handleTitleText = (currentRoute: string) => {
    switch (currentRoute) {
        case profileRoute:
            return 'Profile';
        case projectsRoute:
            return 'Projects';
        case contactMeRoute:
            return 'Contact Me';
        case workExperience:
            return 'Work Experience';
        default:
            return "CareerKeeper"; 
    }
}

export {handleTitleText, navbarListArray,navbarHeading,profileRoute,projectsRoute,workExperience,contactMeRoute,loginRoute,registerRoute,authRoutesArray};