import React from "react";
import { TextField, InputAdornment, MenuItem } from "@material-ui/core";

const InputComp = ({
  type,
  onChange,
  postfix,
  value,
  name,
  label,
  placeholder,
  error,
  required,
  options,
}) => {
  let a = {
    variant: "outlined",
    size: "small",
    type: type,
    label: label,
    name: name,
    value: value,
    placeholder: placeholder,
    InputLabelProps: { shrink: true },
    onChange: onChange,
    error: error,
    required: required,
  };
  return (
    <>
      {type === "select" ? (
        <TextField {...a} select>
          <MenuItem></MenuItem>
          {options.map((type, index) => (
            <MenuItem key={index} value={type.keyValue || type}>
              {type.keyName || type}
            </MenuItem>
          ))}
        </TextField>
      ) : (
        <TextField
          {...a}
          //InputLabelProps={{ shrink: true }}
          InputProps={
            postfix && {
              endAdornment: (
                <InputAdornment position="end">{postfix}</InputAdornment>
              ),
            }
          }
        />
      )}
    </>
  );
};

export default InputComp;
