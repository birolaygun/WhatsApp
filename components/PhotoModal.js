import { filePlus } from "./icons";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import db, { auth, provider, storage } from "../firebase";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";

const PhotoModal = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state);
  const [showFile, setShowFile] = useState("");
  const [file, setFile] = useState("");
  const [progress, setProgress] = useState(false);
  const filePickerRef = useRef(null);
  const [message, setMessage] = useState("");

  const addFile = (file) => {
    if (file) {
      const storageRef = ref(
        storage,
        `${file.name}-+id=${Math.random() * 100000000000000000}`
      );
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
            if (
              Object.entries(data.dbUsers).length === data.dbUsersCount &&
              Object.entries(data.dbConnections).length ===
                data.dbConnectionCount && data
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
                        sides: connect.sides.map((mp) => {
                          if (mp.user === data.user.userMail) {
                            return { ...mp, typing: false };
                          } else {
                            return mp;
                          }
                        }),
                        messages: [
                          ...connect.messages,
                          {
                            message: message,
                            seen: false,
                            time: String(new Date()),
                            writer: data.user.userMail,
                            file: {
                              url: url,
                              type: String(file["type"]).split("/")[0],
                              name: file.name,
                            },
                          },
                        ],
                      };
                    } else {
                      return connect;
                    }
                  }),

                  connectionCount: data.dbConnectionCount,
                  users: data.dbUsers,
                  userCount: data.dbUsersCount,
                })

                .then(() => {
                  dispatch({
                    type: "HİDE_PHOTOMODAL",
                  });
                });
            }
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
      setFile(e.target.files[0]);

      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setShowFile(readerEvent.target.result);
    };
  };

  return (
    <div
      className="absolute left-0 w-screen h-screen z-30
     bg-gray_300 bg-opacity-50 flex items-center justify-center"
    >
      <div className="w-full m-2 max-w-md rounded-xl p-3 bg-gray_900 z-40 space-y-3">
        <div
          className="w-full text-iceWhite my-3 rounded-sm 
            "
        >
          {showFile ? (
            <div
              onClick={() => {
                setShowFile("");
                setFile("");
              }}
              className="cursor-pointer "
            >
              {String(file["type"]).split("/")[0] === "image" ? (
                <img
                  src={showFile}
                  alt=""
                  onClick={() => {
                    setShowFile("");
                    setFile("");
                  }}
                  className="w-full object-contain cursor-pointer max-h-96"
                />
              ) : String(file["type"]).split("/")[0] === "video" ? (
                <video controls autoPlay muted src={showFile}></video>
              ) : String(file["type"]).split("/")[0] === "audio" ? (
                <div className="flex flex-col items-center">
                  <div className=" mx-auto flex items-center justify-center h-25 w-25 bg-red-100 rounded-full cursor-pointer mb-3">
                    {filePlus}
                  </div>
                  <audio
                    controller="true"
                    controls
                    audiotracks="true"
                    src={showFile}
                    className="w-full"
                  ></audio>{" "}
                </div>
              ) : (
                <div className="text-center text-sm bg-gray_500 p-1">
                  {file.name}
                </div>
              )}
            </div>
          ) : (
            <div>
              <div
                className="mx-auto flex items-center justify-center h-25 w-25  w-min rounded-full cursor-pointer "
                onClick={() => {
                  filePickerRef.current.click();
                }}
              >
                {filePlus}
              </div>
            </div>
          )}
        </div>
        <div className="flex flex-col items-center" action="#">
          <input
            className="border"
            type="file"
            name=""
            ref={filePickerRef}
            hidden
            onChange={addImageToPost}
          />
          <input
            autoFocus="autofocus"
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            value={message}
            placeholder="Type a note"
            type="text"
            className="bg-iceWhite p-1 rounded-md focus-visible:outline-none w-full mb-3"
          />
          <div className="flex justify-around w-full mt-2">
            <button
              className="bg-gray_100 p-1 rounded-sm w-20"
              onClick={() => {
                addFile(file);
              }}
            >
              Send
            </button>
            <button
              onClick={() => {
                dispatch({
                  type: "HİDE_PHOTOMODAL",
                });
              }}
              className="bg-gray_100 p-1 rounded-sm w-20"
            >
              Cancel
            </button>
          </div>

          <h1 className="text-center text-iceWhite font-semibold h-5 mt-2">
            {progress < 100 && progress > 0 ? progress + "%" : ""}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default PhotoModal;
