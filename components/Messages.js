import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { blueTick } from "./icons";

const Messages = (props) => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state);
  const [classNm, setClassNm] = useState();
  const [hideArrow, setHideArrow] = useState();

  useEffect(() => {
    if (
      props.message.userSend &&
      props.sortedMessages[props.i].userSend ===
        props.sortedMessages[props.i - 1]?.userSend
    ) {
      setClassNm(
        "bg-green_600 text-iceWhite text-sm w-fit p-2 mt-1 rounded-md float-right block"
      );
    } else if (
      props.message.userSend &&
      props.sortedMessages[props.i].userSend !==
        props.sortedMessages[props.i - 1]?.userSend
    ) {
      setClassNm(
        "bg-green_600 text-iceWhite text-sm w-fit p-2 mt-7 rounded-md float-right block"
      );
    } else if (
      !props.message.userSend &&
      props.sortedMessages[props.i].userSend ===
        props.sortedMessages[props.i - 1]?.userSend
    ) {
      setClassNm(
        "bg-gray_500 text-iceWhite text-sm w-fit p-2 mt-1 rounded-md float-left block"
      );
    } else if (
      !props.message.userSend &&
      props.sortedMessages[props.i].userSend !==
        props.sortedMessages[props.i - 1]?.userSend
    ) {
      setClassNm(
        "bg-gray_500 text-iceWhite text-sm w-fit p-2 mt-7 rounded-md float-left block"
      );
    }

    if (
      props.sortedMessages[props.i].userSend !==
      props.sortedMessages[props.i - 1]?.userSend
    ) {
      setHideArrow(true);
    } else {
      setHideArrow(false);
    }
  }, [props.sortedMessages, props.message]);

  return (
    <div
      className={`  flex ${props.message.userSend && " justify-end "} 
    ${hideArrow ? "mx-2" : "mx-7"}`}
    >
      {!props.message.userSend && (
        <div
          className={`-z-10 border-[10px] w-5 h-5 bg-transparant border-gray_500
             border-b-transparant border-l-transparant  relative left-2 top-7 ${
               !hideArrow && "hidden "
             } `}
        ></div>
      )}

      <div className={`${classNm} maxW `}>
        <div className="px-3"> {props.message.message}</div>
        <div
          className={`${
            props.message.userSend && "justify-end"
          } flex items-center text-xs font`}
        >
          <div>
            {" "}
            {new Date(props.message.time).toLocaleTimeString().slice(0, 5)}{" "}
          </div>
          <div className="text-blue_500 h-[16px] mb-2">
            {" "}
            {props.message.seen && props.message.userSend && blueTick}
          </div>
          <div className=" h-[16px] ">
            {" "}
            {!props.message.seen && props.message.userSend && blueTick}
          </div>
        </div>
      </div>

      {props.message.userSend && (
        <div
          className={`${
            !hideArrow && "hidden "
          } border-[10px] w-5 h-5 bg-transparant -z-10
             border-b-transparant border-r-transparant border-green_600 relative top-7 -left-2`}
        ></div>
      )}
    </div>
  );
};

export default Messages;
