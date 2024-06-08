import {
  Autocomplete,
  Box,
  Checkbox,
  IconButton,
  Grid,
} from "@mui/material";
import "./MyProjects.css";
import {
  CheckBoxOutlineBlank,
  CheckBox,
  Close,
} from "@mui/icons-material";
import { useRef, useState } from "react";
import {  tech_used_array } from "./utils";
import { Formik } from "formik";
import {
  add_edit_project_initial_values,
  add_edit_project_schema,
} from "../../Components/FormsComp/InitialValues";
import {
  FormTextField,
  HiddenInput,
  UploadImageBox,
} from "../../Components/ProjectsComp/AddEditProjectModalComp/AddEditProjectModalComp";
import ProjectCard from "../../Components/ProjectsComp/Card/Card";
import DeleteModal from "../../Components/DeleteModal/DeleteModal";
import { GeneralModalParent } from "../../Components/GeneralModalParent/GeneralModalParent";
import { AddProjectButton, SubmitAndCancel } from "../../Components/FormsComp/SubmitAndCancel";

const icon = <CheckBoxOutlineBlank fontSize="small" />;
const checkedIcon = <CheckBox fontSize="small" />;

export const MyProjectsScreen = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const handleDeleteModalOpen = () => setIsDeleteModalOpen(true);
  const handleDeleteModalClose = () => setIsDeleteModalOpen(false);

  return (
    <Box>
      <DeleteModal
        isOpen={isDeleteModalOpen}
        closeModal={() => handleDeleteModalClose()}
      />
      <EditProjectModal isOpen={open} handleClose={handleClose} />
      <AddProjectButton handleOpen={handleOpen} buttonTitle="Project"/>
      <Box marginTop={"1rem"}>
        <CardsParentComponent handleDeleteModalOpen={handleDeleteModalOpen} />
      </Box>
    </Box>
  );
};

const CardsParentComponent = ({
  handleDeleteModalOpen,
}: CardParentCompType) => {
  const projects = [1, 1, 11, 1, 1, 1, 1];
  return (
    <Box>
      <Grid container justifyContent={"space-between"} spacing={4}>
        {projects.map((_projectData) => (
          <ProjectCard handleDeleteModalOpen={handleDeleteModalOpen} />
        ))}
      </Grid>
    </Box>
  );
};


function EditProjectModal({ isOpen, handleClose }: EditModalType) {
  const inputRef = useRef<null | HTMLInputElement>(null);
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
        initialValues={add_edit_project_initial_values}
        validationSchema={add_edit_project_schema}
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
            <SubmitAndCancel handleClose={handleClose} handleSubmit={handleSubmit}/>
          </Box>
        )}
      </Formik>
    </GeneralModalParent>
  );
}
