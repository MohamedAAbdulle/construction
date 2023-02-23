import { ChevronRightRounded, ChevronLeftRounded } from "@material-ui/icons";
import InputComp from "components/input/InputComp";
import React from "react";
import { workerContext } from "views/workers/WorkerContext";

const ActivityDateRange = () => {
  const { activeWeek, setActiveWeek } = React.useContext(workerContext);

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
      <InputComp value={activeWeek.format("DD MMM")} />
      <ChevronRightRounded
        className="icon-rounded clickable"
        onClick={() => changeActiveWeek("next")}
      />
    </div>
  );
};

export default ActivityDateRange;
