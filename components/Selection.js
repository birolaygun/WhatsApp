import React from "react";
import List from "./List";
import Nav from "./Nav";

const Selection = (props) => {
  return (
    <div className="float-none">
      <div className="sticky top-0">
        <Nav />
      </div>
      <List />

    </div>
  );
};

export default Selection;
