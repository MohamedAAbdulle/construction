import React from "react";
import ContractForm from "./ContractForm";

const NewContract = ({ closeSlider }) => {
  let initialContract = {
    totalPrice: 0,
    conts: [],
  };
  return (
    <ContractForm
      closeSlider={closeSlider}
      formLabel="New Contract"
      initialContract={initialContract}
    />
  );
};

export default NewContract;
