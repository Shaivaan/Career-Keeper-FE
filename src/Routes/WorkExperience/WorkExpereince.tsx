import { useRef, useState } from "react"
import { Box, Grid, IconButton,  TextFieldProps, Checkbox, Avatar } from "@mui/material"
import { AddProjectButton, SubmitAndCancel } from "../../Components/FormsComp/SubmitAndCancel"
import { GeneralModalParent } from "../../Components/GeneralModalParent/GeneralModalParent"
import { Formik } from "formik"
import { FormTextField, HiddenInput, UploadImageBox } from "../../Components/ProjectsComp/AddEditProjectModalComp/AddEditProjectModalComp"
import { endDateNotRequiredSchema, endDateRequiredSchema, expereince_form_initial_value } from "../../Components/FormsComp/InitialValues"
import { Close } from "@mui/icons-material"
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider, DesktopDatePicker } from '@mui/x-date-pickers';
import "./WorkExpereince.css"


export const WorkExpereince=()=>{
    const [isWorkExpEditModalOpen,setWorkExpEditModalOpen] = useState(false);
    const handleCloseWorkExpModal = ()=>setWorkExpEditModalOpen(false);
    const handleOpeneWorkExpModal = ()=>setWorkExpEditModalOpen(true);

    return <Box>
        <AddProjectButton handleOpen={handleOpeneWorkExpModal} buttonTitle="Experience"/>
        <AddEditExperienceModal isOpen={isWorkExpEditModalOpen} handleClose={handleCloseWorkExpModal}/>
        <Box className = 'global_uniform_vertical_style' marginTop={'1rem'}>
          <ExperienceCard/>
          
        </Box>
    </Box>
}

const ExperienceCard=()=>{
  return <Box className="gridBackground">
    <Box className = 'cardParent'>
      <Avatar className="logo_avatar"/>
      <Box className = 'company_name_container'>
        <Box className = 'headind_style'>Metafic</Box>
        <Box>24 July, 2022 - Currently (2 year)</Box>
      </Box>
    </Box>

    <Box className = 'workExpDescription'>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro laboriosam facere id corrupti! Ex nam dolores, quod tenetur expedita voluptate reiciendis quo ullam, ducimus rerum culpa, iure at. Accusantium, quo.
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro laboriosam facere id corrupti! Ex nam dolores, quod tenetur expedita voluptate reiciendis quo ullam, ducimus rerum culpa, iure at. Accusantium, quo.
    </Box>
    
  
  </Box>
}


const AddEditExperienceModal=({handleClose,isOpen}:WorkExpModalType)=>{

    const inputRef = useRef<null | HTMLInputElement>(null);
    const [isCurrentlyWorking,setIsCurrentlyWorking] = useState(false);
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
        setFieldValue("company_logo", file);
      }
    };

    return  <GeneralModalParent isOpen={isOpen} handleClose={handleClose}>
    <Formik
      initialValues={expereince_form_initial_value}
      validationSchema={isCurrentlyWorking ? endDateNotRequiredSchema : endDateRequiredSchema}
      onSubmit={(values) => {
        // this.handleFormSubmit(values);
        console.log(values);
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
          <Box>Add Project</Box>
          <Box>
            {values.company_logo !== null && (
              <Box className="addButtonParent">
                <IconButton
                  onClick={() => setFieldValue("company_logo", null)}
                >
                  <Close />
                </IconButton>
              </Box>
            )}
            <UploadImageBox
              handleBoxClick={handleBoxClick}
              project_image={values.company_logo}
            />
            {touched.company_logo && errors.company_logo && (
              <Box className="global_error_text">{errors.company_logo}</Box>
            )}
          </Box>
          <HiddenInput
            inputRef={inputRef}
            handleFileChange={(event) =>
              handleFileChange(event, setFieldValue)
            }
          />
          <FormTextField
            placeholder="Company Name"
            label="Company Name"
            value={values.company_name}
            name="company_name"
            onChange={handleChange}
            error={(errors.company_name && touched.company_name) as boolean}
            helperText={touched.company_name && errors.company_name}
          />
          <FormTextField
            placeholder="Exp Desciption"
            label="Exp Desciption"
            multiline={true}
            minRows={4}
            value={values.exp_desciption}
            name="description"
            onChange={handleChange}
            error={(errors.exp_desciption && touched.exp_desciption) as boolean}
            helperText={touched.exp_desciption && errors.exp_desciption}
          />


        <LocalizationProvider dateAdapter={AdapterMoment}>
            <Grid  container justifyContent={'space-between'}>
                <Grid item sm={5.8} lg={5.8} xs={12} id="date_picker">
                <DesktopDatePicker
                label="Joining Date"
                inputFormat="MM/DD/YYYY"
                value={values.joining_date}
                onChange={(value:moment.Moment | null)=>setFieldValue('joining_date',value)}
                renderInput={(params:TextFieldProps) => <FormTextField {...params}  error={(errors.joining_date && touched.joining_date) as boolean} helperText={touched.joining_date && errors.joining_date}/>}
                />
                </Grid>

                {!values.is_currently_working  &&
                <Grid item sm={5.8} lg={5.8} xs={12} id="date_picker">
                <DesktopDatePicker
                label="Leaving Date"
                inputFormat="MM/DD/YYYY"
                value={values.end_date}
                onChange={(value:Date | null)=>setFieldValue('end_date',value)}
                renderInput={(params:TextFieldProps) => <FormTextField className="date_picker" {...params} error={(errors.end_date && touched.end_date) as boolean} helperText={touched.end_date && errors.end_date}/>}
                />

                </Grid>
                }

            </Grid>
     
        </LocalizationProvider>

        <Box className = 'is_current_work_parent'>
          <Checkbox checked={values.is_currently_working} onChange={(_event: React.ChangeEvent<HTMLInputElement>)=>{setFieldValue('is_currently_working',!values.is_currently_working);setIsCurrentlyWorking(!values.is_currently_working)}}/>
          <Box>Is currently working?</Box>
        </Box>

          <SubmitAndCancel handleClose={handleClose} handleSubmit={handleSubmit}/>
        </Box>
      )}
    </Formik>
  </GeneralModalParent>
}
