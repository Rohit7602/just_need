import React from "react";
import CustomerTable from "./CustomerTable";

function CustomerListPage({ mapData }) {
  return (
    <>
      <div className="p-[15px]">
        <p className="font-medium text-[28px]">Customers List</p>
        <p className="font-normal text-base opacity-[70%] mb-[15px]">
          Plan, prioritize, and accomplish your tasks with ease.
        </p>
        <CustomerTable mapData={mapData} />
      </div>
    </>
  );
}

export default CustomerListPage;
