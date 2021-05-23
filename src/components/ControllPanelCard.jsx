import React from "react";

const ControllPanelCard = ({ imageurl, cardName, addedClass }) => {
  return (
    <div
      className={` flex flex-col items-center bg-fixed cursor-pointer justify-center w-full h-80 transform ease-in-out ${addedClass} border-8 border-primary`}
      style={{ backgroundImage: `url("${imageurl}")` }}
    >
      <div className="text-white p-4 text-2xl lg:text-5xl text-center uppercase">
        {cardName}
      </div>
    </div>
  );
};

export default ControllPanelCard;
