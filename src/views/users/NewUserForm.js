import React from "react";
import { Grid } from "@material-ui/core";
import { postEndpoint } from "services/apiFunctions";
import onChangeSimple from "utils/onChangeSimple";
import ModalCont from "components/modalCont/ModalCont";
import InputComp from "components/input/InputComp";
import BtnComp from "components/btn-comp/BtnComp";
import getUserPoolId from "utils/getUserPoolId";

const NewUserForm = ({ closeModal, getUsers }) => {
  const [user, setUser] = React.useState({
    username: "",
    password: "Password123",
    userPoolId: getUserPoolId(),
    attributes: [{ name: "middle_name", value: "hellow" }],
  });
  const [errors, setErrors] = React.useState({});

  const changed = (e) => {
    onChangeSimple(e, user, setUser);
  };

  const createUser = () => {
    postEndpoint(`/users`, user).then((res) => {
      if (res && res.status === 200) {
        closeModal();
        getUsers();
      } else if (res && res.errors) {
        setErrors(res.errors);
      }
    });
  };
  const findError = (type) => {
    if (errors[type]) {
      return errors[type][0];
    }
  };

  return (
    <>
      <ModalCont open={true} onClose={closeModal} title="New User">
        <Grid
          container
          alignItems="center"
          justifyContent="space-between"
          spacing={3}
        >
          <Grid item xs={12} md={6}>
            <InputComp
              onChange={changed}
              value={user.username}
              name="username"
              label="User Email"
              required
              error={findError("Username")}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <InputComp
              onChange={changed}
              value={user.password}
              name="password"
              error={findError("Password")}
              label="Temporary Password"
            />
          </Grid>
        </Grid>

        <div className="modal-btns">
          <BtnComp label="Save" onClick={createUser} />
        </div>
      </ModalCont>
    </>
  );
};

export default NewUserForm;
