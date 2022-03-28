import React, { useEffect, useState } from "react";
import { blueTick } from "./icons";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import db from "../firebase";

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const SelectToWrite = (props) => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state);

  const [selected, setSelected] = useState(false);

  useEffect(() => {
    if (
      data.selectedCon &&
      data.selectedCon.senderEMail === props.senderEMail
    ) {
      setSelected(true);
    } else {
      setSelected(false);
    }
  }, [data.selectedCon]);

  let time;
  let timeReact;

  if (props.lastMessage) {
    time = new Date(props?.lastMessage.time);
    if (time.toDateString() === new Date().toDateString()) {
      timeReact = time.toTimeString().slice(0, 5);
    } else if (
      new Date().toDateString() > time.toDateString() &&
      new Date().getTime() - time.getTime() < 7 * 24 * 60 * 60 * 1000
    ) {
      timeReact = days[time.getDay()];
    } else {
      timeReact = time.toLocaleDateString();
    }
  }

  const makeSeen = () => {
    if (
      Object.entries(data.dbUsers).length === data.dbUsersCount &&
      Object.entries(data.dbConnections).length === data.dbConnectionCount
    ) {

      db.collection("data")
        .doc("SNA9FltXA8h6x6xlt1Ml")
        .update({
          connection: data.dbConnections.map((connect) => {
            if (
              connect.sides
                .map((side) => side.user)
                .includes(data.selectedCon.userMail) &&
              connect.sides
                .map((side) => side.user)
                .includes(data.user.userMail)
            ) {
              return {
                ...connect,
                messages: connect.messages.map((message) => {
                  if (message.writer !== data.selectedCon.userMail) {
                    return message;
                  } else {
                    return { ...message, seen: true };
                  }
                }),
              };
            } else {
              return connect;
            }
          }),

          connectionCount: data.dbConnectionCount,
          users: data.dbUsers,
          userCount: data.dbUsersCount,
        });
    }
  };

  useEffect(() => {
    makeSeen();
  }, [data.selectedCon]);

  useEffect(() => {
    if (data.selectedCon)
      dispatch({
        type: "SELECT_CON",
        payload: data.selectedCon.userMail,
      });
  }, [data.dbUsers]);

  return (
    <div
      onClick={() => {
        dispatch({
          type: "SELECT_CON",
          payload: props.senderEMail,
        });
        makeSeen();
      }}
      className={
        selected
          ? "bg-gray_300 px-3 transition-colors cursor-pointer "
          : " transition-colors px-3 cursor-pointer hover:bg-gray_300 hover:bg-opacity-50 "
      }
    >
      <div className="w-12 float-left mt-[12px] ">
        {props.profilePhoto ? (
          <img
            className="w-12 h-12 rounded-full"
            src={props.profilePhoto}
            alt="logo"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-blue_100 flex items-center justify-center text-2xl font-semibold">
            {props.senderEMail[0].toUpperCase()}
          </div>
        )}
      </div>

      <div className="flex-1 flex items-center  justify-between p-3  border-b border-iceWhite border-opacity-20">
        <div className=" overflow-hidden flex flex-col items-start justify-start ml-2 flex-1">
          <h2 className="text-iceWhite font-bold whitespace-nowrap text-ellipsis ">
            {props.senderName ? props.senderName : props.senderEMail}
          </h2>

          {props.lastMessage ? (
            <div className="flex items-center truncate text-ellipsis w-full overflow-hidden">
              <span
                className={`${
                  !(
                    props.lastMessage?.seen &&
                    props.lastMessage?.writer === data.user.userMail
                  ) && "hidden"
                } text-blue_500 `}
              >
                {props.lastMessage.seen &&
                  props.lastMessage?.writer === data.user.userMail &&
                  blueTick}
              </span>
              <span
                className={`${
                  !(
                    !props.lastMessage.seen &&
                    props.lastMessage?.writer === data.user.userMail
                  ) && "hidden"
                } text-iceWhite `}
              >
                {!props.lastMessage.seen &&
                  props.lastMessage?.writer === data.user.userMail &&
                  blueTick}
              </span>
              <p
                className={` ${
                  !(
                    props.group &&
                    !props.lastMessage?.writer === data.user.userMail
                  ) && "hidden"
                } text-iceWhite`}
              >
                {props.group &&
                  !props.lastMessage?.writer === data.user.userMail &&
                  props.lastMessage?.writer === data.user.userMail}
                :
              </p>
              <p className=" text-sm text-iceWhite text-opacity-80 truncate text-ellipsis w-full overflow-hidden ">
                {props.lastMessage.message}
              </p>
            </div>
          ) : (
            <div className="">
              <br />
            </div>
          )}
        </div>

        <div className="flex items-end justify-center flex-col w-min  ">
          <div
            className={
              props.unReadMessage
                ? "text-green_400 text-sm "
                : "text-iceWhite text-opacity-80 text-sm"
            }
          >
            {timeReact}
          </div>
          <div
            className={` w-5 h-5 bg-green_400 rounded-full flex items-center justify-center text-[10px] ${
              !props.unReadMessage && "hidden"
            }`}
          >
            {props.unReadMessage}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectToWrite;
