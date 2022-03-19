import React from "react";
import Connect from "./Connect";
import ConnectNav from "./ConnectNav";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Write from "./Write";

const Show = (props) => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state);

  return (
    <div className="md:border-l min-h-screen border-iceWhite border-opacity-20">
      {data.selectedCon ? (
        <div>
          <div className="absolute w-full h-full bgimage -z-10"></div>

          <div className="min-h-screen h-screen flex flex-col justify-between overflow-hidden">
            <div className="sticky top-0">
              <ConnectNav />
            </div>
            <div className="heightCalc overflow-y-auto scrollbar  
     hover:scrollbar-thumb-gray_500 scrollbar-thin">
              <div className="  ">
                <Connect />
              </div>{" "}
            </div>
            <div className=" sticky bottom-0 ">
              <Write />
            </div>
          </div>
        </div>
      ) : (
        <div> </div>
      )}
    </div>
  );
};

export default Show;
