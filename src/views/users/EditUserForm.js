import React from "react";
import { Grid } from "@material-ui/core";
import { putEndpoint } from "services/apiFunctions";
import onChangeSimple from "utils/onChangeSimple";
import ModalCont from "components/modalCont/ModalCont";
import InputComp from "components/input/InputComp";
import BtnComp from "components/btn-comp/BtnComp";
import getUserPoolId from "utils/getUserPoolId";
import { toast } from "react-toastify";

const EditUserForm = ({ closeModal, getUsers, state }) => {
  const [user, setUser] = React.useState(state);
  const [errors, setErrors] = React.useState({});
  const [attributes, setAttributes] = React.useState({});

  const changed = (e) => {
    const { name, value } = e.target;
    onChangeSimple(e, user, setUser);
    setAttributes({ ...attributes, [name]: value });
  };

  const checkAttributes = () => {
    let a = Object.keys(attributes);
    let b = a.filter((x) => attributes[x] !== state[x]);
    let c = b.map((x) => ({ name: x, value: attributes[x] }));
    return c;
  };
  const createUser = () => {
    const requestBody = {
      username: state.email,
      userPoolId: getUserPoolId(),
      userAttributes: checkAttributes(),
    };
    console.log(requestBody);
    if (requestBody.userAttributes.length) {
      putEndpoint(`/users`, requestBody).then((res) => {
        if (res && res.status === 200) {
          closeModal();
          getUsers();
        } else if (res && res.errors) {
          setErrors(res.errors);
        }
      });
    } else {
      toast.error("No field was edited");
    }
  };
  const findError = (type) => {
    if (errors[type]) {
      return errors[type][0];
    }
  };
  return (
    <>
      <ModalCont open={true} onClose={closeModal} title="Edit User">
        <Grid
          container
          alignItems="center"
          justifyContent="space-between"
          spacing={3}
        >
          <Grid item xs={12} md={6}>
            <InputComp
              onChange={changed}
              value={user.given_name}
              name="given_name"
              label="First Name"
              required
              error={findError("given_name")}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <InputComp
              onChange={changed}
              value={user.middle_name}
              name="middle_name"
              label="Middle Name"
              required
              error={findError("middle_name")}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <InputComp
              onChange={changed}
              value={user.family_name}
              name="family_name"
              label="Last Name"
              required
              error={findError("family_name")}
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

export default EditUserForm;
