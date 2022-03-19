import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

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
      dispatch({
        type: "ADD_FRİEND",
        payload: data.friendsMail,
      });
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
          <button className="bg-gray_100 p-1 rounded-sm w-20" type="button" onClick={() => handleSubmit()}>
            Add
          </button>
          <button className="bg-gray_100 p-1 rounded-sm w-20" type="submit" onClick={() => handleSubmit}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
