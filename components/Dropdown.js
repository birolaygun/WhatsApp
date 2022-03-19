import { data } from "autoprefixer";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const Dropdown = (props) => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state);

  if (data.showDropDown) {
    window.onclick = (e) => {
      if (e.target.id !== "dropdown") {
        dispatch({
          type: "HİDE_DROPDOWN",
        });
      }
    };
  }

  const logOut = () => {
    dispatch({
      type: "HİDE_DROPDOWN",
    });
    props.logOut();
  };

  return (
    <div id="dropdown ">
      <div id="dropdown" className="mb-6 Dropdown text-2xl ">
        <button
          id="dropdown"
          onClick={() => {
            dispatch({
              type: "SHOW_DROPDOWN",
            });
          }}
        >
          ...
        </button>

        <div
          id="dropdown"
          className={`${
            !data.showDropDown && "hidden"
          } bg-gray_300 absolute shadow-lg rounded-md mr-3 min-w-[120px] right-0 text-base`}
        >
          <h3
            onClick={() => {
              logOut();
            }}
            className="cursor-pointer hover:bg-gray_100 hover:bg-opacity-25 pl-6 p-2 "
            id="dropdown"
          >
            Log Out
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
