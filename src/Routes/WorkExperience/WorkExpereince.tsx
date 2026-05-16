import { useEffect, useState } from "react"
import { Box } from "@mui/material"
import { AddProjectButton } from "../../Components/FormsComp/SubmitAndCancel"
import { expereince_form_initial_value } from "../../Components/FormsComp/InitialValues"
import "./WorkExpereince.css"
import { expDeleteMessage, generalErrorMessage, workExpAddedMessage, workExpEditMessage, workExpFallBack, workExpStorageName } from "../../Zustand/Constants"
import { useAlert, useButtonLoader, useZustandStore } from "../../Zustand/Zustand"
import { addWorkExp, deleteWorkExp, fetchWorkExpByUserId as fetchWorkExp, getWorkExpById, updateWorkExp } from "../../services/workExpService"
import { deleteFileByUrl, uploadFile } from "../../services/storageService"
import DeleteModal from "../../Components/DeleteModal/DeleteModal"
import { AddEditExperienceModal, ExperienceCard } from "../../Components/WorkExpComp/WorkExpComp"
import { NoProjectsAdded } from "../../Components/GeneralFallBackUI/FallBackUI"



export const WorkExpereince=()=>{
    const [isWorkExpEditModalOpen,setWorkExpEditModalOpen] = useState(false);
    const handleCloseWorkExpModal = ()=>setWorkExpEditModalOpen(false);
    const showAlert = useAlert();
    const [isEditState,setIsEditState] = useState<boolean>(false);
    const currentUserData = useZustandStore((state) => state.currentUserData);
    const buttonLoading = useButtonLoader();
    const [isDeleteModalOpen,setIsDeleteModalOpen]= useState(false);
    const [workExpData,setWorkExpData] = useState<WorkExpState>([]);
    const [deleteId,setDeleteId] = useState("");
    const [workExpInitialValue,setWorkExpInitialValue] = useState<WorkExpFormType>(expereince_form_initial_value);
    const [isDataLoading,setIsDataLoading] = useState(false);
    
    const deletModalOpenAndClose =(isOpen:boolean,workExpId="")=>{
      setIsDeleteModalOpen(isOpen);
      setDeleteId(workExpId);
    }
    
    const handleOpeneWorkExpModal = ()=>{
      setIsEditState(false);
      setWorkExpEditModalOpen(true);
      setWorkExpInitialValue(expereince_form_initial_value)
    };

    const handleWorkExpFormValue = (value:WorkExpFormType)=>{
      setIsEditState(true);
      setWorkExpInitialValue(value);
      setWorkExpEditModalOpen(true);
    }


    const uploadCompanyLogoAndAdd = async (values:WorkExpFormType) => {
      const {company_logo} = values;
      if(typeof company_logo === 'string'){
        return;
      }
      try {
        const company_logo_url = await uploadFile(workExpStorageName, company_logo as File);
        await addEditWorkExp({...values,company_logo:company_logo_url});
      } catch (error) {
        showAlert(generalErrorMessage,'error');
      }
    };

    const addEditWorkExp = async (values:WorkExpFormType) => {
      const successToastMessage = isEditState ? workExpEditMessage : workExpAddedMessage
      try {
        const userId = (currentUserData as AppUser).uid;
        if(!isEditState){
          await addWorkExp(values, userId);
        }else{
          await updateWorkExp(values as WorkExpFormType & {id:string}, userId);
        }
        showAlert(successToastMessage,'success');
      } catch (error) {
        showAlert(generalErrorMessage,'error');
      }finally{
        fetchWorkExpByUserId();
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
        const workExpRecords = await fetchWorkExp((currentUserData as AppUser).uid);
        setWorkExpData(workExpRecords as unknown as WorkExpFormType[]);
      } catch (error) {
        showAlert(generalErrorMessage,'error');
      } finally{
        setIsDataLoading(false);
      }
    };

    const deleteProject=async()=>{
      buttonLoading(true);
      try{
        const projectData = await getWorkExpById(deleteId);
        const projectImageUrl = (projectData as WorkExpFormType).company_logo;
        await deleteFileByUrl(workExpStorageName, projectImageUrl as string);
        await deleteWorkExp(deleteId);
        showAlert(expDeleteMessage,'success');
      }catch(error){
        showAlert(generalErrorMessage,'error');
      }finally{
        fetchWorkExpByUserId();
        deletModalOpenAndClose(false);
        buttonLoading(false);
      }
    }

    useEffect(()=>{
      setIsDataLoading(true)
      fetchWorkExpByUserId();
    },[])

    return <Box>
        {!isDataLoading && <AddProjectButton handleOpen={handleOpeneWorkExpModal} buttonTitle="Experience"/>}
        <DeleteModal isOpen={isDeleteModalOpen} closeModal={() => deletModalOpenAndClose(false)} onClickYes={deleteProject}/>
        <AddEditExperienceModal initial_value={workExpInitialValue} isEditState={isEditState} isOpen={isWorkExpEditModalOpen} handleClose={handleCloseWorkExpModal} handleSubmit={addEditWorkExpHandler}/>
        {workExpData .length ? <Box className = 'global_uniform_vertical_style' marginTop={'1rem'}>
          {workExpData && workExpData.map((eachExp)=><ExperienceCard handleWorkExpFormValue={handleWorkExpFormValue} eachExp={eachExp} deletModalOpenAndClose={deletModalOpenAndClose}/>)}
        </Box> : <NoProjectsAdded fallBackText={workExpFallBack} isLoading={isDataLoading}/>} 
        
    </Box>
}

