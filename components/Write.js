import { useEffect, useState } from "react";
import ReactTextareaAutosize from "react-textarea-autosize";
import { laugh, mic, paperClip, send } from "./icons";
import autosize from "autosize";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import db, { auth, provider, storage } from "../firebase";

const Write = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state);

  const [myMessage, setMyMessage] = useState("");

  useEffect(() => {
    autosize(document.getElementById("textarea"));
  }, [myMessage]);

  return (
    <div className="  bg-gray_500  w-full  flex items-end pb-4 px-5 text-gray_100 space-x-5 border-t border-t-gray_900 ">
      <div className="pb-[6px]">{laugh}</div>
      <div className="pb-[6px]">{paperClip}</div>

      <div className="w-full ">
        <textarea
          id="textarea"
          value={myMessage}
          onChange={(e) => {
            setMyMessage(e.target.value);
          }}
          placeholder={` Type a message`}
          className="w-full bg-gray_300 rounded-lg p-2 items-end focus-within:outline-none scrollbar relative -bottom-3 
          hover:scrollbar-thumb-gray_100 scrollbar-thin"
        />
      </div>

      {myMessage ? (
        <button
          type="button"
          className="rotate-45 transition-all pb-[6px] "
          onClick={() => {

            db.collection("data")
              .doc("SNA9FltXA8h6x6xlt1Ml")
              .update({
                connection: data.dbConnections.map((connect) => {
                  if (
                    connect.sides.includes(data.user.userMail) &&
                    connect.sides.includes(data.selectedCon.userMail)
                  ) {
                    return {
                      ...connect,
                      messages: [
                        ...connect.messages,
                        {
                          message: myMessage,
                          seen: false,
                          time: String(new Date()),
                          writer: data.user.userMail,
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
              });

            setMyMessage("");
          }}
        >
          {" "}
          {send}
        </button>
      ) : (
        <div className="transition-all  pb-[6px]">{mic}</div>
      )}
    </div>
  );
};

export default Write;
