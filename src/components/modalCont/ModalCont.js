import React from "react";
import { Grid, IconButton, Modal } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import "./ModalCont.sass";
import BtnComp from "components/btn-comp/BtnComp";

const ModalCont = ({ open, onClose, onSave, title, children }) => {
  return (
    <Modal open={open}>
      <div className="modal-content">
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item style={{ fontSize: "19px", fontWeight: "bold" }}>
            {title && title}
          </Grid>
          <Grid item>
            <div className="d-flex align-items-center">
              {onSave && <BtnComp label="Save" size="sm" onClick={onSave} />}
              <IconButton color="inherit" onClick={onClose}>
                <Close />
              </IconButton>
            </div>
          </Grid>
        </Grid>
        {children}
      </div>
    </Modal>
  );
};

export default ModalCont;
