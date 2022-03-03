import React from "react";
import "./btn-comp.sass";

const BtnComp = ({ label, onClick, size, type, icon }) => {
  return (
    <button onClick={onClick} className={`btn-comp ${size} ${type}`}>
      {icon}
      <span>{label}</span>
    </button>
  );
};

export default BtnComp;
