import React from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Accounting from "views/orders/Accounting";
import Contracts from "views/contract/Contracts";
import Inventory from "views/inventory/Inventory";
import Topbar from "views/topbar/Topbar";
import "react-toastify/dist/ReactToastify.css";
import "./utilities.sass";
import "./app.sass";
import Dashboard from "views/dashboard/Dashboard";
import Workers from "views/workers/Workers";
import Suppliers from "views/suppliers/Suppliers";

export default function App() {
  return (
    <div className="app" id="mine">
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={true}
        closeOnClick={true}
        pauseOnHover={true}
        draggable={true}
        progress={undefined}
      />
      <Topbar />
      <div className="main-view">
        <Routes>
          <Route path="/" element={<Inventory />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/orders" element={<Accounting />} />
          <Route path="/workers" element={<Workers />} />
          <Route path="/suppliers" element={<Suppliers />} />
          <Route path="/sub-contracts" element={<Contracts />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </div>
  );
}
