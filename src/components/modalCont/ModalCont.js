import React from "react";
import { Grid, IconButton, Modal } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import "./ModalCont.sass";

const NewInventory = ({ open, onClose, title, children }) => {
  return (
    <Modal open={open}>
      <div className="modal-content">
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item style={{ fontSize: "19px", fontWeight: "bold" }}>
            {title && title}
          </Grid>
          <Grid item>
            <IconButton color="inherit" onClick={onClose}>
              <Close />
            </IconButton>
          </Grid>
        </Grid>
        {children}
      </div>
    </Modal>
  );
};

export default NewInventory;
