import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { blueTick } from "./icons";

const Messages = (props) => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state);
  const [classNm, setClassNm] = useState();
  const [hideArrow, setHideArrow] = useState();

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let time = new Date(props.message.time);
  let timeReact;

  if (props.message.time) {
    if (time.toDateString() === new Date().toDateString()) {
      timeReact = "Today";
    } else if (
      new Date().toDateString() ===
      new Date(time.getTime() + 24 * 60 * 60 * 1000).toDateString()
    ) {
      timeReact = "Yesterday";
    } else if (
      new Date().toDateString() > time.toDateString() &&
      new Date().getTime() - time.getTime() < 7 * 24 * 60 * 60 * 1000
    ) {
      timeReact = days[time.getDay()];
    } else {
      timeReact = time.toLocaleDateString();
    }
  }

  useEffect(() => {
    if (
      props.message.writer === data.user.userMail &&
      props.sortedMessages[props.i].writer ===
        props.sortedMessages[props.i - 1]?.writer
    ) {
      setClassNm(
        "bg-green_600 text-iceWhite text-sm w-fit p-2 mt-1 rounded-md float-right block"
      );
    } else if (
      props.message.writer === data.user.userMail &&
      props.sortedMessages[props.i].writer !==
        props.sortedMessages[props.i - 1]?.writer
    ) {
      setClassNm(
        "bg-green_600 text-iceWhite text-sm w-fit p-2 mt-7 rounded-md float-right block"
      );
    } else if (
      props.message.writer !== data.user.userMail &&
      props.sortedMessages[props.i].writer ===
        props.sortedMessages[props.i - 1]?.writer
    ) {
      setClassNm(
        "bg-gray_500 text-iceWhite text-sm w-fit p-2 mt-1 rounded-md float-left block"
      );
    } else if (
      props.message.writer !== data.user.userMail &&
      props.sortedMessages[props.i].writer !==
        props.sortedMessages[props.i - 1]?.writer
    ) {
      setClassNm(
        "bg-gray_500 text-iceWhite text-sm w-fit p-2 mt-7 rounded-md float-left block"
      );
    }

    if (
      props.sortedMessages[props.i].writer !==
      props.sortedMessages[props.i - 1]?.writer
    ) {
      setHideArrow(true);
    } else {
      setHideArrow(false);
    }
  }, [props.sortedMessages, props.message]);

  return (
    <div>
      {new Date(props.sortedMessages[props.i].time).toDateString() !==
        new Date(props.sortedMessages[props.i - 1]?.time).toDateString() && (
        <div
          className="bg-gray_500 px-3 rounded-md 
       text-gray_100 text-opacity-60 text-center mx-auto my-2 w-min"
        >
          {timeReact}
        </div>
      )}
      <div
        className={`  flex ${
          props.message.writer === data.user.userMail && " justify-end "
        } 
    ${hideArrow ? "mx-2" : "mx-7"}`}
      >
        {props.message.writer !== data.user.userMail && (
          <div
            className={`-z-10 border-[10px] w-5 h-5 bg-transparant border-gray_500
             border-b-transparant border-l-transparant  relative left-2 top-7 ${
               !hideArrow && "hidden "
             } `}
          ></div>
        )}

        <div className={`${classNm} maxW `}>
          <div className="px-3 break-words"> {props.message.message}</div>
          <div
            className={`${
              props.message.writer === data.user.userMail && "justify-end"
            } flex items-center text-xs font`}
          >
            <div>
              {" "}
              {new Date(props.message.time)
                .toLocaleTimeString()
                .slice(0, 5)}{" "}
            </div>
            <div className="text-blue_500 h-[16px] mb-2">
              {" "}
              {props.message.seen &&
                props.message.writer === data.user.userMail &&
                blueTick}
            </div>
            <div className=" h-[16px] ">
              {" "}
              {!props.message.seen &&
                props.message.writer === data.user.userMail &&
                blueTick}
            </div>
          </div>
        </div>

        {props.message.writer === data.user.userMail && (
          <div
            className={`${
              !hideArrow && "hidden "
            } border-[10px] w-5 h-5 bg-transparant -z-10
             border-b-transparant border-r-transparant border-green_600 relative top-7 -left-2`}
          ></div>
        )}
      </div>{" "}
    </div>
  );
};

export default Messages;
