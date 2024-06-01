import {CardMedia,Card, CardActions, CardContent,Typography,Grid, IconButton} from '@mui/material';
import {Edit,DeleteOutline} from "@mui/icons-material";
import "./Card.css";

export default function ProjectCard({handleDeleteModalOpen}:CardParentCompType) {
  return (
     <Grid item lg={4}>
        <Card>
        <CardMedia
            component="img"
            alt="green iguana"
            height="250"
            image="https://mui.com/static/images/cards/contemplative-reptile.jpg"
        />
        <CardContent style={{flexGrow:1}}>
            <Typography gutterBottom variant="h5" component="div" className='title_text'>
               Lizard Lizard Lizard Lizard Lizard Lizard Lizard Lizard Lizard Lizard Lizard Lizard Lizard Lizard Lizard
            </Typography>
            <Typography variant="body2" color="text.secondary" className='description_text'>
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
            </Typography>
        </CardContent>
        <CardActions>
            <IconButton><Edit color='secondary'/></IconButton>
            <IconButton onClick={handleDeleteModalOpen}><DeleteOutline color='error'/></IconButton>
        </CardActions>
        </Card>
     </Grid>    
  );
}