import React from "react";
import ContractorForm from "./ContractorForm";

const NewContrator = ({ closeSlider }) => {
  let initialContract = {};
  return (
    <ContractorForm
      closeSlider={closeSlider}
      formLabel="New Contractor"
      initialContract={initialContract}
    />
  );
};

export default NewContrator;
