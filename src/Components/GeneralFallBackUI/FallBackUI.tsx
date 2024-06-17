import { Box } from "@mui/material";
import "./FallBackUI.css"

export const FallBackUI=({children}:ChildrenType)=>{
    return <Box className="global_center_style fallback_parent gen_height_load_fallback">
        {children}
    </Box>
}