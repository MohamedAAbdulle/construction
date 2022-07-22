import React from "react";
import { getEndpoint } from "services/apiFunctions";
import ContractForm from "./ContractForm";

const EditContract = ({ closeSlider, open }) => {
  let dummyItems = [
    {
      id: 3,
      title: "Kings 1st floor",
      price: 150,
      status: "Inprogress",
      startDate: "2022-06-15",
      endDate: "2022-07-21T09:18:00",
    },
    {
      id: 2,
      title: "Kings 2nd floor",
      price: 300,
      status: "Inprogress",
      startDate: "2022-02-06",
      endDate: "2022-05-19T09:18:00",
    },
    {
      id: 3,
      title: "Slabs 1st floor",
      price: 200,
      status: "Completed",
      startDate: "2022-01-06",
      endDate: "2022-02-19T09:18:00",
    },
  ];
  const [state, setState] = React.useState({ ...open });
  const getContractItems = () =>
    getEndpoint("/inventory").then((res) => {
      //console.log(res);
      setState({ ...state, conts: dummyItems });
    });
  React.useEffect(getContractItems, []);
  return (
    <>
      <ContractForm
        closeSlider={closeSlider}
        formLabel="Edit Contract"
        initialContract={state}
      />
    </>
  );
};

export default EditContract;
