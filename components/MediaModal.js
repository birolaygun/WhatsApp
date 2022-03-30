import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { download } from "./icons";

const MediaModal = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state);

  return (
    <div
      className="absolute top-0 left-0 w-screen h-screen z-20
     bg-gray_900 bg-opacity-90 flex items-center justify-center"
      onClick={() => {
        dispatch({ type: "HIDE_MEDIAMODAL" });
      }}
    >
      <a target="_blank" rel="noopener noreferrer" 
        download href={data.mediaModalUrl} 
        className="absolute top-0 right-0 text-iceWhite m-6 z-30 cursor-pointer animate-fadeInDown"
      >
        {download}
      </a>
      <img className="w-11/12" src={data.mediaModalUrl} alt="" />
    </div>
  );
};

export default MediaModal;