import {
  Box,
  CircularProgress,
  Grid,
} from "@mui/material";
import "./MyProjects.css";
import {
  CheckBoxOutlineBlank,
  CheckBox,
  TurnSlightRight,
} from "@mui/icons-material";
import {  useEffect, useState } from "react";
import {
  add_edit_project_initial_values,
} from "../../Components/FormsComp/InitialValues";
import {
  EditProjectModal,
} from "../../Components/ProjectsComp/AddEditProjectModalComp/AddEditProjectModalComp";
import ProjectCard from "../../Components/ProjectsComp/Card/Card";
import DeleteModal from "../../Components/DeleteModal/DeleteModal";
import { AddProjectButton } from "../../Components/FormsComp/SubmitAndCancel";
import { generalErrorMessage, projectAddedMessage, projectCollection, projectDeleteMessage, projectEditMessage, projectPictureStorageName } from "../../Zustand/Constants";
import { useAlert, useButtonLoader, useZustandStore } from "../../Zustand/Zustand";
import { User } from "firebase/auth";
import { firebaseFirestore, firebaseStorage } from "../../Firebase/firebase";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { FallBackUI } from "../../Components/GeneralFallBackUI/FallBackUI";
import {v4 as uuidv4 } from 'uuid'


export const icon = <CheckBoxOutlineBlank fontSize="small" />;
export const checkedIcon = <CheckBox fontSize="small" />;

export const MyProjectsScreen = () => {
  const [open, setOpen] = useState(false);
  const currentUserData = useZustandStore((state) => state.currentUserData);
  const buttonLoading = useButtonLoader();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const showAlert = useAlert();

  const [projectsData,setProjecstData] = useState<AddProjectInitialValueType[] | []>([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const handleDeleteModalClose = () => setIsDeleteModalOpen(false);
  const [isEditState,setIsEditState] = useState(false);
  const [projectToDeleteId,setProjectToDeleteId] = useState<string>("");
  const [projectFormInitialValues,setProjectFormInitialValues] = useState(add_edit_project_initial_values);
  const [isProjectLoading,setIsProjectsLoading] = useState(true);

  const handleDeleteModalOpen = (project_id:string) => {
    setIsDeleteModalOpen(true)
    setProjectToDeleteId(project_id);
  };
  const handleEditState=(isEditState:boolean)=>{
    setIsEditState(isEditState);
  }

  const addProjectModalOpen=(isEditState:boolean,projectInitialValues=add_edit_project_initial_values)=>{
    handleOpen();
    setProjectFormInitialValues(projectInitialValues);
    handleEditState(isEditState);
  }

  const addEditProject = async (values:AddProjectInitialValueType) => {
    const successToastMessage = isEditState ? projectEditMessage : projectAddedMessage
    try {
      if(!isEditState){
        await addDoc(collection(firebaseFirestore, projectCollection), {...values,user_id:(currentUserData as User).uid});
      }else{
        const projectDocRef = doc(firebaseFirestore, projectCollection, (values as unknown as {id:string}).id);
        await updateDoc(projectDocRef, {...values,user_id:(currentUserData as User).uid});
      }
      showAlert(successToastMessage,'success');
    } catch (error) {
      showAlert(generalErrorMessage,'error');
    }finally{
      fetchProjectsByUserId();
      handleClose();
      buttonLoading(false);
    }
  };

  const uploadProfilePictureAndAddProject = async (values:AddProjectInitialValueType) => {
    const {project_image} = values;
    if(typeof project_image === 'string'){
      return;
    }
    try {
      const storageRef = ref(firebaseStorage, `${projectPictureStorageName}/${(project_image as File).name}_${uuidv4()}`);
      await uploadBytes(storageRef, project_image as File);
      const project_image_url = await getDownloadURL(storageRef);
      await addEditProject({...values,project_image:project_image_url})
    } catch (error) {
      showAlert(generalErrorMessage,'error')
    }
  };

  const addEditProjectHandler=(values:AddProjectInitialValueType)=>{
    const {project_image} = values;
    buttonLoading(true);
    if(typeof project_image === 'string') addEditProject(values);
    else uploadProfilePictureAndAddProject(values);;
  }

  const fetchProjectsByUserId = async () => {
    try {
      const queryDoc = query(collection(firebaseFirestore, projectCollection), where("user_id", "==", (currentUserData as User).uid));
      const querySnapshot = await getDocs(queryDoc);
      const projects = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProjecstData(projects as unknown as AddProjectInitialValueType[]);
      setIsProjectsLoading(false);
    } catch (error) {
      showAlert(generalErrorMessage,'error');
    }
  };

  const deleteProject=async()=>{
    buttonLoading(true);
    try{
      const projectDocRef = doc(firebaseFirestore, projectCollection, projectToDeleteId);
      const projectDoc = await getDoc(projectDocRef);
      const projectData = projectDoc.data();
      const projectImageUrl = (projectData as AddProjectInitialValueType).project_image;
      const imageRef = ref(firebaseStorage, projectImageUrl as string);
      await deleteObject(imageRef);
      await deleteDoc(projectDocRef);
      showAlert(projectDeleteMessage,'success');
    }catch(error){
      showAlert(generalErrorMessage,'error');
    }finally{
      fetchProjectsByUserId();
      handleDeleteModalClose();
      buttonLoading(false);
    }
  }

  useEffect(()=>{
    fetchProjectsByUserId();
  },[])


  return (
    <Box>
      <DeleteModal
        isOpen={isDeleteModalOpen}
        closeModal={() => handleDeleteModalClose()}
        onClickYes={deleteProject}
      />
      <EditProjectModal projectFormInitialValues={projectFormInitialValues} isOpen={open} handleClose={handleClose} isEditState={isEditState} addEditFunction={addEditProjectHandler}/>
     {!isProjectLoading && <AddProjectButton handleOpen={()=>{addProjectModalOpen(false)}} buttonTitle="Project"/>}
      <Box marginTop={"1rem"}>
        <CardsParentComponent isLoading={isProjectLoading} handleDeleteModalOpen={handleDeleteModalOpen} handleEditState={addProjectModalOpen} projectData={projectsData} />
      </Box>
    </Box>
  );
};

const CardsParentComponent = ({
  handleDeleteModalOpen,
  handleEditState,
  projectData,
  isLoading
  
}: CardParentCompType & CardGenType & NoProjectsAddedType) => {
  return (
    <Box>
      {projectData.length === 0 ? <NoProjectsAdded isLoading={isLoading}/> :   <Grid container justifyContent={"start"} spacing={4}>
        {projectData && projectData.map((projectData) => (
          <ProjectCard cardDetails={projectData} handleDeleteModalOpen={handleDeleteModalOpen} handleEditState={handleEditState}/>
        ))}
      </Grid>}
     
    </Box>
  );
};

const NoProjectsAdded=({isLoading}:NoProjectsAddedType)=>{
  return <FallBackUI>
    {isLoading ? <CircularProgress/> : <Box>
        No Projects Added!, Add One <TurnSlightRight/>
      </Box>}
      
    </FallBackUI>
}



