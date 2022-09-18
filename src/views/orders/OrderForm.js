import React from "react";
import { Grid, IconButton } from "@material-ui/core";
import dayjs from "dayjs";
import { postEndpoint, putEndpoint } from "services/apiFunctions";
import onChangeSimple from "utils/onChangeSimple";
import InputComp from "components/input/InputComp";
import BtnComp from "components/btn-comp/BtnComp";
import { accountingContx } from "./AccountingContx";
import { Close } from "@material-ui/icons";
import Inventorysearcher from "components/searchers/InventorySearcher";
import SupplierSearcher from "components/searchers/SupplierSearcher";
import findError from "utils/findError";

const OrderForm = ({ closeSlider, order }) => {
  const { getAccounts } = React.useContext(accountingContx);

  const [state, setState] = React.useState({
    ...order,
    dateDone: dayjs().format("YYYY-MM-DDTHH:mm"),
  });

  const [errors, setErrors] = React.useState({});

  const changed = (e) => {
    onChangeSimple(e, state, setState);
  };

  const onSave = () => {
    let endPoint;
    if (order.id) {
      endPoint = putEndpoint(`/orders/${state.id}`, state);
    } else {
      endPoint = postEndpoint(`/orders`, state);
    }
    endPoint.then((res) => {
      if (res && res.status === 200) {
        closeSlider();
        getAccounts();
      } else if (res && res.errors) {
        setErrors(res.errors);
      }
    });
  };

  const _findError = (type) => {
    findError(type, errors);
  };

  return (
    <div className="order-form">
      <div className="slider-header">
        <Grid container justifyContent="space-between" align-items="center">
          <Grid item>Order Form</Grid>
          <Grid item>
            <div style={{ display: "flex", alignItems: "center" }}>
              <BtnComp label="Save" onClick={onSave} />
              <IconButton onClick={closeSlider}>
                <Close className="negative-action" />
              </IconButton>
            </div>
          </Grid>
        </Grid>
      </div>
      <div className="slider-body">
        <div className="card-comp">
          <div className="card-title">Order Info</div>

          <Grid
            container
            justifyContent="space-between"
            align-items="center"
            spacing={3}
          >
            <Grid item xs={12} sm={6}>
              <Inventorysearcher
                value={order.inventoryName}
                onAction={(inv) =>
                  changed({
                    target: {
                      value: inv.id,
                      name: "inventoryId",
                      type: "number",
                    },
                  })
                }
                error={_findError("InventoryId")}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <SupplierSearcher
                value={order.supplierName}
                onAction={(supplier) =>
                  changed({
                    target: {
                      value: supplier.id,
                      name: "supplierId",
                      type: "number",
                    },
                  })
                }
                error={_findError("SupplierId")}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputComp
                label="Total Quantity"
                type="number"
                name="quantity"
                onChange={changed}
                value={state.quantity}
                error={_findError("Quantity")}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputComp
                label="Price"
                type="number"
                name="price"
                onChange={changed}
                value={state.price}
                error={_findError("Price")}
              />
            </Grid>
            {/* <Grid item xs={12} sm={6}>
              <InputComp
                label="Delivered Amount"
                type="number"
                name="delivered"
                onChange={changed}
                value={state.delivered}
                error={findError("Delivered")}
              />
            </Grid> */}
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default OrderForm;
