import { useEffect, useState } from "react";
import { laugh, mic, paperClip, send } from "./icons";
import autosize from "autosize";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import db from "../firebase";

const Write = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state);

  const [myMessage, setMyMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    autosize(document.getElementById("textarea"));
  }, [myMessage]);

  useEffect(() => {
    if (
      myMessage &&
      Object.entries(data.dbUsers).length === data.dbUsersCount &&
      Object.entries(data.dbConnections).length === data.dbConnectionCount && data
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
                    return { ...mp, typing: true };
                  } else {
                    return mp;
                  }
                }),
              };
            } else {
              return connect;
            }
          }),

          connectionCount: data.dbConnectionCount,
          users: data.dbUsers,
          userCount: data.dbUsersCount,
        });
    } else if (
      !myMessage &&
      Object.entries(data.dbUsers).length === data.dbUsersCount &&
      Object.entries(data.dbConnections).length === data.dbConnectionCount && data
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
              };
            } else {
              return connect;
            }
          }),

          connectionCount: data.dbConnectionCount,
          users: data.dbUsers,
          userCount: data.dbUsersCount,
        });
    }
  }, [myMessage]);

  const sendAMessage = () => {
    if (
      Object.entries(data.dbUsers).length === data.dbUsersCount &&
      Object.entries(data.dbConnections).length === data.dbConnectionCount && data
    ) {
      setLoading(true);
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
                    message: myMessage,
                    seen: false,
                    time: String(new Date()),
                    writer: data.user.userMail,
                    file: false,
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
          setMyMessage("");
          setLoading(false);
          document.getElementById("textarea").style.height = "40px";
        });
    }
  };

  return (
    <div className="  bg-gray_500  w-full  flex items-end pb-4 px-5 text-gray_100 space-x-5 border-t border-t-gray_900  ">
      <div className="pb-[6px]">{laugh}</div>
      <div
        className="pb-[6px]"
        onClick={() => {
          setTimeout(() => {
            dispatch({ type: "SHOW_PHOTOMODAL", payload: "" });
          }, 1);
        }}
      >
        {paperClip}
      </div>

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
          disabled={loading}
          type="button"
          className="rotate-45 transition-all pb-[6px] "
          onClick={() => {
            sendAMessage();
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
