import { useEffect, useState } from "react";
import { Box, Avatar, Grid, IconButton, Button, Chip, Tooltip } from "@mui/material";
import { ContentCopy, Edit } from "@mui/icons-material";
import "./MyProfile.css";
import { EditProfileForm, EditWorkShowCaseForm } from "../../Components/MyProfilePageComp/MyProfilePageComp";
import { useAlert, useButtonLoader, useZustandStore } from "../../Zustand/Zustand";
import { fetchProfile, updateProfile } from "../../services/profileService";
import { uploadFile } from "../../services/storageService";
import { IdCopyMessage, changesSavedMessage, generalErrorMessage, profilePictureCollectionStorage } from "../../Zustand/Constants";
import { edit_profile_form_initial_values, showcase_form_initial_values } from "../../Components/FormsComp/InitialValues";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { NoProjectsAdded } from "../../Components/GeneralFallBackUI/FallBackUI";



export const MyProfile = () => {
  const showAlert = useAlert();
  const buttonLoading = useButtonLoader();
  const [profileEditModal, setProfileEditModal] = useState(false);
  const handleDeleteModalOpen = () => setProfileEditModal(true);
  const handleDeleteModalClose = () => setProfileEditModal(false);

  const [workshowCaseEditModalOpen, setWorkshowCaseEditModalOpen] = useState(false);
  const handleShowCaseOpen = () => setWorkshowCaseEditModalOpen(true);
  const handleShowCaseClose = () => setWorkshowCaseEditModalOpen(false);
  const currentUserData = useZustandStore((state) => state.currentUserData);
  const [profilePageData,setProfilePageData] = useState<ProfileDataStateType>({...edit_profile_form_initial_values,showCase:showcase_form_initial_values});
  const [isProfileLoading,setIsProfileLoading] = useState<boolean>(true);

  const fetchUserData = async () => {
    try {
      const userData = await fetchProfile((currentUserData as AppUser).uid);
      if (userData) {
        setProfilePageData(userData);
      } else {
        showAlert('User Not Found!','error')
      }
    } catch (error) {
      showAlert(generalErrorMessage,'error');
    } finally {
      setIsProfileLoading(false);
    }
  };

  const updateProfileData = async (updates: EditProfileFormIntiValueType | {showCase : ShowCaseFormType}) => {
    try {
      await updateProfile((currentUserData as AppUser).uid, updates);
      showAlert(changesSavedMessage,'success');
      fetchUserData();
      handleDeleteModalClose();
      handleShowCaseClose();
    } catch (error) {
      showAlert(generalErrorMessage,'error')
    } finally {
      buttonLoading(false);
    }
  };

  const uploadFileAndUpdateProfilePicture = async (updates: EditProfileFormIntiValueType) => {
    const {profile_picture} = updates;
    try {
      const fileURL = await uploadFile(
        profilePictureCollectionStorage,
        profile_picture as File,
        (currentUserData as AppUser).uid,
      );
      await updateProfileData({...updates,profile_picture:fileURL});
    } catch (error) {
      showAlert(generalErrorMessage,'error')
    }
  };

  const mainProfileEditFunction = async(updates: EditProfileFormIntiValueType)=>{
    buttonLoading(true);
    if(typeof updates.profile_picture === 'string'){
      await updateProfileData(updates);
    }else{
      await uploadFileAndUpdateProfilePicture(updates);
    }
  }

  const editWorkFlow=async(values: ShowCaseFormType)=>{
    buttonLoading(true);
    await updateProfileData({showCase : values})
  }


  useEffect(()=>{
    setIsProfileLoading(true);
    fetchUserData();
  },[])

  return (
    <>
    { !isProfileLoading ? <Box className="global_uniform_vertical_style">
      <ProfileDisplay profileData={profilePageData} uid={(currentUserData as AppUser).uid}/>
      <PersonalInformation handleEditProfileModalOpen={handleDeleteModalOpen} profileData={profilePageData}/>
      <WorkShowCase  handleOpenWorkShowCaseModalOpen={handleShowCaseOpen} profileData={profilePageData}/>
      <EditProfileForm
        isOpen={profileEditModal}
        updateProfileData={mainProfileEditFunction}
        handleClose={handleDeleteModalClose}
        profileData={profilePageData}
        profileFormInitialValues={{
          first_name:profilePageData.first_name,
          last_name:profilePageData.last_name,
          profile_picture:profilePageData.profile_picture,
          email:profilePageData.email,
          about:profilePageData.about,
          profession:profilePageData.profession
        }}
      />
      <EditWorkShowCaseForm updateProfileData={(values:ShowCaseFormType)=>editWorkFlow(values)} workShowCaseData={profilePageData.showCase} handleClose={handleShowCaseClose} isOpen={workshowCaseEditModalOpen} />
    </Box> : <NoProjectsAdded fallBackText={''} isLoading={isProfileLoading}/>}
    
    </>
  );
};

const DisplayValueWithLabel = ({
  lable,
  value,
  isUsedForNavigation = false,
}: DisplayValueWithLabelType) => {
  return (
    <Box className="global_uniform_vertical_style" style={{ rowGap: "0.2rem" }}>
      <Box color={"grey"}>{lable}</Box>
      {!isUsedForNavigation ? (
        <Box>{value}</Box>
      ) : (
        <LinkHandler navLink={value}/>
      )}
    </Box>
  );
};

const LinkHandler=({navLink}:LinkHandlerType)=>{
  const canNavigate = navLink !== null && navLink !== '';
  return <>
     {canNavigate ? <Button
          variant="text"
          color="primary"
          style={{ width: "5rem", textTransform: "none" }}
          target="_blank"
          href={navLink as string}
        >
          Visit
        </Button> : <Chip label='No Link Attached' style={{width:'10rem'}}/> }
  </>
}

const ProfileDisplay = ({profileData,uid}:ProfileDisplaySectionType & {uid:string}) => {
  const {first_name,last_name,email,profile_picture,profession} = profileData;
  const showAlert = useAlert();
  const showCopiedAlert = ()=>{
    showAlert(IdCopyMessage,'success')
  }
  return (
    <Box className="profileDisplayParent gridBackground">
      <Avatar className="avatar_style" src={profile_picture as unknown as undefined}/>
      <Box
        className="global_uniform_vertical_style"
        style={{ rowGap: "0.2rem" }}
      >
        <Box display='flex'>
        <Box className="nameHead">{first_name} {last_name}</Box>
        <CopyToClipboard text={uid} onCopy={showCopiedAlert}> 
            <IconButton style={{marginLeft:'0.5rem'}}><Tooltip title='Copy Your User ID'><ContentCopy/></Tooltip></IconButton>
        </CopyToClipboard>
        <Box>
        </Box>
       
        </Box>
        <Box marginTop={'0.3rem'}>{email}</Box>
        <Box>
          {profession && profession.map(((eachProfession)=><Chip style={{marginRight:'0.5rem'}} label={(eachProfession as unknown as  ProfessionType).role}/>))}
        </Box>
      </Box>
    </Box>
  );
};





const PersonalInformation = ({
  handleEditProfileModalOpen,
  profileData
}: PersonalInformationType & ProfileDisplaySectionType) => {
  const {first_name,last_name,email,about} = profileData
  return (
    <Box
      className="gridBackground global_uniform_vertical_style"
      style={{ rowGap: "1.5rem" }}
    >
      <Box className="global_justify_space_between" width={"100%"}>
        <Box fontSize={"1.2rem"}>Personal Information</Box>
        <IconButton onClick={() => handleEditProfileModalOpen()}>
          <Edit color="secondary" />
        </IconButton>
      </Box>
      <Grid container style={{ rowGap: "1.5rem" }}>
        <Grid item lg={3} sm={6} xs={12}>
          <DisplayValueWithLabel lable="First Name" value={first_name} />
        </Grid>
        <Grid item lg={9} sm={6} xs={12}>
          <DisplayValueWithLabel lable="Last Name" value={last_name} />
        </Grid>
        <Grid item lg={3} sm={6} xs={12}>
          <DisplayValueWithLabel lable="Email" value={email} />
        </Grid>
        <Grid item lg={9} sm={6} xs={12}>
          <DisplayValueWithLabel lable="About Me" value={about} />
        </Grid>
      </Grid>
    </Box>
  );
};

const WorkShowCase = ({profileData,handleOpenWorkShowCaseModalOpen}:WorkShowCaseFormType & ProfileDisplaySectionType) => {
  const {showCase:{github,instagram,linked_in,resume,youtube,cover_letter}} = profileData;
  return (
    <Box
      className="gridBackground global_uniform_vertical_style"
      style={{ rowGap: "1.5rem" }}
    >
      <Box className="global_justify_space_between" width={"100%"}>
        <Box fontSize={"1.2rem"}>Work Showcase</Box>
        <IconButton onClick={handleOpenWorkShowCaseModalOpen}>
          <Edit color="secondary" />
        </IconButton>
      </Box>
      <Grid container style={{ rowGap: "1.5rem" }}>
        <Grid item lg={3} sm={6} xs={12}>
          <DisplayValueWithLabel
            lable="Linked In"
            value={linked_in}
            isUsedForNavigation={true}
          />
        </Grid>
        <Grid item lg={9} sm={6} xs={12}>
          <DisplayValueWithLabel
            lable="Resume"
            value={resume}
            isUsedForNavigation={true}
          />
        </Grid>
        <Grid item lg={3} sm={6} xs={12}>
          <DisplayValueWithLabel
            lable="Cover Letter"
            value={cover_letter}
            isUsedForNavigation={true}
          />
        </Grid>
        <Grid item lg={9} sm={6} xs={12}>
          <DisplayValueWithLabel
            lable="Github"
            value={github}
            isUsedForNavigation={true}
          />
        </Grid>
        <Grid item lg={3} sm={6} xs={12}>
          <DisplayValueWithLabel
            lable="Youtube"
            value={youtube}
            isUsedForNavigation={true}
          />
        </Grid>
        <Grid item lg={9} sm={6} xs={12}>
          <DisplayValueWithLabel
            lable="Instagram"
            value={instagram}
            isUsedForNavigation={true}
          />
        </Grid>
      </Grid>
    </Box>
  );
};


