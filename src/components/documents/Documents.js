import { Grid, IconButton, Menu, MenuItem } from "@material-ui/core";
import { MoreVert } from "@material-ui/icons";
import BtnComp from "components/btn-comp/BtnComp";
import InputComp from "components/input/InputComp";
import React from "react";
import { docType } from "utils/enums";

const Documents = ({ documents }) => {
  const [newDoc, setNewDoc] = React.useState({});
  const [anchorEl, setAnchorEl] = React.useState(null);

  return (
    <div className="document-cont">
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <InputComp type="select" label="Doc Type" options={docType} />
        </Grid>
        <Grid item>
          <InputComp type="file" label="Document" />
        </Grid>
        <Grid item>
          <BtnComp label="Save Doc" onClick={() => {}} />
        </Grid>
      </Grid>
      {documents.length ? (
        documents.map((doc, index) => (
          <Grid
            container
            justifyContent="space-between"
            alignItems="center"
            key={index}
          >
            <Grid item>{doc.type}</Grid>
            <Grid item>{doc.name}</Grid>
            <Grid item>{doc.date}</Grid>
            <Grid item>
              <IconButton
                onClick={(e) => {
                  setAnchorEl(e.target);
                }}
              >
                <MoreVert className="" />
              </IconButton>
              <Menu
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={() => setAnchorEl(null)}
              >
                <MenuItem onClick={() => {}}>Download</MenuItem>
                <MenuItem onClick={() => {}}>Delete</MenuItem>
              </Menu>
            </Grid>
          </Grid>
        ))
      ) : (
        <p className="centered italic">No Documents</p>
      )}
    </div>
  );
};

export default Documents;
