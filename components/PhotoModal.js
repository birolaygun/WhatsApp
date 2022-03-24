import { filePlus } from "./icons";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import db, { auth, provider, storage } from "../firebase";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

const PhotoModal = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state);
  const [file, setFile] = useState("");
  const [fileData, setFileData] = useState("");
  const [progress, setProgress] = useState(false);
  const filePickerRef = useRef(null);
  const [messaeg, setMessage] = useState("");

  window.onclick = (e) => {
    if (data.photoModal && e.target.id !== "photoModal") {
      dispatch({
        type: "HİDE_PHOTOMODAL",
      });
    }
  };

  const addFile = (file) => {
    if (file) {
      const storageRef = ref(storage, `${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const prog = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(prog);
        },
        (err) => console.log(err),
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            // console.log(url);

            db.collection("pics").add({
              img: url,
              name: file.name,
            });
          });
        }
      );
    } else {
      return;
    }
  };

  const addImageToPost = (e) => {
    const reader = new FileReader();

    if (e.target.files[0]) {
      setFileData(e.target.files[0]);

      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setFile(readerEvent.target.result);
    };
  };

  // useEffect(() => {
  //   console.log(file);
  //   console.log(fileData);
  //   console.log(fileData.name);
  // }, [file]);

  return (
    <div
      className="absolute left-0 w-screen h-screen z-30
     bg-gray_300 bg-opacity-50 flex items-center justify-center"
    >
      <div
        id="photoModal"
        className="w-full m-2 max-w-md rounded-xl p-3 bg-gray_900 z-40 space-y-3"
      >
        <div
          id="photoModal"
          className="w-full text-iceWhite my-3 rounded-sm 
            "
        >
          {file ? (
            <div
              id="photoModal"
              onClick={() => {
                setFile("");
                setFileData("");
              }}
              className="cursor-pointer"
            >
              {String(fileData["type"]).split("/")[0] === "image" ? (
                <img
                  id="photoModal"
                  src={file}
                  alt=""
                  onClick={() => {
                    setFile("");
                    setFileData("");
                  }}
                  className="w-full object-contain cursor-pointer max-h-96"
                />
              ) : String(fileData["type"]).split("/")[0] === "video" ? (
                <video
                  id="photoModal"
                  controls
                  autoPlay
                  muted
                  src={file}
                ></video>
              ) : String(fileData["type"]).split("/")[0] === "audio" ? (
                <div id="photoModal" className="flex flex-col items-center">
                  <div
                    id="photoModal"
                    className=" mx-auto flex items-center justify-center h-25 w-25 bg-red-100 rounded-full cursor-pointer mb-3"
                  >
                    {filePlus}
                  </div>
                  <audio
                    id="photoModal"
                    controller="true"
                    controls
                    audiotracks="true"
                    src={file}
                    className="w-full"
                  ></audio>{" "}
                </div>
              ) : (
                <div
                  id="photoModal"
                  className="text-center text-sm bg-gray_500"
                >
                  {fileData.name}
                </div>
              )}
            </div>
          ) : (
            <div
              id="photoModal"
              className="mx-auto flex items-center justify-center h-25 w-25 bg-red-100 rounded-full cursor-pointer "
              onClick={() => {
                filePickerRef.current.click();
              }}
            >
              {filePlus}
            </div>
          )}
        </div>
        <form
          id="photoModal"
          className="flex flex-col items-center"
          onSubmit={() => {
            addFile(fileData);
          }}
          action="#"
        >
          <input
            className="border"
            type="file"
            name=""
            id="photoModal"
            ref={filePickerRef}
            hidden
            onChange={addImageToPost}
          />
          <input
            autoFocus="autofocus"
            id="photoModal"
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            value={messaeg}
            placeholder="Type a note"
            type="text"
            className="bg-iceWhite p-1 rounded-md focus-visible:outline-none w-full mb-3"
          />
          <div className="flex justify-around w-full mt-2">
            <button
              id="photoModal"
              className="bg-gray_100 p-1 rounded-sm w-20"
              type="submit"
            >
              Send
            </button>
            <button className="bg-gray_100 p-1 rounded-sm w-20">Cancel</button>
          </div>

          <h1
            id="photoModal"
            className="text-center text-iceWhite font-semibold h-5 mt-2"
          >
            {progress < 100 && progress > 0 ? { progress } + "%" : ""}
          </h1>
        </form>
      </div>
    </div>
  );
};

export default PhotoModal;
