import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import db, { auth, provider, storage } from "../firebase";

const Modal = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state);

  window.onclick = (e) => {
    if (data.showModal && e.target.id !== "modal") {
      dispatch({
        type: "HİDE_MODAL",
      });
    }
  };

  const handleSubmit = () => {
    if (
      !(
        String(data.friendsMail).includes("@") &&
        String(data.friendsMail).includes(".")
      )
    ) {
      window.alert("Invalid e-mail adress");
    } else {
      console.log("handleSubmit");

      if (
        data.dbConnections.find(
          (fn) =>
            fn.sides.includes(data.friendsMail) &&
            fn.sides.includes(data.user.userMail)
        )
      ) {
        window.alert("This e-mail adress is already your friens");
      } else if (
        Object.entries(data.dbUsers).length === data.dbUsersCount &&
        Object.entries(data.dbConnections).length === data.dbConnectionCount
      ) {
        if (data.dbUsers.find((fn) => fn.userMail === data.friendsMail)) {
          console.log("1. çalıştı");
          db.collection("data")
            .doc("SNA9FltXA8h6x6xlt1Ml")
            .update({
              connection: [
                ...data.dbConnections,
                {
                  messages: [],
                  sides: [data.friendsMail, data.user.userMail],
                  sideOneTyping: false,
                  sideZeroTyping: false,
                },
              ],
              connectionCount: data.dbConnectionCount + 1,

              users: data.dbUsers,
              userCount: data.dbUsersCount,
            });
        } else {
          console.log("2. çalıştı");
          db.collection("data")
            .doc("SNA9FltXA8h6x6xlt1Ml")
            .update({
              connection: [
                ...data.dbConnections,
                {
                  messages: [],
                  sides: [data.friendsMail, data.user.userMail],
                  sideOneTyping: false,
                  sideZeroTyping: false,
                },
              ],
              connectionCount: data.dbConnectionCount + 1,

              users: [
                ...data.dbUsers,
                {
                  authName: "",
                  authPhoto: "",

                  lastSeen: "",
                  login: false,
                  profileName: "",
                  profilePhoto: "",
                  userMail: data.friendsMail,
                },
              ],
              userCount: data.dbUsersCount + 1,
            });
        }
      }

      dispatch({
        type: "HİDE_MODAL",
      });
    }
  };

  return (
    <div
      className="absolute left-0 w-screen h-screen z-30
     bg-gray_300 bg-opacity-50 flex items-center justify-center"
    >
      <div
        id="modal"
        className="w-full m-2 max-w-md rounded-xl p-3 bg-gray_900 z-40 space-y-3"
      >
        <h2 id="modal" className="text-lg text-iceWhite ">
          Add Friend
        </h2>

        <input
          autoFocus="autofocus"
          id="modal"
          onChange={(e) => {
            dispatch({
              type: "SET_FRIENDS_MAIL",
              payload: e.target.value,
            });
          }}
          value={data.friendsMail}
          placeholder="e-mail"
          type="email"
          className="bg-iceWhite p-1 rounded-md focus-visible:outline-none w-full mb-3"
        />
        <div className="flex justify-around ">
          <button
            className="bg-gray_100 p-1 rounded-sm w-20"
            type="button"
            onClick={() => handleSubmit()}
          >
            Add
          </button>
          <button
            className="bg-gray_100 p-1 rounded-sm w-20"
            type="submit"
            onClick={() => handleSubmit}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
