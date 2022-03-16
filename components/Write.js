import { useEffect, useState } from "react";
import ReactTextareaAutosize from "react-textarea-autosize";
import { laugh, mic, paperClip, send } from "./icons";
import autosize from "autosize";
import { data } from "autoprefixer";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const Write = () => {



  
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state);

  const [myMessage, setMyMessage] = useState("");

  useEffect(() => {
    autosize(document.getElementById("textarea"));
  }, [myMessage]);

  console.log(data.connects.map((cnn) => {
cnn
    // if(cnn.senderEMail === data.selectedCon.senderEMail) {sdfs : "yess"}
  })
  
  );

  return (
    <div className="  bg-gray_500  w-full  flex items-end pb-4 px-5 text-gray_100 space-x-5 border-t border-t-gray_900 ">
      <div className="pb-[6px]">{laugh}</div>
      <div className="pb-[6px]">{paperClip}</div>

      <div className="w-full ">
        <form
          action=""
          onSubmit={() => {
            dispatch({
              type: "SEND_MESSAGE",
              payload: myMessage,
            });
            setMyMessage("");
          }}
        >
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
        </form>
      </div>

      {myMessage ? (
        <div
          className="rotate-45 transition-all pb-[6px] "
          onClick={() => {
            dispatch({
              type: "SEND_MESSAGE",
              payload: myMessage,
            });
            setMyMessage("");
          }}
        >
          {" "}
          {send}
        </div>
      ) : (
        <div className="transition-all  pb-[6px]">{mic}</div>
      )}
    </div>
  );
};

export default Write;
