import React from "react";

import { withRouter } from "react-router-dom";

import Subject from "./Subject";

const index = ({ match }) => {
  return <Subject id={match.params && match.params.id} />;
};

export default withRouter(index);
