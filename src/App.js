import React from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Accounting from "views/orders/Accounting";
import Inventory from "views/inventory/Inventory";
import { AppContext } from "AppContext";
import "react-toastify/dist/ReactToastify.css";
import "./app.sass";
import "assests/bootstrap-helpers/bootstrap-helpers.css";
import "./utilities.sass";
import Dashboard from "views/dashboard/Dashboard";
import Workers from "views/workers/Workers";
import Suppliers from "views/suppliers/Suppliers";
import InUseTools from "views/tools/in-use-tools/InUseTools";
import Sidebar from "views/sidebar/Sidebar";
import Tools from "views/tools/Tools";
import { CircularProgress } from "@material-ui/core";
import { checkJwtStatus, getAccessToken, redirectToLogin } from "services/auth";
import ContractsNContractors from "views/contract/ContractsNContractors";

export default function App() {
  const [appContent, setAppContent] = React.useState(<CircularProgress />);

  const setUp = async () => {
    const status = checkJwtStatus();
    if (status === "VALID") {
      setAppContent(<AppAuthorized />);

      //} else if (status === "EXPIRED" || status === "MISSING") {
      //handle REFRESH separately
    } else {
      var urlParams = new URLSearchParams(window.location.search);
      var code = urlParams.get("code");
      if (!code) {
        redirectToLogin();
      } else {
        await getAccessToken()
          .then(() => {
            setAppContent(<AppAuthorized />);
          })
          .catch(() => {
            setAppContent(<p>Failed to load</p>);
          });
      }
    }
  };
  React.useEffect(() => {
    setUp();
  }, []);
  const AppAuthorized = () => {
    return (
      <AppContext>
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={true}
          closeOnClick={true}
          pauseOnHover={true}
          draggable={true}
          progress={undefined}
        />
        {/* <Topbar /> */}
        <Sidebar />
        <div className="main-view">
          <Routes>
            <Route path="/" element={<Inventory />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/orders" element={<Accounting />} />
            <Route path="/workers" element={<Workers />} />
            <Route path="/suppliers" element={<Suppliers />} />
            <Route path="/sub-contracts" element={<ContractsNContractors />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/tools" element={<Tools />} />
            <Route path="/tools-inuse" element={<InUseTools />} />
          </Routes>
        </div>
      </AppContext>
    );
  };
  return (
    <div className="app" id="mine">
      {appContent}
    </div>
  );
}
