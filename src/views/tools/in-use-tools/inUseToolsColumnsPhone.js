const inUseToolsColumnsPhone = [
  {
    name: "Tool",
    selector: (row) => (
      <section>
        <div>{row.toolName}</div>
        <div>{row.amount}</div>
      </section>
    ),
  },
  {
    name: "Worker",
    selector: (row) => row.workerName,
  },

  {
    name: "Date Assigned",
    selector: (row) => {
      let [date, time] = row.dateAssigned.split(",");
      return (
        <section>
          <div>{date}</div>
          <div>{time}</div>
        </section>
      );
    },
  },
  {
    name: "",
    selector: (row) => row.actions,
    width: "40px",
  },
];

export default inUseToolsColumnsPhone;
