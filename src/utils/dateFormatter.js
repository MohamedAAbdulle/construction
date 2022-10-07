import dayjs from "dayjs";

const dateFormatter = (date, format, ignoreUTC) => {
  format = format ? format : "YYYY-MM-DDTHH:mm";
  let a = new Date(date);

  if (a.getDate()) {
    if (ignoreUTC === true) {
      date = date.toLowerCase().replace("z", "");
    }
    return dayjs(date).format(format);
  } else return "";
};

export const dateFormatter2 = (date, format) => {
  format = format ? format : "YYYY-MM-DDTHH:mm";
  let a = new Date(date);

  if (a.getDate()) {
    let aa = dayjs(date).format("YYYY-MM-DDTHH:mm");
    aa = aa + "Z";
    return dayjs(aa).format(format);
  } else return "";
};
export default dateFormatter;
