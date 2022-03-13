import React from "react";
import List from "./List";
import Nav from "./Nav";

const Selection = (props) => {
  return (
    <div>
      <div className="sticky top-0">
        <Nav />
      </div>
      <List />

      {/* {props.children} */}
    </div>
  );
};

export default Selection;
