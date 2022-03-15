import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Messages from "./Messages";
import Write from "./Write";

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
    if (data.selectedCon.senderEMail) {
      setSortedMessages(
        data.connects
          .find((fn) => fn.senderEMail === data.selectedCon.senderEMail)
          .messages.sort(compare)
      );
    }
  }, [data]);

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
      <div></div>

      <div className="h-max">
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
      <Write />
    </div>
  );
};

export default Connect;
