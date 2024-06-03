import {PersonOutline,MailOutline, WorkOutline,WhatshotOutlined} from '@mui/icons-material';

const profileRoute = '/profile';
const projectsRoute = '/';
const contactMeRoute = '/contact-me';
const workExperience = '/work-exp';
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
        title : 'Contact Me',
        icon : <MailOutline/>,
        route : contactMeRoute
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

export {navbarListArray,navbarHeading,profileRoute,projectsRoute,workExperience,contactMeRoute};