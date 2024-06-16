import { Formik } from "formik";
import { GeneralModalParent } from "../GeneralModalParent/GeneralModalParent";
import { edit_profile_form_initial_values, edit_profile_form_validation_schema, showcaseFormValidationSchema, showcase_form_initial_values } from "../FormsComp/InitialValues";
import { Avatar, Box, IconButton } from "@mui/material";
import { SubmitAndCancel } from "../FormsComp/SubmitAndCancel";
import { FormTextField, HiddenInput } from "../ProjectsComp/AddEditProjectModalComp/AddEditProjectModalComp";
import { useRef } from "react";
import { Close, Edit } from "@mui/icons-material";

const EditProfileForm = ({updateProfileData, isOpen, handleClose,profileFormInitialValues=edit_profile_form_initial_values }: ModalOpenAndCloseTypes & ProfileDisplaySectionType & EditProfileFormType) => {

    return (
      <GeneralModalParent handleClose={handleClose} isOpen={isOpen}>
        <Formik
          initialValues={profileFormInitialValues}
          validationSchema={edit_profile_form_validation_schema}
          onSubmit={(values) => {
            updateProfileData(values);
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
            <>
              <Box className="global_uniform_vertical_style">
                <Box>Edit Personal Information</Box>
                <Box className="global_center_style">
                  <ProfilePictureEditAvatar
                    setFieldValue={setFieldValue}
                    profile_picture={values.profile_picture}
                  />
                  {touched.profile_picture && errors.profile_picture && (
                    <Box className="global_error_text">
                      {errors.profile_picture}
                    </Box>
                  )}
                </Box>
                <FormTextField
                  placeholder="First Name"
                  label="First Name"
                  value={values.first_name}
                  name="first_name"
                  onChange={handleChange}
                  error={(errors.first_name && touched.first_name) as boolean}
                  helperText={touched.first_name && errors.first_name}
                  fullWidth
                />
                <FormTextField
                  placeholder="Last Name"
                  label="Last Name"
                  value={values.last_name}
                  name="last_name"
                  onChange={handleChange}
                  error={(errors.last_name && touched.last_name) as boolean}
                  helperText={touched.last_name && errors.last_name}
                />
                <FormTextField
                  placeholder="Email"
                  label="Email"
                  value={values.email}
                  name="email"
                  onChange={handleChange}
                  error={(errors.email && touched.email) as boolean}
                  helperText={touched.email && errors.email}
                />
                <FormTextField
                  placeholder="About"
                  label="About"
                  multiline
                  minRows={4}
                  value={values.about}
                  name="about"
                  onChange={handleChange}
                  error={(errors.about && touched.about) as boolean}
                  helperText={touched.about && errors.about}
                />
                <SubmitAndCancel
                  handleClose={handleClose}
                  handleSubmit={handleSubmit}
                />
              </Box>
            </>
          )}
        </Formik>
      </GeneralModalParent>
    );
  };


  const ProfilePictureEditAvatar = ({
  setFieldValue,
  profile_picture,
}: ProfilePictureEditAvatarType) => {
  const inputRef = useRef<null | HTMLInputElement>(null);
  const profileHandle = () =>
    typeof profile_picture === "string"
      ? profile_picture
      : URL.createObjectURL(profile_picture as File);
  const profile_link = profile_picture === null ? undefined : profileHandle();
  const is_some_picture_selected = profile_picture !== null;

  const handleBoxClick = () => {
    if (profile_picture !== null) {
      setFieldValue("profile_picture", null);
    } else {
      if (inputRef.current) {
        inputRef.current.click();
      }
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setFieldValue("profile_picture", file);
      event.target.value = "";
    }
  };

  return (
    <Box className="profile_picture_edit_avatar" position={"relative"}>
      <IconButton className="profile_pic_pen_icon" onClick={handleBoxClick}>
        <IconHandler isSelected={is_some_picture_selected} />
      </IconButton>
      <Avatar style={{ width: "100%", height: "100%" }} src={profile_link} />
      <HiddenInput
        inputRef={inputRef}
        handleFileChange={(event) => handleFileChange(event)}
      />
    </Box>
  );
};


const IconHandler = ({ isSelected }: { isSelected: boolean }) => {
    return <>{isSelected ? <Close /> : <Edit color="secondary" />}</>;
  };


  const EditWorkShowCaseForm = ({updateProfileData, isOpen, handleClose,workShowCaseData =  showcase_form_initial_values}: ModalOpenAndCloseTypes & EditWorkShowCaseFormType) => {
    return (
      <GeneralModalParent handleClose={handleClose} isOpen={isOpen}>
        <Formik
          initialValues={workShowCaseData}
          validationSchema={showcaseFormValidationSchema}
          onSubmit={(values) => {
            updateProfileData(values)
          }}
          validateOnChange
          validateOnBlur
          enableReinitialize
        >
          {({
            values,
            handleChange,
            handleSubmit,
            errors,
            touched,
          }) => (
            <>
              <Box className="global_uniform_vertical_style">
                <Box>Edit Work Showcase Links</Box>
                <FormTextField
                  placeholder="Linked In"
                  label="Linked In"
                  value={values.linked_in}
                  name="linked_in"
                  onChange={handleChange}
                  error={(errors.linked_in && touched.linked_in) as boolean}
                  helperText={touched.linked_in && errors.linked_in}
                  fullWidth
                />
                <FormTextField
                  placeholder="Github"
                  label="Github"
                  value={values.github}
                  name="github"
                  onChange={handleChange}
                  error={(errors.github && touched.github) as boolean}
                  helperText={touched.github && errors.github}
                />
                <FormTextField
                  placeholder="Resume"
                  label="Resume"
                  value={values.resume}
                  name="resume"
                  onChange={handleChange}
                  error={(errors.resume && touched.resume) as boolean}
                  helperText={touched.resume && errors.resume}
                />
                <FormTextField
                  placeholder="Instagram"
                  label="Instagram(Optional)"
                  value={values.instagram}
                  name="instagram"
                  onChange={handleChange}
                  error={(errors.instagram && touched.instagram) as boolean}
                  helperText={touched.instagram && errors.instagram}
                />
                <FormTextField
                  placeholder="Youtube"
                  label="Youtube(Optional)"
                  value={values.youtube}
                  name="youtube"
                  onChange={handleChange}
                  error={(errors.youtube && touched.youtube) as boolean}
                  helperText={touched.youtube && errors.youtube}
                />
                <SubmitAndCancel
                  handleClose={handleClose}
                  handleSubmit={handleSubmit}
                />
              </Box>
            </>
          )}
        </Formik>
      </GeneralModalParent>
    );
  };
  

export {EditProfileForm,EditWorkShowCaseForm}