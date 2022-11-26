import dayjs from "dayjs";
import React from "react";
import dateFormatter from "utils/dateFormatter";

const Accounting = () => {
  let a = "2022-11-24T20:57:04.351851";
  let format = "YYYY-MM-DDTHH:mm";
  return (
    <div>
      <h2 className="coming-soon">Accounting Coming Soon.....</h2>
      <p>{dateFormatter(a)}</p>
      <p>{dayjs(a).format(format)}</p>

      <p style={{ whiteSpace: "nowrap", fontSize: "15px" }}>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s.
      </p>
    </div>
  );
};

export default Accounting;
