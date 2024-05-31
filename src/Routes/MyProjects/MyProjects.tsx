import { Autocomplete, Box, Button, Modal, TextField } from "@mui/material";
import "./MyProjects.css";
import { AddCircleOutline, CloudUpload } from "@mui/icons-material";
import { useState } from "react";
import { style, tech_used_array } from "./utils";

export const MyProjectsScreen = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box>
      <EditProjectModal isOpen={open} handleClose={handleClose} />
      <AddProjectButton handleOpen={handleOpen} />
    </Box>
  );
};

const AddProjectButton = ({ handleOpen }: AddProjectButtonParent) => {
  return (
    <Box className="addButtonParent">
      <Button
        onClick={handleOpen}
        variant="outlined"
        startIcon={<AddCircleOutline />}
        size="large"
        style={{ textTransform: "none" }}
      >
        Add New Project
      </Button>
    </Box>
  );
};

function EditProjectModal({ isOpen, handleClose }: EditModalType) {
  return (
    <div>
      <Modal open={isOpen} onClose={handleClose}>
        <Box sx={style}>
          <Box className="global_uniform_vertical_style">
            <Box>Add Project</Box>
            <Box className="image_uplaod global_center_style">
              <CloudUpload style={{ color: "#1976D2" }} />
            </Box>
            <TextField
              variant="outlined"
              placeholder="Title"
              autoComplete="off"
              label="Title"
            />
            <TextField
              variant="outlined"
              placeholder="Description"
              multiline
              minRows={4}
              autoComplete="off"
              label="Description"
            />
            <TextField
              variant="outlined"
              placeholder="Demo Link"
              autoComplete="off"
              label="Demo Link"
            />
            <TextField
              variant="outlined"
              placeholder="Code Link"
              autoComplete="off"
              label="Code Link"
            />

            <Autocomplete
              multiple
              options={tech_used_array}
              getOptionLabel={(option) => option}
              defaultValue={[]}
              filterSelectedOptions
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Add Tech Used"
                  placeholder="Favorites"
                  variant="outlined"
                />
              )}
            />

            <Button variant="contained" size="large">
              Add
            </Button>
            <Button variant="outlined" size="large" onClick={handleClose}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
