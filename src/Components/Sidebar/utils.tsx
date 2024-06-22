import {PersonOutline, WorkOutline,WhatshotOutlined, ArticleOutlined} from '@mui/icons-material';

const profileRoute = '/profile';
const projectsRoute = '/';
const contactMeRoute = '/contact-me';
const workExperience = '/work-exp';
const loginRoute = '/login';
const registerRoute = '/register';
const forgotPasswordRoute = '/forgotPassword';
const docRoute = '/doc';
const authRoutesArray = [loginRoute,registerRoute,forgotPasswordRoute];
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
    },
    {
        title : 'Documentation',
        icon : <ArticleOutlined/>,
        route : docRoute
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
        case docRoute:
            return 'Documentation';
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
        case docRoute:
                return 'Docs';    
        default:
            return "CareerKeeper"; 
    }
}

export {forgotPasswordRoute, docRoute, handleTitleText, navbarListArray,navbarHeading,profileRoute,projectsRoute,workExperience,contactMeRoute,loginRoute,registerRoute,authRoutesArray};