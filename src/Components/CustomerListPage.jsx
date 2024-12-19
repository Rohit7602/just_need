import React from "react";
import CustomerTable from "./CustomerTable";

function CustomerListPage({ mapData }) {
  return (
    <>
      <div className="p-5">
        <p className="font-medium text-[28px]">Customers List</p>
        <p className="font-normal text-base">
          Plan, prioritize, and accomplish your tasks with ease.
        </p>
      </div>
      <CustomerTable mapData={mapData} />
    </>
  );
}

export default CustomerListPage;
