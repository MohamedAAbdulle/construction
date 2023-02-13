const onChangeSimple = (e, state, setState) => {
  const { type, name, value } = e.target;
  let val = value;
  if (type === "number") {
    //console.log(value);
    if (value === "") val = null;
    else {
      val = parseInt(value);
    }
    //console.log(val);
  }
  setState({ ...state, [name]: val });
};

export default onChangeSimple;
