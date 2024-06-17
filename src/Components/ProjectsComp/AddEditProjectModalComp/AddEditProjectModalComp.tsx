import { Autocomplete, Box, Checkbox, IconButton, TextField, TextFieldProps } from "@mui/material"
import {Close, CloudUpload} from "@mui/icons-material"
import { GeneralModalParent } from "../../GeneralModalParent/GeneralModalParent"
import { Formik } from "formik"
import { add_edit_project_schema } from "../../FormsComp/InitialValues"
import { tech_used_array } from "../../../Routes/MyProjects/utils"
import { checkedIcon, icon } from "../../../Routes/MyProjects/MyProjects"
import { SubmitAndCancel } from "../../FormsComp/SubmitAndCancel"
import { useRef } from "react"

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


  function EditProjectModal({ isOpen, handleClose,isEditState,addEditFunction,projectFormInitialValues }: EditModalType) {
    const inputRef = useRef<null | HTMLInputElement>(null);
    const heading = isEditState ? 'Edit' : 'Add';
    const handleBoxClick = () => {
      if (inputRef.current) {
        inputRef.current.click();
      }
    };
  
    const handleFileChange = (
      event: React.ChangeEvent<HTMLInputElement>,
      setFieldValue: (
        field: string,
        value: AddProjectInitialValueType["project_image"],
        shouldValidate?: boolean
      ) => void
    ) => {
      if (event.target.files && event.target.files.length > 0) {
        const file = event.target.files[0];
        setFieldValue("project_image", file);
      }
    };
  
    return (
      <GeneralModalParent isOpen={isOpen} handleClose={handleClose}>
        <Formik
          initialValues={projectFormInitialValues}
          validationSchema={add_edit_project_schema}
          onSubmit={(values) => {
            addEditFunction(values);
          }}
          validateOnChange
          validateOnBlur
          enableReinitialize
        >
          {({
            values,
            handleChange,
            handleSubmit,
            setFieldValue,
            errors,
            touched,
          }) => (
            <Box className="global_uniform_vertical_style">
              <Box>{heading} Project</Box>
              <Box>
                {values.project_image !== null && (
                  <Box className="addButtonParent">
                    <IconButton
                      onClick={() => setFieldValue("project_image", null)}
                    >
                      <Close />
                    </IconButton>
                  </Box>
                )}
                <UploadImageBox
                  handleBoxClick={handleBoxClick}
                  project_image={values.project_image}
                />
                {touched.project_image && errors.project_image && (
                  <Box className="global_error_text">{errors.project_image}</Box>
                )}
              </Box>
              <HiddenInput
                inputRef={inputRef}
                handleFileChange={(event) =>
                  handleFileChange(event, setFieldValue)
                }
              />
              <FormTextField
                placeholder="Title"
                label="Title"
                value={values.title}
                name="title"
                onChange={handleChange}
                error={(errors.title && touched.title) as boolean}
                helperText={touched.title && errors.title}
              />
              <FormTextField
                placeholder="Description"
                label="Description"
                multiline={true}
                minRows={4}
                value={values.description}
                name="description"
                onChange={handleChange}
                error={(errors.description && touched.description) as boolean}
                helperText={touched.description && errors.description}
              />
              <FormTextField
                placeholder="Demo Link"
                label="Demo Link"
                value={values.demo_link}
                name="demo_link"
                onChange={handleChange}
                error={(errors.demo_link && touched.demo_link) as boolean}
                helperText={touched.demo_link && errors.demo_link}
              />
              <FormTextField
                placeholder="Code Link"
                label="Code Link"
                value={values.code_link}
                name="code_link"
                onChange={handleChange}
                error={(errors.code_link && touched.code_link) as boolean}
                helperText={touched.code_link && errors.code_link}
              />
              <Autocomplete
                multiple
                options={tech_used_array}
                disableCloseOnSelect
                getOptionLabel={(option) => option}
                value={values.tech_used}
                onChange={(_event, newValue) => {
                  setFieldValue("tech_used", newValue);
                }}
                renderOption={(props, option, { selected }) => (
                  <li {...props}>
                    <Checkbox
                      icon={icon}
                      checkedIcon={checkedIcon}
                      style={{ marginRight: 8 }}
                      checked={selected}
                    />
                    {option}
                  </li>
                )}
                freeSolo
                renderInput={(params) => (
                  <FormTextField
                    placeholder="Tech Used"
                    label="Tech Used"
                    {...params}
                    fullWidth
                    error={(errors.tech_used && touched.tech_used) as boolean}
                    helperText={touched.tech_used && errors.tech_used}
                  />
                )}
              />
              <SubmitAndCancel handleClose={handleClose} handleSubmit={handleSubmit} submitButtonTitle={isEditState ? 'Save' : 'Add'}/>
            </Box>
          )}
        </Formik>
      </GeneralModalParent>
    );
  }

  export {HiddenInput,UploadImageBox,UploadedImage,FormTextField,EditProjectModal}