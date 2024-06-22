import { Box,IconButton,Typography } from '@mui/material';
import { requestExample, prerequisitesData, responseExample, tsLink } from './DocumentationUtils';
import "./Documentation.css"
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { ContentCopy } from '@mui/icons-material';
import { useAlert } from '../../Zustand/Zustand';
import { apiCopy, baseURLCollection, baseURLDOCID, generalErrorMessage, reqMessageCopy, resMessageCopy } from '../../Zustand/Constants';
import { firebaseFirestore } from '../../Firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';


export const Documentation = () => {
    return <Box className='global_uniform_vertical_style'>
        <Box className='gridBackground'>
            <Box className='doc_head'>Career Keeper Documentation</Box>
            <Box>Welcome to the Career Keeper documentation. This guide will help you use the application efficiently by explaining how to fetch your data using our API.</Box>
        </Box>
        <Prerequisites />
        <FetchingData />
        <APIEndpoint/>
    </Box>
}

const Prerequisites = () => {
    return <>
        <Box className='gridBackground global_uniform_vertical_style'>
            <Box className='prereqetext'>Prerequisites</Box>
            <Box>
                <Box>Before you start using the APIs, make sure you have completed the following steps:</Box>
                <Box component={'ol'}>
                    {prerequisitesData.map(({ pointKey, pointValue }) => <ListItemPoint pointKey={pointKey} pointValue={pointValue} />)}
                </Box>
            </Box>

        </Box>
    </>
}


const FetchingData = ()=>{
    return <Box className='gridBackground global_uniform_vertical_style'>
        <Box className='prereqetext'>Fetching Your Data</Box>
        <Box>To fetch your data, you will need your user_id. This unique identifier is essential for making API requests to retrieve your stored information.</Box>
        <Box>
            <Box className ='sub_head'>How to Get Your User ID</Box>
            <Box component={'ol'}>
                <Box component={'li'}>Navigate to your profile page.</Box>
                <Box component={'li'}>Click the Copy User ID button to copy your unique user ID to the clipboard.</Box>
            </Box>
        </Box>
    </Box>
}

  const APIEndpoint=()=>{
    const showAlert = useAlert();
    const showCopiedAlert = (message:string)=>{
      showAlert(message,'success')
    }
    const [baseUrl,setBaseUrl] = useState('');
    useEffect(()=>{
        fetchBaseUrlData();
    },[])


    const fetchBaseUrlData = async () => {
        try {
          const docRef = doc(firebaseFirestore, baseURLCollection, baseURLDOCID);
          const docSnapshot = await getDoc(docRef);
          if (docSnapshot.exists()) {
            const data = docSnapshot.data();
            setBaseUrl(data?.baseUrl);
          } 
        } catch (error) {
          showAlert(generalErrorMessage,'error');
        }
      };

    return <Box className='gridBackground global_uniform_vertical_style'>
        <Box className = 'prereqetext'>API Endpoints</Box>
        <Box>Here are the main API endpoints you will use to fetch your data. All requests should include your user_id in the request body.</Box>
        <Box className = 'sub_head'>Get Profile Details</Box>
        <Box>API: </Box>
        <CodeWithIcon showCopiedAlert={()=>{showCopiedAlert(apiCopy)}} textToCopy={`${baseUrl}/api/user`}/>    
        <Box>Method: GET</Box>
        <Box>Request Body:</Box>
        <CodeWithIcon showCopiedAlert={()=>{showCopiedAlert(reqMessageCopy)}} textToCopy={requestExample}/>    
        <Box>Response Body: <Box component={'a'} href={tsLink} target='_blank'>Response Type</Box></Box>
        <CodeWithIcon showCopiedAlert={()=>{showCopiedAlert(resMessageCopy)}} textToCopy={responseExample}/>    
    </Box>
}

const CodeWithIcon=({showCopiedAlert,textToCopy}:CodeWithIconType)=>{
   return <Box className='code_parent'>
         <IconButton className='copy-icon'>
        <CopyToClipboard text={textToCopy} onCopy={showCopiedAlert}>     
            <ContentCopy/>
          </CopyToClipboard>
            </IconButton>    
            <Typography component={'pre'} variant="body2" >{textToCopy}</Typography>
        </Box>
}

const ListItemPoint = ({ pointKey, pointValue }: ListItemPointType) => {
    return <Box component={'li'}>
        <Box component={'span'} className='listBold'>{pointKey}</Box>
        : {pointValue}
    </Box>
}