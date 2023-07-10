import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import ModalCont from "components/modalCont/ModalCont";
import React from "react";

const DocPreviewer = ({ fileName, closeModal }) => {
  const docs = [
    {
      uri: `https://localhost:5001/documents?fileName=${fileName}`,
    },
  ];
  const LoadingRenderer = () => {
    return (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {
          // <Loading />
        }
      </div>
    );
  };

  const headerSetup = () => {
    let cachedJwt = JSON.parse(sessionStorage.getItem("cachedJwt"));
    let userInfo = (cachedJwt || {}).userInfo;
    const customerId = (userInfo || {})["custom:customerId"] || 0;
    return {
      accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      customerId,
      userId: customerId,
    };
  };
  return (
    <ModalCont open={true} onClose={closeModal} title={"Document Preview"}>
      <div>
        <DocViewer
          style={{
            width: "100%",
            height: "70vh",
            backgroundColor: "#e2e6ea",
          }}
          documents={docs}
          pluginRenderers={DocViewerRenderers}
          prefetchMethod="GET"
          requestHeaders={headerSetup()}
          config={{
            loadingRenderer: {
              overrideComponent: LoadingRenderer,
            },
            header: { disableHeader: true, disableFileName: true },
            pdfZoom: {
              defaultZoom: 1.1, // 1 as default,
              zoomJump: 0.2, // 0.1 as default,
            },
          }}
        />
      </div>
    </ModalCont>
  );
};

export default DocPreviewer;
