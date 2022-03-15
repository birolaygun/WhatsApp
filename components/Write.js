import React, { useState } from "react";
import ReactTextareaAutosize from "react-textarea-autosize";
import { laugh, mic, paperClip, send } from "./icons";

const Write = () => {
  const [myMessage, setMyMessage] = useState("");

  return (
    <div className=" sticky bottom-0 bg-gray_500  w-full  flex items-end p-5 text-gray_100 space-x-5  ">
      <div>{laugh}</div>
      <div>{paperClip}</div>
      <div className="w-full">
        <ReactTextareaAutosize
          resize="none"
          onChange={(e) => {
            setMyMessage(e.target.value);
          }}
          placeholder={` Type a message`}
          className="w-full bg-gray_300 rounded-lg p-3 items-end focus-within:outline-none relative top-3 scrollbar 
          hover:scrollbar-thumb-gray_100 scrollbar-thin "
          maxRows={5}
        />
      </div>

      {myMessage ? (
        <div className="rotate-45 transition-all  "> {send}</div>
      ) : (
        <div className="transition-all  ">{mic}</div>
      )}
    </div>
  );
};

export default Write;
