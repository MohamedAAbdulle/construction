import dayjs from "dayjs";

const dateFormatter = (date, format, ignoreUTC) => {
  format = format ? format : "YYYY-MM-DDTHH:mm";
  let a = new Date(date);

  if (a.getDate()) {
    if (ignoreUTC === true) {
      date = date.toLowerCase().replace("z", "");
    } //delete this when utc are distinquishable
    else {
      date = date.toLowerCase().replace("z", "");
      date = date + "z";
    }
    return dayjs(date).format(format);
  } else return "";
};

export const dateFormatter2 = (date, format, ignoreUTC) => {
  format = format ? format : "YYYY-MM-DDTHH:mm";
  let a = new Date(date);

  if (a.getDate()) {
    if (ignoreUTC === true) {
      date = date.toLowerCase().replace("z", "");
    } //delete this when utc are distinquishable
    else {
      date = date.toLowerCase().replace("z", "");
      date = date + "z";
    }
    return dayjs(date).format(format);
  } else return "";
};
export default dateFormatter;
