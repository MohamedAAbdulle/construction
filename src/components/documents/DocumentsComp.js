import React from "react";
import { Grid, IconButton /* , Menu, MenuItem */ } from "@material-ui/core";
import { HiDownload } from "react-icons/hi";
import { Delete } from "@material-ui/icons";
import NewDocument from "./NewDocument";
import "./documents-comp.sass";
import dayjs from "dayjs";
import {
  deleteEndpoint,
  getEndpoint,
  postEndpoint,
} from "services/apiFunctions";
import BtnComp from "components/btn-comp/BtnComp";
//import classNames from "classnames";
import fetchStatus from "components/fetch-status/fetchStatus";
import DocPreviewer from "./DocPreviewer";
import { FiEdit } from "react-icons/fi";

const DocumentsComp = ({ docs, setDocs, url, id }) => {
  const [newDoc, setNewDoc] = React.useState(false);
  const [openPreview, setOpenPreview] = React.useState(false);

  const downloadDoc = (fileName) => {
    getEndpoint(`/documents?fileName=${fileName}`, "blob").then((r) => {
      let x = new Blob([r]);
      const url = window.URL.createObjectURL(x);
      console.log(r.type);
      console.log(url);
      let fileType = r.type.substring(r.type.lastIndexOf("/") + 1);
      const link = document.createElement("a");
      link.href = url;
      console.log(fileType);
      link.setAttribute("download", `file.${fileType || "pdf"}`);
      document.body.appendChild(link);
      link.click();
    });
  };

  const addFile = (doc) => {
    setDocs([...docs, doc]);
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

  const createDoc = (doc) => {
    if (doc.fileData && doc.fileType) {
      const formState = new FormData();

      formState.set("file", doc.fileData, doc.fileName);
      formState.set("docsInfo", JSON.stringify(doc));
      console.log(formState);
      postEndpoint(`/Documents/${id}`, formState).then((res) => {
        if (res && res.status === 200) {
          setNewDoc(false);
          //getAccounts();
        } else if (res && res.errors) {
          console.log(res.errors);
          //setErrors(res.errors);
        }
      });
    }
  };

  const removeDoc = (file) => {
    console.log(file);
    deleteEndpoint(`/Documents/${file.id}?fileName=${file.fileName}`).then(
      (res) => {
        if (res && res.status === 200) {
          getDocs();
        }
      }
    );
  };

  const getDocs = () => {
    if (url) {
      getEndpoint(url).then((res) => setDocs(res));
    }
  };

  React.useEffect(getDocs, []);
  return (
    <div className=" doc-comp">
      {fetchStatus(
        docs,
        () => (
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
                <Grid item xs={1}>
                  {file.fileType}
                </Grid>
                <Grid item xs={3}>
                  {dayjs(file.dateCreated).format("DD MMM 'YY, HH:mm")}
                </Grid>
                <Grid item xs={4}>
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
                      <IconButton
                        onClick={() => {
                          downloadDoc(file.fileName);
                        }}
                      >
                        <HiDownload />
                      </IconButton>
                      <IconButton
                        onClick={() => {
                          setOpenPreview(file.fileName);
                        }}
                      >
                        <FiEdit />
                      </IconButton>
                      <IconButton
                        onClick={() => {
                          removeDoc(file);
                          //deleteDoc(file.id);
                        }}
                      >
                        <Delete className="negative-action" />
                      </IconButton>
                    </>
                  )}
                </Grid>
              </Grid>
            ))}
          </div>
        ),
        "No Documents"
      )}

      <p className="link-like text-center " onClick={() => setNewDoc(true)}>
        Add Document
      </p>

      {newDoc && (
        <NewDocument
          onClose={() => setNewDoc(false)}
          createDoc={createDoc}
          addFile={addFile}
        />
      )}
      {openPreview && (
        <DocPreviewer
          fileName={openPreview}
          closeModal={() => setOpenPreview(false)}
        />
      )}
    </div>
  );
};

export default DocumentsComp;
