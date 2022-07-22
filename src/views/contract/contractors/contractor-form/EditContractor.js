import React from "react";
import { getEndpoint } from "services/apiFunctions";
import ContractForm from "./ContractForm";

const EditContrator = ({ closeSlider, open }) => {
  return (
    <>
      <ContractForm
        closeSlider={closeSlider}
        formLabel="Edit Contractor"
        initialContract={open}
      />
    </>
  );
};

export default EditContrator;
