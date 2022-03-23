import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Messages from "./Messages";
import Write from "./Write";
import db, { auth, provider, storage } from "../firebase";

const Connect = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state);

  const [sortedMessages, setSortedMessages] = useState([]);

  const end = document.getElementById("end");

  function compare(a, b) {
    if (a.time < b.time) {
      return -1;
    }
    if (a.time > b.time) {
      return 1;
    }
    return 0;
  }

  useEffect(() => {
    if (data.selectedCon) {
      setSortedMessages(
        data.dbConnections
          .filter(
            (connect) =>
              connect.sides.includes(data.user.userMail) &&
              connect.sides.includes(data.selectedCon.userMail)
          )[0]
          .messages.sort(compare)
      );
    }
  }, [data]);

  useEffect(() => {
    if (
      Object.entries(data.dbUsers).length === data.dbUsersCount &&
      Object.entries(data.dbConnections).length === data.dbConnectionCount &&
      data.selectedCon
    ) {
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
                messages: connect.messages.map((message) => {
                  if (message.writer !== data.selectedCon.userMail) {
                    return message;
                  } else {
                    return { ...message, seen: true };
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
  }, [
    data.dbConnections.filter(
      (connect) =>
        connect.sides.includes(data.user.userMail) &&
        connect.sides.includes(data.selectedCon.userMail)
    )[0].messages.length,
  ]);

  if (end) {
    setTimeout(() => {
      end.scrollIntoView();
    }, 5);
  }

  return (
    <div
      className="scrollbar  
     hover:scrollbar-thumb-gray_500 scrollbar-thin flex flex-col justify-between "
    >
      <div className="">
        {" "}
        <div
          className="
        // h-[200px]
        "
        >
          {" "}
          fdg{" "}
        </div>
        {sortedMessages.length !== 0 ? (
          sortedMessages.map((message, i) => {
            return (
              <div key={i}>
                <Messages
                  message={message}
                  i={i}
                  sortedMessages={sortedMessages}
                />
              </div>
            );
          })
        ) : (
          <div className="bg-lightGey">send first messge</div>
        )}
        <br id="end" />
      </div>
    </div>
  );
};

export default Connect;
