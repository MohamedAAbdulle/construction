import React from "react";
import { TextField, InputAdornment, MenuItem } from "@material-ui/core";
import { Search } from "@material-ui/icons";

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
  disabled,
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
    error: Boolean(error),
    required: required,
    helperText: error,
    disabled,
  };
  return (
    <>
      {type === "select" ? (
        <TextField {...a} select>
          <MenuItem></MenuItem>
          {options &&
            options.map((type, index) => (
              <MenuItem key={index} value={type.keyValue || type}>
                {type.keyName || type}
              </MenuItem>
            ))}
        </TextField>
      ) : type === "search" ? (
        <TextField
          {...a}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Search />
              </InputAdornment>
            ),
          }}
        />
      ) : type === "textarea" ? (
        <TextField
          {...a}
          inputProps={{ maxLength: 100 }}
          multiline={true}
          rows={2}
          InputProps={
            postfix && {
              endAdornment: (
                <InputAdornment position="end">{postfix}</InputAdornment>
              ),
            }
          }
        />
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
