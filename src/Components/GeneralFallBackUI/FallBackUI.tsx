import { Box, CircularProgress } from "@mui/material";
import "./FallBackUI.css"
import { TurnSlightRight } from "@mui/icons-material";

const FallBackUI=({children}:ChildrenType)=>{
    return <Box className="global_center_style fallback_parent gen_height_load_fallback">
        {children}
    </Box>
}


const NoProjectsAdded=({isLoading,fallBackText}:NoProjectsAddedType)=>{
    return <FallBackUI>
      {isLoading ? <CircularProgress/> : <Box>
          {fallBackText} <TurnSlightRight/>
        </Box>}
        
      </FallBackUI>
  }
  export {NoProjectsAdded, FallBackUI}