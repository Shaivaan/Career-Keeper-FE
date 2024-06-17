import { useEffect, useRef, useState } from "react"
import { Box, Grid, IconButton,  TextFieldProps, Checkbox, Avatar } from "@mui/material"
import { AddProjectButton, SubmitAndCancel } from "../../Components/FormsComp/SubmitAndCancel"
import { GeneralModalParent } from "../../Components/GeneralModalParent/GeneralModalParent"
import { Formik } from "formik"
import { FormTextField, HiddenInput, UploadImageBox } from "../../Components/ProjectsComp/AddEditProjectModalComp/AddEditProjectModalComp"
import { endDateNotRequiredSchema, endDateRequiredSchema, expereince_form_initial_value } from "../../Components/FormsComp/InitialValues"
import { Close, Delete,Edit } from "@mui/icons-material"
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider, DesktopDatePicker } from '@mui/x-date-pickers';
import "./WorkExpereince.css"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { firebaseFirestore, firebaseStorage } from "../../Firebase/firebase"
import {v4 as uuidv4 } from 'uuid'
import { generalErrorMessage, workExpAddedMessage, workExpCollectionName, workExpEditMessage, workExpStorageName } from "../../Zustand/Constants"
import { useAlert, useButtonLoader, useZustandStore } from "../../Zustand/Zustand"
import { addDoc, collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore"
import { User } from "firebase/auth"
import moment from "moment"
import { formatFirestoreTimestamp } from "../MyProjects/utils"



export const WorkExpereince=()=>{
    const [isWorkExpEditModalOpen,setWorkExpEditModalOpen] = useState(false);
    const handleCloseWorkExpModal = ()=>setWorkExpEditModalOpen(false);
    const showAlert = useAlert();
    const [isEditState,setIsEditState] = useState<boolean>(false);
    const currentUserData = useZustandStore((state) => state.currentUserData);
    const buttonLoading = useButtonLoader();
    const handleOpeneWorkExpModal = ()=>{
      setIsEditState(false);
      setWorkExpEditModalOpen(true);
    };
    const [workExpData,setWorkExpData] = useState<WorkExpState>([]);

    const uploadCompanyLogoAndAdd = async (values:WorkExpFormType) => {
      const {company_logo} = values;
      if(typeof company_logo === 'string'){
        return;
      }
      try {
        const storageRef = ref(firebaseStorage, `${workExpStorageName}/${(company_logo as File).name}_${uuidv4()}`);
        await uploadBytes(storageRef, company_logo as File);
        const company_logo_url = await getDownloadURL(storageRef);
        await addEditWorkExp({...values,company_logo:company_logo_url});
      } catch (error) {
        showAlert(generalErrorMessage,'error');
      }
    };


    const addEditWorkExp = async (values:WorkExpFormType) => {
      const successToastMessage = isEditState ? workExpEditMessage : workExpAddedMessage
      try {
        if(!isEditState){
          await addDoc(collection(firebaseFirestore, workExpCollectionName), {...values,user_id:(currentUserData as User).uid});
        }else{
          const projectDocRef = doc(firebaseFirestore, workExpCollectionName, (values as unknown as {id:string}).id);
          await updateDoc(projectDocRef, {...values,user_id:(currentUserData as User).uid});
        }
        showAlert(successToastMessage,'success');
      } catch (error) {
        showAlert(generalErrorMessage,'error');
        console.log(error)
      }finally{
        // fetchProjectsByUserId();
        handleCloseWorkExpModal();
        buttonLoading(false);
      }
    };

    const addEditWorkExpHandler=(values:WorkExpFormType)=>{
      const {company_logo} = values;
      buttonLoading(true);
      if(typeof company_logo === 'string') addEditWorkExp(values);
      else uploadCompanyLogoAndAdd(values);
    }

    const fetchWorkExpByUserId = async () => {
      try {
        const queryDoc = query(collection(firebaseFirestore, workExpStorageName), where("user_id", "==", (currentUserData as User).uid));
        const querySnapshot = await getDocs(queryDoc);
        const workExpRecords = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setWorkExpData(workExpRecords as unknown as WorkExpFormType[]);
        // setIsProjectsLoading(false);
      } catch (error) {
        showAlert(generalErrorMessage,'error');
      }
    };

    useEffect(()=>{
      fetchWorkExpByUserId();
    },[])

    return <Box>
        <AddProjectButton handleOpen={handleOpeneWorkExpModal} buttonTitle="Experience"/>
        <AddEditExperienceModal isEditState={isEditState} isOpen={isWorkExpEditModalOpen} handleClose={handleCloseWorkExpModal} handleSubmit={addEditWorkExpHandler}/>
        <Box className = 'global_uniform_vertical_style' marginTop={'1rem'}>
          {workExpData && workExpData.map((eachExp)=><ExperienceCard eachExp={eachExp}/>)}
          
          
        </Box>
    </Box>
}

const ExperienceCard=({eachExp}: ExperienceCardType)=>{
  const {company_logo,company_name,end_date,exp_desciption,is_currently_working,joining_date} = eachExp;
  const endDate = is_currently_working ? 'Currently Working' : formatFirestoreTimestamp(end_date as unknown as FirestoreTimestamp)
  return <Box className="gridBackground">
    <Box className = 'cardParent'>
      <Avatar className="logo_avatar" src={company_logo as string}/>
      <Box className = 'company_name_container' width={'100%'}>
        <Box className = 'global_justify_space_between'>
            <Box className = 'headind_style'>{company_name}</Box>
            <Box>
              <IconButton><Edit color="secondary"/></IconButton>
              <IconButton><Delete color="error"/></IconButton>
            </Box>
        </Box>
        <Box>{formatFirestoreTimestamp(joining_date as unknown as FirestoreTimestamp)} -  {endDate}</Box>
      </Box>
    </Box>
    <Box className = 'workExpDescription'>{exp_desciption}</Box>
  </Box>
}




const AddEditExperienceModal=({isEditState,handleClose,isOpen,handleSubmit}:WorkExpModalType)=>{

    const heading = isEditState ? 'Add New Experience' : 'Edit Experience'
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
        // console.log(values,moment(values.joining_date).toDate());
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
          <Box>Add {heading}</Box>
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
