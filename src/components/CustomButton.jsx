import React from "react";

import { RingLoader } from "react-spinners";

const CustomButton = (props) => {
  const { children, type, onClick, loading = false, color } = props;
  return (
    <div>
      {loading ? (
        <RingLoader loading={true} color={color} size="30" />
      ) : (
        <button
          type={type}
          onClick={onClick}
          className="w-full border-secondary text-primary focus:outline-none  hover:bg-light hover:text-white border-2 rounded-full font-bold p-2 flex flex-row justify-center items-center space-x-2"
        >
          {children}
        </button>
      )}
    </div>
  );
};

export default CustomButton;
