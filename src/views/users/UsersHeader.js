import React from "react";
import BtnComp from "components/btn-comp/BtnComp";
import {
  CognitoIdentityProviderClient,
  AdminUpdateUserAttributesCommand,
} from "@aws-sdk/client-cognito-identity-provider";

const UsersHeader = () => {
  const onCall = () => {
    // a client can be shared by different commands.
    const client = new CognitoIdentityProviderClient({
      region: "ap-south-1",
      credentials: { accessKeyId: "dgs" },
    });

    const params = {
      /** input parameters */
    };
    const command = new AdminUpdateUserAttributesCommand(params);
    client
      .send(command)
      .then(
        (res) => {
          console.log(res);
        },
        (error) => {
          console.log(error?.response);
          console.log(error);
        }
      )
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center py-2">
        <div className="page-title">Users</div>

        <BtnComp label="New User" onClick={onCall} />
      </div>
      {/* {open && (
        <MiscForm
          getMiscs={getMiscs}
          closeModal={() => setOpen(false)}
          misc={{}}
        />
      )}
      {openCash && (
        <CashForm
          getMiscs={getMiscs}
          closeModal={() => setOpenCash(false)}
          misc={{}}
        />
      )} */}
    </div>
  );
};

export default UsersHeader;
