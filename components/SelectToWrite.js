import React from "react";
import { blueTick, tick } from "./icons";

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
  let time = props.lastMessageTime;

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
    <div className=" px-3 ">
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
            {props.userName}
          </h2>
          <div className="flex items-center truncate text-ellipsis w-full overflow-hidden">
            <span className={`${!(props.seen && props.userSend) && "hidden"} text-blue_500 `}>
              {props.seen && props.userSend && blueTick}
            </span>
            <span className={`${!(!props.seen && props.userSend) && "hidden"} text-gray_300 `}>
              {!props.seen && props.userSend && tick}
            </span>
            <p className={` ${!(props.group && !props.userSend) && "hidden" } text-gray_300`}>
                {
                    props.group && !props.userSend && props.sender 
                }:
            </p>
            <p
              className={`text-gray_300 truncate text-ellipsis w-full overflow-hidden   `}
            >
              {props.lastMessage}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center flex-col w-min  ">
          <div
            className={`text-gray_300 ${
              props.unReadMessage && "text-green_600"
            }`}
          >
            {timeReact}
          </div>
          <div
            className={`w-5 h-5 bg-green_600 rounded-full flex items-center justify-center text-[10px] ${
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
