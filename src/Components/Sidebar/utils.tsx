import {PersonOutline,MailOutline, WorkOutline,WhatshotOutlined} from '@mui/icons-material';

const navbarListArray:SidebarEachType[] = [
    {
        title : 'Projects',
        icon : <WhatshotOutlined/>,
        route : '/'
    },
    {
        title : 'Profile',
        icon : <PersonOutline/>,
        route : '/profile'
    },
    {
        title : 'Contact Me',
        icon : <MailOutline/>,
        route : '/contact-me'
    },
    {
        title : 'Experience',
        icon : <WorkOutline/>,
        route : '/work-exp'
    }
]
export {navbarListArray};