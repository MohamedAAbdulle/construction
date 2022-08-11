import React from "react";
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
