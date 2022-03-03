import { ChevronRightRounded, ChevronLeftRounded } from "@material-ui/icons";
import BtnComp from "components/btn-comp/BtnComp";
import InputComp from "components/input/InputComp";
import dayjs from "dayjs";
import React from "react";
import "./activity-date-range.sass";

const ActivityDateRange = ({ activeWeek, setActiveWeek }) => {
  const changeActiveWeek = (type) => {
    if (type === "next") {
      setActiveWeek(activeWeek.date(activeWeek.date() + 7));
    } else {
      setActiveWeek(activeWeek.date(activeWeek.date() - 7));
    }
  };
  return (
    <div className="activity-date-range">
      <ChevronLeftRounded
        className="icon-rounded clickable"
        onClick={() => changeActiveWeek("prev")}
      />
      <InputComp
        value={
          activeWeek.format("DD/MM/YY") +
          " - " +
          activeWeek.date(activeWeek.date() + 6).format("DD/MM/YY")
        }
      />
      <ChevronRightRounded
        className="icon-rounded clickable"
        onClick={() => changeActiveWeek("next")}
      />
    </div>
  );
};

export default ActivityDateRange;
