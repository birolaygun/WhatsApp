import React, { useEffect } from "react";
import List from "./List";
import Nav from "./Nav";

const Selection = (props) => {


  return (
    <div className="float-none">
      <div className="sticky top-0">
        <Nav logOut={props.logOut} />
      </div>
      <List />
    </div>
  );
};

export default Selection;
