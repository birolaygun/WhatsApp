import React, { useEffect } from "react";
import List from "./List";
import Nav from "./Nav";

const Selection = () => {


  return (
    <div className="float-none">
      <div className="sticky top-0">
        <Nav  />
      </div>
      <List />
    </div>
  );
};

export default Selection;
