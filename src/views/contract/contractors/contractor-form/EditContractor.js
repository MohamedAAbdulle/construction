import React from "react";
import { getEndpoint } from "services/apiFunctions";
import ContractorForm from "./ContractorForm";

const EditContrator = ({ closeSlider, open }) => {
  return (
    <>
      <ContractorForm
        closeSlider={closeSlider}
        formLabel="Edit Contractor"
        initialContract={open}
      />
    </>
  );
};

export default EditContrator;
