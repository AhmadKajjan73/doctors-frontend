import React from "react";

import { PulseLoader } from "react-spinners";

import { primaryColor } from "../constant";

const PageLoader = ({ loading }) => {
  return (
    // <div className="fixed inset-0 z-50 overflow-auto flex  flex-col justify-center items-center">
    <PulseLoader color={primaryColor} loading={loading} size={20} />
    // </div>
  );
};

export default PageLoader;
