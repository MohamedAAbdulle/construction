import React from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Orders from "views/orders/Orders";
import Inventory from "views/inventory/Inventory";
import { AppContext } from "AppContext";
import "react-toastify/dist/ReactToastify.css";
import "assests/bootstrap-styles/bootstrap-styles.css";
import "./app.sass";
import Accounting from "views/accounting/Accounting";
import Workers from "views/workers/Workers";
import Suppliers from "views/suppliers/Suppliers";
import InUseTools from "views/tools/in-use-tools/InUseTools";
import Sidebar from "views/sidebar/Sidebar";
import Tools from "views/tools/Tools";
import ContractsNContractors from "views/contract/ContractsNContractors";
import Miscellaneous from "views/misc/Miscellaneous";
import Topbar from "views/topbar/Topbar";
import Setting from "views/setting/Setting";
import Users from "views/users/Users";

const AppContent = () => {
  const [aa, setAa] = React.useState(false);
  console.log(aa);
  let cachedJwt = JSON.parse(sessionStorage.getItem("cachedJwt"));
  let { given_name, "custom:userType": userType } = cachedJwt?.userInfo || {};
  const setSite = (id) => {
    let bb = {
      ...cachedJwt,
      userInfo: { ...cachedJwt.userInfo, "custom:customerId": id },
    };
    sessionStorage.setItem("aaa", "true");

    sessionStorage.setItem("cachedJwt", JSON.stringify(bb));
    //console.log(bb);
    setAa(true);
  };
  if (userType === "Admin" && !JSON.parse(sessionStorage.getItem("aaa"))) {
    return (
      <div className="fff">
        <h1>Welcome {given_name}</h1>
        <p>Choose a site.</p>
        <div className="mmm">
          <div onClick={() => setSite(4)} className="clickable">
            <div className="bbb"></div>
            <div>Demo</div>
          </div>
          <div onClick={() => setSite(2)} className="clickable">
            <div className="bbb clickable"></div>
            <div>Site 1</div>
          </div>
        </div>
      </div>
    );
  }

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
      <Sidebar />
      <div className="view-cont">
        <Topbar />
        <div className="main-view">
          <Routes>
            <Route path="/" element={<Inventory />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/workers" element={<Workers />} />
            <Route path="/suppliers" element={<Suppliers />} />
            <Route path="/sub-contracts" element={<ContractsNContractors />} />
            <Route path="/Accounting" element={<Accounting />} />
            <Route path="/miscellaneous" element={<Miscellaneous />} />
            <Route path="/tools" element={<Tools />} />
            <Route path="/tools-inuse" element={<InUseTools />} />
            <Route path="/setting" element={<Setting />} />
            <Route path="/users" element={<Users />} />
          </Routes>
        </div>
      </div>
    </AppContext>
  );
};

export default AppContent;
