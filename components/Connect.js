import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Messages from "./Messages";
import Write from "./Write";

const Connect = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state);

  const [sortedMessages, setSortedMessages] = useState([]);

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

  return (
    <div
      className="  heightCalc scrollbar 
     hover:scrollbar-thumb-gray_500 scrollbar-thin bgimage "
    >
      {sortedMessages.length !== 0 ? (
        sortedMessages.map((message, i) => {
          return (
            <div key={i} >
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

      <br />

      <Write />
    </div>
  );
};

export default Connect;
