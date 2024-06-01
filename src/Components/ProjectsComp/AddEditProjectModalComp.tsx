import { Box, TextField, TextFieldProps } from "@mui/material"
import {CloudUpload} from "@mui/icons-material"

const HiddenInput = ({inputRef,handleFileChange}:HiddenInputType)=>{
    return <input
    type="file"
    ref={inputRef as React.LegacyRef<HTMLInputElement>}
    style={{ display: 'none' }}
    onChange={handleFileChange}
    accept="image/*"
  />
  }
  
  const UploadImageBox=({handleBoxClick,project_image}:UploadImageBoxType )=>{
  
    return <Box className="image_uplaod global_center_style" onClick={handleBoxClick}>
    {project_image === null ?<CloudUpload style={{ color: "#1976D2" }} /> : <UploadedImage project_image={project_image}/>}
  </Box>
  }
  
  const UploadedImage = ({project_image}:{project_image:File | string})=>{
    const image_link = typeof project_image === 'string' ? project_image : URL.createObjectURL(project_image);
    return <img src={image_link} height={'100%'} width={'100%'} style={{objectFit:'cover'}}/>
  }

  const FormTextField = ({ label, placeholder, ...props }: TextFieldProps) => {
    return <TextField
      variant="outlined"
      placeholder={placeholder}
      autoComplete="off"
      label={label}
      {...props}
    />
  }

  export {HiddenInput,UploadImageBox,UploadedImage,FormTextField}