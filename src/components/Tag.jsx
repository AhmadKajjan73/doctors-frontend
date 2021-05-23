import React from "react";

const Tag = ({ onClick, name }) => {
  return (
    <div className="rounded-xl w-full bg-gradient-to-r from-primary to-secondary hover:to-primary hover:from-secondary flex flex-row  text-white text-xl justify-between items-center  hover:text-white hover:bg-primary  ">
      <button
        onClick={onClick}
        className=" w-full focus:outline-none text-base font-bold p-3"
      >
        {name}
      </button>
    </div>
  );
};

export default Tag;
