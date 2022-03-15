import React from "react";
import Connect from "./Connect";
import ConnectNav from "./ConnectNav";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Write from "./write";

const Show = (props) => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state);

  return (
    <div className="bgimage md:border-l min-h-screen border-iceWhite border-opacity-20">
      {data.selectedCon ? (
        <div>
          <div className="sticky top-0">
            <ConnectNav />
          </div>
          <Connect />{" "}
          <div className="sticky top-0">
            <Write className="" />
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Show;
