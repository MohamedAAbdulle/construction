const findError = (type, errors) => {
  if (errors && errors[type]) {
    return errors[type][0];
  }
};

export default findError;
