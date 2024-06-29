import {CardMedia,Card, CardActions, CardContent,Typography,Grid, IconButton, Box} from '@mui/material';
import {Edit,DeleteOutline, GitHub, OpenInNew} from "@mui/icons-material";
import "./Card.css";

export default function ProjectCard({handleDeleteModalOpen,handleEditState,cardDetails}:CardGenType & EachCardType) {
    const {description,project_image,title,demo_link,code_link} = cardDetails;
  return (
     <Grid item lg={4} md={6} sm={12}>
        <Card>    
        <Box>
            <CardMedia
                component="img"
                alt="green iguana"
                height={'100%'}
                width={'100%'}
                image={project_image as string}
                className='project_image_container'
            />
        </Box>    
        <CardContent>
            <Typography gutterBottom variant="h5" component="div" className='title_text card_title_height'>
               {title}
            </Typography>
            <Typography variant="body2" color="text.secondary" className='description_text card_title_height'>
            {description}
            </Typography>
        </CardContent>
        <CardActions>
            <IconButton onClick={()=>{handleEditState(true,cardDetails)}}><Edit color='secondary'/></IconButton>
            <IconButton onClick={()=>{handleDeleteModalOpen((cardDetails as unknown as {id:string}).id)}}><DeleteOutline color='error'/></IconButton>
            <IconButton href={demo_link as string} target='_blank'><OpenInNew color='action'/></IconButton>
           {code_link && <IconButton href={code_link as string} target='_blank'><GitHub color='info'/></IconButton>}
        </CardActions>
        </Card>
     </Grid>    
  );
}