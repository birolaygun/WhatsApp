import React, { useEffect, useState } from "react";
import { blueTick } from "./icons";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

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

  let time = props?.lastMessageTime;

  let timeReact;

  if (time.toDateString() === new Date().toDateString()) {
    timeReact = new Date().toTimeString().slice(0, 5);
  } else if (
    new Date().toDateString() > time.toDateString() &&
    new Date().getTime() - time.getTime() < 7 * 24 * 60 * 60 * 1000
  ) {
    timeReact = days[time.getDay()];
  } else {
    timeReact = time.toLocaleDateString();
  }
  return (
    <div
      onClick={() => {
        dispatch({
          type: "SELECT_CON",
          payload: props.senderEMail,
        });
      }}
      className={
        selected
          ? "bg-gray_300 px-3  transition-colors cursor-pointer "
          : " transition-colors px-3 cursor-pointer hover:bg-gray_300 hover:bg-opacity-50 "
      }

    >
      <div className="w-12 float-left mt-[12px] ">
        <img
          className="w-12 h-12 rounded-full"
          src={props.profilePhoto}
          alt=""
        />
      </div>

      <div className="flex-1 flex items-center  justify-between p-3  border-b border-iceWhite border-opacity-20">
        <div className=" overflow-hidden flex flex-col items-start justify-start ml-2 flex-1">
          <h2 className="text-iceWhite font-bold whitespace-nowrap text-ellipsis ">
            {props.senderName}
          </h2>
          <div className="flex items-center truncate text-ellipsis w-full overflow-hidden">
            <span
              className={`${
                !(props.seen && props.userSend) && "hidden"
              } text-blue_500 `}
            >
              {props.seen && props.userSend && blueTick}
            </span>
            <span
              className={`${
                !(!props.seen && props.userSend) && "hidden"
              } text-iceWhite `}
            >
              {!props.seen && props.userSend && blueTick}
            </span>
            <p
              className={` ${
                !(props.group && !props.userSend) && "hidden"
              } text-iceWhite`}
            >
              {props.group && !props.userSend && props.sender}:
            </p>
            <p



              className= "text-iceWhite text-opacity-80 truncate text-ellipsis w-full overflow-hidden "
            >
              {props.lastMessage}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center flex-col w-min  ">
          <div




            className={props.unReadMessage ? "text-green_400 " : "text-iceWhite text-opacity-80"}
          >
            {timeReact}
          </div>
          <div
            className={`w-5 h-5 bg-green_400 rounded-full flex items-center justify-center text-[10px] ${
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