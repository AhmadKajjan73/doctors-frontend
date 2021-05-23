import React from "react";

const AddTag = ({ children }) => {
  return (
    <div className="fixed inset-0 z-50 overflow-auto flex bg-secondary bg-opacity-50">
      <div className="relative p-12 bg-white w-auto max-w-md m-auto flex-col flex rounded-lg shadow-lg">
        <div>{children}</div>
      </div>
    </div>
  );
};

export default AddTag;
