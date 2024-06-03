import { useState } from "react";
import { Box, Avatar, Grid, IconButton, Button } from "@mui/material";
import { Edit } from "@mui/icons-material";
import "./MyProfile.css";
import { EditProfileForm, EditWorkShowCaseForm } from "../../Components/MyProfilePageComp/MyProfilePageComp";
export const MyProfile = () => {
  const [profileEditModal, setProfileEditModal] = useState(false);
  const handleDeleteModalOpen = () => setProfileEditModal(true);
  const handleDeleteModalClose = () => setProfileEditModal(false);

  const [workshowCaseEditModalOpen, setWorkshowCaseEditModalOpen] = useState(false);
  const handleShowCaseOpen = () => setWorkshowCaseEditModalOpen(true);
  const handleShowCaseClose = () => setWorkshowCaseEditModalOpen(false);

  return (
    <Box className="global_uniform_vertical_style">
      <ProfileDisplay />
      <PersonalInformation handleEditProfileModalOpen={handleDeleteModalOpen} />
      <WorkShowCase  handleOpenWorkShowCaseModalOpen={handleShowCaseOpen}/>
      <EditProfileForm
        isOpen={profileEditModal}
        handleClose={handleDeleteModalClose}
      />
      <EditWorkShowCaseForm handleClose={handleShowCaseClose} isOpen={workshowCaseEditModalOpen}/>
    </Box>
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
        <Button
          variant="text"
          color="primary"
          style={{ width: "5rem", textTransform: "none" }}
          target="_blank"
          href="value"
        >
          Visit
        </Button>
      )}
    </Box>
  );
};

const ProfileDisplay = () => {
  return (
    <Box className="profileDisplayParent gridBackground">
      <Avatar className="avatar_style" />
      <Box
        className="global_uniform_vertical_style"
        style={{ rowGap: "0.2rem" }}
      >
        <Box className="nameHead">Jack Adams</Box>
        <Box className="worker">Web Developer</Box>
        <Box>Email</Box>
      </Box>
    </Box>
  );
};





const PersonalInformation = ({
  handleEditProfileModalOpen,
}: PersonalInformationType) => {
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
          <DisplayValueWithLabel lable="First Name" value="Shivanshu" />
        </Grid>
        <Grid item lg={9} sm={6} xs={12}>
          <DisplayValueWithLabel lable="Last Name" value="Shivanshu" />
        </Grid>
        <Grid item lg={3} sm={6} xs={12}>
          <DisplayValueWithLabel lable="Email" value="Shivanshu" />
        </Grid>
        <Grid item lg={9} sm={6} xs={12}>
          <DisplayValueWithLabel lable="About Me" value="Shivanshu" />
        </Grid>
      </Grid>
    </Box>
  );
};

const WorkShowCase = ({handleOpenWorkShowCaseModalOpen}:WorkShowCaseFormType) => {
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
            value="Shivanshu"
            isUsedForNavigation={true}
          />
        </Grid>
        <Grid item lg={9} sm={6} xs={12}>
          <DisplayValueWithLabel
            lable="Resume"
            value="Shivanshu"
            isUsedForNavigation={true}
          />
        </Grid>
        <Grid item lg={3} sm={6} xs={12}>
          <DisplayValueWithLabel
            lable="Github"
            value="Shivanshu"
            isUsedForNavigation={true}
          />
        </Grid>
        <Grid item lg={9} sm={6} xs={12}>
          <DisplayValueWithLabel
            lable="Youtube"
            value="Shivanshu"
            isUsedForNavigation={true}
          />
        </Grid>
        <Grid item lg={3} sm={6} xs={12}>
          <DisplayValueWithLabel
            lable="Instagram"
            value="Shivanshu"
            isUsedForNavigation={true}
          />
        </Grid>
      </Grid>
    </Box>
  );
};


