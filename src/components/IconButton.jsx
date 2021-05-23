import React from "react";

const IconButton = ({ children, onClick }) => {
  return (
    <button className="w-full focus:outline-none h-full p-2 " onClick={onClick}>
      {children}
    </button>
  );
};

export default IconButton;
