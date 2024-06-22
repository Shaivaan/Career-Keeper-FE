import { Box, Modal } from "@mui/material"
import { style } from "../../Routes/MyProjects/utils"

export const GeneralModalParent=({handleClose,isOpen,children}:GeneralModalParentType)=>{
    return <Modal open={isOpen} onClose={handleClose} closeAfterTransition>
    <Box sx={style}>
        {children}
    </Box>
    </Modal>
}