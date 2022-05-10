import React from "react";
import { Grid, IconButton, Menu, MenuItem } from "@material-ui/core";
import { HiDownload } from "react-icons/hi";
import { Add, Delete } from "@material-ui/icons";
import NewDocument from "./NewDocument";
import "./documents-comp.sass";
import dayjs from "dayjs";
import { getEndpoint } from "services/apiFunctions";
import BtnComp from "components/btn-comp/BtnComp";
import classNames from "classnames";

const DocumentsComp = ({ docs, addFile, setDocs }) => {
  const [newDoc, setNewDoc] = React.useState(false);

  const downloadDoc = (fileName) => {
    
    getEndpoint(`/documents?fileName=${fileName}`, "blob").then((r) => {
      let x = new Blob([r]);
      const url = window.URL.createObjectURL(x);
      console.log(r.type);
      let fileType = r.type.substring(r.type.lastIndexOf("/") + 1);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `file.${fileType || "pdf"}`);
      document.body.appendChild(link);
      link.click();
    });
  };
  const deleteDoc = (id) => {
    setDocs((prev) => {
      let cc = [...prev];
      let a = cc.find((d) => d.id === id);
      a.status = "Deleted";
      return cc;
    });
  };
  const restoreDoc = (id) => {
    setDocs((prev) => {
      let cc = [...prev];
      let a = cc.find((d) => d.id === id);
      delete a.status;
      return cc;
    });
  };
  const cancelAddDoc = (index) => {
    setDocs((prev) => {
      let cc = [...prev];
      cc.splice(index, 1);

      return cc;
    });
  };
  return (
    <div className="card-comp doc-comp">
      <div className="card-title">
        Documents
        <IconButton onClick={() => setNewDoc(true)}>
          <Add />
        </IconButton>
      </div>
      {docs.length ? (
        <div>
          {docs.map((file, index) => (
            <Grid
              container
              justifyContent="space-between"
              alignItems="center"
              spacing={2}
              className={`file-record ${file.status}`}
              key={index}
            >
              <Grid item xs={4}>
                {file.fileName}
              </Grid>
              <Grid item xs={2}>
                {file.fileType}
              </Grid>
              <Grid item xs={3}>
                {dayjs(file.dateCreated).format("DD MMM 'YY, HH:mm")}
              </Grid>
              <Grid item xs={3}>
                {file.status === "Deleted" ? (
                  <BtnComp
                    label="Restore"
                    onClick={() => restoreDoc(file.id)}
                    size="sm"
                  />
                ) : file.status === "Created" ? (
                  <BtnComp
                    label="Cancel"
                    onClick={() => cancelAddDoc(index)}
                    size="sm"
                  />
                ) : (
                  <>
                    <IconButton onClick={() => downloadDoc(file.fileName)}>
                      <HiDownload />
                    </IconButton>
                    <IconButton onClick={() => deleteDoc(file.id)}>
                      <Delete className="negative-action" />
                    </IconButton>
                  </>
                )}
              </Grid>
            </Grid>
          ))}
        </div>
      ) : (
        <div className="no-doc">No Documents</div>
      )}

      {newDoc && (
        <NewDocument onClose={() => setNewDoc(false)} addFile={addFile} />
      )}
    </div>
  );
};

export default DocumentsComp;
