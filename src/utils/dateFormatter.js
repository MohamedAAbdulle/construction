export const dateReadable = (isoDate, whatToReturn = "both") => {
  if (isoDate) {
    let formattedDate = new Date(isoDate);
    let dateString = formattedDate.toString().split(" ");
    let date = [dateString[1], dateString[2] /* , dateString[3] */].join(" ");
    let time = dateString[4].slice(0, -3);
    switch (whatToReturn) {
      case "date":
        return date;
      case "time":
        return `${time}`;
      case "both":
      default:
        return `${date}, ${time}`;
    }
  } else {
    return "";
  }
};
