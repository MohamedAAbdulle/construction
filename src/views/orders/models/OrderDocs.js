import BtnComp from "components/btn-comp/BtnComp";
import DocumentsComp from "components/documents/DocumentsComp";
import ModalCont from "components/modalCont/ModalCont";
import React from "react";
import { putEndpoint } from "services/apiFunctions";

const OrderDocs = ({ order, closeModal }) => {
  const [docs, setDocs] = React.useState();

  const onSave = () => {
    const formState = new FormData();
    if (docs && docs.length) {
      let a = true;
      docs.forEach((doc) => {
        if (doc.status === "Created") {
          a
            ? formState.set("files", doc.fileData, doc.fileName)
            : formState.append("files", doc.fileData, doc.fileName);
          a = false;
        }
      });
    }
    formState.set("docsJson", JSON.stringify(docs || []));
    putEndpoint(`/orders/docs/${order.id}`, formState).then((res) => {
      if (res && res.status === 200) {
        closeModal();
        //getAccounts();
      } else if (res && res.errors) {
        //setErrors(res.errors);
      }
    });
  };
  return (
    <ModalCont open={true} onClose={closeModal} title={"Order Documents"}>
      <DocumentsComp
        docs={docs}
        setDocs={setDocs}
        url={`/orders/${order.id}/docs`}
        id={order.id}
      />
      <div className="modal-btns">
        <BtnComp label="Save" onClick={onSave} />
      </div>
    </ModalCont>
  );
};

export default OrderDocs;
