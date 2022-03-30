import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { signOut } from "next-auth/react";
import db from "../firebase";

const Dropdown = () => {
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
    dispatch({
      type: "LOGOUT",
    });
    signOut();
    if (
      Object.entries(data.dbUsers).length === data.dbUsersCount &&
      Object.entries(data.dbConnections).length === data.dbConnectionCount && data
    ) {
      db.collection("data")
        .doc("SNA9FltXA8h6x6xlt1Ml")
        .update({
          connection: data.dbConnections,
          users: data.dbUsers.map((user) => {
            if (user.userMail === data.user.userMail) {
              return { ...user, login: false, lastSeen: String(new Date()) };
            } else {
              return user;
            }
          }),
          userCount: data.dbUsersCount,
          connectionCount: data.dbConnectionCount,
        });
    }
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