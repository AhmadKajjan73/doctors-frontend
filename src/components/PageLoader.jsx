import React from "react";

import Loader from "react-loader-advanced";

import Spinner from "./Spinner";

import { secondaryColor } from "../constant";

const PageLoader = ({ loading, children }) => {
  return (
    <Loader
      show={loading}
      hideContentOnLoad
      backgroundStyle={{ backgroundColor: `${secondaryColor}40` }}
      message={<Spinner loading={loading} />}
    >
      {children}
    </Loader>
  );
};

export default PageLoader;
