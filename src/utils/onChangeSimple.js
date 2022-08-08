const onChangeSimple = (e, state, setState) => {
  const { type, name, value } = e.target;
  let val =
    type === "number" ? (parseInt(value) ? parseInt(value) : "") : value;
  setState({ ...state, [name]: val });
};

export default onChangeSimple;
