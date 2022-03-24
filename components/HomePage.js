import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import db, { auth, provider, storage } from "../firebase";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import Selection from "./Selection";
import Show from "./Show";
import Modal from "./Modal";
import Try from "./Try";
import PhotoModal from "./PhotoModal";

const HomePage = (props) => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state);

  return (
    <div className="flex w-screen overflow-hidden bg-gray_900 ">
      {/* <Try /> */}
      {data.showModal && <Modal />}
      {data.photoModal && <PhotoModal />}

      <div
        className={`w-screen md:w-2/5 bg-gray_900 min-h-screen transition-transform ${
          data.selectedCon
            ? "translate-x-full w-0 invisible absolute md:visible md:static md:translate-x-0"
            : " visible static translate-x-0 "
        }`}
      >
        <Selection logOut={props.logOut} />
      </div>

      <div
        className={` w-screen md:w-3/5 bg-gray_900 min-h-screen transition-transform ${
          data.selectedCon
            ? "visible static translate-x-0 "
            : " -translate-x-full w-0 invisible absolute md:visible md:static md:translate-x-0"
        }`}
      >
        <Show />
      </div>
    </div>
  );
};

export default HomePage;
