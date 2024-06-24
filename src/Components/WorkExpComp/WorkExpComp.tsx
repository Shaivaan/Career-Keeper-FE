import { useRef, useState } from 'react';
import {Avatar, Box,Checkbox,Grid,IconButton, TextFieldProps} from '@mui/material';
import moment from "moment";
import { FireTime } from "../../Firebase/firebase";
import { Formik } from 'formik';
import { GeneralModalParent } from '../GeneralModalParent/GeneralModalParent';
import { endDateNotRequiredSchema, endDateRequiredSchema } from '../FormsComp/InitialValues';
import { Close, Delete, Edit } from '@mui/icons-material';
import { FormTextField, HiddenInput, UploadImageBox } from '../ProjectsComp/AddEditProjectModalComp/AddEditProjectModalComp';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { SubmitAndCancel } from '../FormsComp/SubmitAndCancel';
import { formatFirestoreTimestamp } from '../../Routes/MyProjects/utils';

const AddEditExperienceModal=({isEditState,handleClose,isOpen,handleSubmit,initial_value}:WorkExpModalType)=>{

    const heading = !isEditState ? 'Add New Experience' : 'Edit Experience'
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
      initialValues={initial_value}
      validationSchema={isCurrentlyWorking ? endDateNotRequiredSchema : endDateRequiredSchema}
      onSubmit={(values) => {
        const dateObj = {
          joining_date : moment(values.joining_date).toDate() ,
          end_date :  moment(values.end_date).toDate() 
        }
        handleSubmit({...values,...dateObj})
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
          <Box>{heading}</Box>
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
            placeholder="Your Role"
            label="Your Role"
            value={values.role}
            name="role"
            onChange={handleChange}
            error={(errors.role && touched.role) as boolean}
            helperText={touched.role && errors.role}
          />
          <FormTextField
            placeholder="Exp Desciption"
            label="Exp Desciption"
            multiline={true}
            minRows={4}
            value={values.exp_desciption}
            name="exp_desciption"
            id="exp_desciption"
            onChange={handleChange}
            error={(errors.exp_desciption && touched.exp_desciption) as boolean}
            helperText={touched.exp_desciption && errors.exp_desciption}
          />


        <LocalizationProvider dateAdapter={AdapterMoment}>
            <Grid  container justifyContent={'space-between'}>
                <Grid item sm={5.8} lg={5.8} xs={12} id="date_picker">
                <DesktopDatePicker
                label="Joining Date"
                inputFormat="DD-MM-YYYY"
                value={values.joining_date}
                onChange={(value:moment.Moment | null)=>setFieldValue('joining_date',value)}
                renderInput={(params:TextFieldProps) => <FormTextField {...params}  error={(errors.joining_date && touched.joining_date) as boolean} helperText={touched.joining_date && errors.joining_date}/>}
                />
                </Grid>
                {!values.is_currently_working  &&
                <Grid item sm={5.8} lg={5.8} xs={12} id="date_picker">
                <DesktopDatePicker
                label="Leaving Date"
                inputFormat="DD-MM-YYYY"
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


const ExperienceCard=({eachExp,deletModalOpenAndClose,handleWorkExpFormValue}: ExperienceCardType)=>{
    const {company_logo,company_name,end_date,exp_desciption,is_currently_working,joining_date,role} = eachExp;
    const endDate = is_currently_working ? 'Currently Working' : formatFirestoreTimestamp(end_date as unknown as FirestoreTimestamp)
    return <Box className="gridBackground">
      <Box className = 'cardParent'>
        <Avatar className="logo_avatar" src={company_logo as string}/>
        <Box className = 'company_name_container' width={'100%'}>
          <Box className = 'global_justify_space_between'>
              <Box>
                  <Box component={'span'} className = 'headind_style'>{company_name}</Box>
                  <Box component={'span'} marginLeft={'1rem'}>({role})</Box>
              </Box>
              
              <Box>
                <IconButton onClick={()=>handleWorkExpFormValue({...eachExp,joining_date:firebaseDateToMoment(eachExp.joining_date as unknown as FireTime) as unknown as Date,end_date :firebaseDateToMoment(eachExp.end_date as unknown as FireTime) as unknown as Date})}><Edit color="secondary"/></IconButton>
                <IconButton onClick={()=>deletModalOpenAndClose(true,(eachExp as unknown as {id:string}).id)}><Delete color="error"/></IconButton>
              </Box>
          </Box>
          <Box>{formatFirestoreTimestamp(joining_date as unknown as FirestoreTimestamp)} -  {endDate}</Box>
        </Box>
      </Box>
      <Box className = 'workExpDescription'>{exp_desciption}</Box>
    </Box>
  }


  const firebaseDateToMoment=(date:FireTime)=>{
    return moment(date.toDate())
  }
  

  export {ExperienceCard, AddEditExperienceModal}