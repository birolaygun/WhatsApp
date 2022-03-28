import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { blueTick, file } from "./icons";

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
      new Date().getTime() - time.getTime() <
      7 * 24 * 60 * 60 * 1000
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
        "bg-green_600 text-iceWhite text-sm p-2 mt-1 rounded-md float-right block"
      );
    } else if (
      props.message.writer === data.user.userMail &&
      props.sortedMessages[props.i].writer !==
        props.sortedMessages[props.i - 1]?.writer
    ) {
      setClassNm(
        "bg-green_600 text-iceWhite text-sm p-2 mt-7 rounded-md float-right block"
      );
    } else if (
      props.message.writer !== data.user.userMail &&
      props.sortedMessages[props.i].writer ===
        props.sortedMessages[props.i - 1]?.writer
    ) {
      setClassNm(
        "bg-gray_500 text-iceWhite text-sm p-2 mt-1 rounded-md float-left block"
      );
    } else if (
      props.message.writer !== data.user.userMail &&
      props.sortedMessages[props.i].writer !==
        props.sortedMessages[props.i - 1]?.writer
    ) {
      setClassNm(
        "bg-gray_500 text-iceWhite text-sm p-2 mt-7 rounded-md float-left block"
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
    ${hideArrow ? "mx-2" : "mx-7"} `}
      >
        {props.message.writer !== data.user.userMail && (
          <div
            className={`-z-10 border-[10px] w-5 h-5 bg-transparant border-gray_500
             border-b-transparant border-l-transparant  relative left-2 top-7 ${
               !hideArrow && "hidden "
             } `}
          ></div>
        )}

        <div
          className={`${classNm}  ${
            props.message.file?.type === "audio" && "w-full max-w-md"
          } maxW  `}
        >
          <div className="px-3 break-words  ">
            {" "}
            {props.message.file ? (
              <div className="max-w-xl">
                {props.message.file.type === "image" ? (
                  <img
                    src={props.message.file.url}
                    alt=""
                    onClick={() => {
                      dispatch({
                        type: "SHOW_MEDIAMODAL",
                        payload: props.message.file.url,
                      });
                    }}
                    className="w-full object-contain cursor-pointer max-h-96 rounded-md shadow-md"
                  />
                ) : props.message.file.type === "video" ? (
                  <video
                    className="w-full object-contain rounded-md shadow-md"
                    controls
                    src={props.message.file.url}
                  ></video>
                ) : props.message.file.type === "audio" ? (
                  <div className="flex flex-col items-center  w-full ">
                    <audio
                      id="messageAudio"
                      controller="true"
                      controls
                      audiotracks="true"
                      src={props.message.file.url}
                      className="w-full my-2"
                    ></audio>{" "}
                    <p> {props.message.file.name} </p>
                  </div>
                ) : (
                  <div className="text-center text-sm bg-green_800  p-2 rounded-md shadow-md">
                    <a
                      className="flex space-x-3"
                      target="_blank"
                      rel="noreferrer"
                      href={props.message.file.url}
                    >
                      {" "}
                      <span>{file}</span>{" "}
                      <span> {props.message.file.name}</span>
                    </a>
                  </div>
                )}
                <div className="mt-1">{props.message.message}</div>
              </div>
            ) : (
              props.message.message
            )}
          </div>
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
