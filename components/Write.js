import { useEffect, useState } from "react";
import ReactTextareaAutosize from "react-textarea-autosize";
import { laugh, mic, paperClip, send } from "./icons";
import autosize from "autosize";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const Write = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state);

  const deneme = {
    login: false,
    user: {},
    chatsBadge: 11,
    //state.connects.filter((fn) => fn.unReadMessage > 0).length,
    profileName: "",
    profilePhoto: "",
    selectedCon: "",

    connects: [
      {
        senderEMail: "kjsfdkşsa@gmail.com",
        senderName: "birol buraa",
        profilePhoto:
          "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        lastMessage: "ben eve geldim. orada görüşürüz :)",
        lastMessageTime: new Date(2022, 2, 15, 10, 30, 30, 0),
        unReadMessage: 4,
        seen: true,
        userSend: false,
        group: true,
        sender: "gruptan gönderdi",
        lastSeen: new Date(2022, 2, 13, 13, 50, 40, 0),
        messages: [
          {
            userSend: true,
            time: new Date(2022, 2, 13, 17, 51, 40, 0),
            message:
              " hello World  hello Worldhello Worldhello Worldhello Worldhello World hello Worldhello Worldhello Worldhello Worldhello World!!",
            seen: false,
          },
          {
            userSend: false,
            time: new Date(2022, 2, 13, 17, 50, 43, 0),
            message:
              " hello Worlhello Worldhello Worldhello World hello Worldhello Worldd !!",
            seen: false,
          },
          {
            userSend: true,
            time: new Date(2022, 2, 13, 17, 57, 40, 0),
            message:
              " hello Worl hello Worldhello Worldhello Worldhello Worldhello Worldhello Worldd !!",
            seen: true,
          },
          {
            userSend: false,
            time: new Date(2022, 2, 13, 17, 30, 40, 0),
            message: " hello World !!",
            seen: true,
          },
          {
            userSend: false,
            time: new Date(2022, 2, 13, 13, 50, 40, 0),
            message: " hello World !!",
            seen: false,
          },
          {
            userSend: true,
            time: new Date(2022, 2, 13, 12, 50, 40, 0),
            message: " hello World !!",
            seen: true,
          },
          {
            userSend: false,
            time: new Date(2022, 2, 13, 12, 50, 40, 0),
            message: " hello World !!",
            seen: false,
          },
          {
            userSend: true,
            time: new Date(2022, 2, 13, 17, 51, 40, 0),
            message:
              " hello World  hello Worldhello Worldhello Worldhello Worldhello World hello Worldhello Worldhello Worldhello Worldhello World!!",
            seen: false,
          },
          {
            userSend: false,
            time: new Date(2022, 2, 13, 17, 50, 43, 0),
            message:
              " hello Worlhello Worldhello Worldhello World hello Worldhello Worldd !!",
            seen: false,
          },
          {
            userSend: true,
            time: new Date(2022, 2, 13, 17, 57, 40, 0),
            message:
              " hello Worl hello Worldhello Worldhello Worldhello Worldhello Worldhello Worldd !!",
            seen: true,
          },
          {
            userSend: false,
            time: new Date(2022, 2, 13, 17, 30, 40, 0),
            message: " hello World !!",
            seen: true,
          },
          {
            userSend: false,
            time: new Date(2022, 2, 13, 13, 50, 40, 0),
            message: " hello World !!",
            seen: false,
          },
          {
            userSend: true,
            time: new Date(2022, 2, 13, 12, 50, 40, 0),
            message: " hello World !!",
            seen: true,
          },
          {
            userSend: false,
            time: new Date(2022, 2, 13, 12, 50, 40, 0),
            message: " hello World !!",
            seen: false,
          },
        ],
      },
      {
        senderEMail: "kjdkşjhsa@gmail.com",
        senderName: "Tuğba bura",
        profilePhoto:
          "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        lastMessage: " sa orada görüşürüz :) ben eve geldim.",
        lastMessageTime: new Date(2022, 2, 15, 23, 0, 0, 0),
        unReadMessage: 0,
        seen: true,
        userSend: false,
        group: false,
        sender: "gruptan gönderdi",
        lastSeen: new Date(2022, 2, 13, 13, 50, 40, 0),
        messages: [
          {
            userSend: true,
            time: new Date(2022, 2, 13, 17, 51, 40, 0),
            message:
              " hello World  hello Worldhello Worldhello Worldhello Worldhello World hello Worldhello Worldhello Worldhello Worldhello World!!",
            seen: false,
          },
          {
            userSend: false,
            time: new Date(2022, 2, 13, 17, 50, 43, 0),
            message:
              " hello Worlhello Worldhello Worldhello World hello Worldhello Worldd !!",
            seen: false,
          },
          {
            userSend: true,
            time: new Date(2022, 2, 13, 17, 57, 40, 0),
            message:
              " hello Worl hello Worldhello Worldhello Worldhello Worldhello Worldhello Worldd !!",
            seen: true,
          },
        ],
      },
      {
        senderEMail: "kjsfdq33sa@gmail.com",
        senderName: "birol bu",
        profilePhoto:
          "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        lastMessage: "ben eve geldim. orada görüşürüz :)",
        lastMessageTime: new Date(2022, 2, 2, 20, 33, 30, 0),
        unReadMessage: 3,
        seen: false,
        userSend: true,
        group: false,
        sender: "gruptan gönderdi",
        lastSeen: new Date(2022, 2, 13, 13, 50, 40, 0),
        messages: [],
      },
      {
        senderEMail: "kjsweweedkşjhsa@gmail.com",
        senderName: "birol",
        profilePhoto:
          "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        lastMessage: "ben eve geldim. orada görüşürüz :)",
        lastMessageTime: new Date(2022, 2, 3, 10, 30, 30, 0),
        unReadMessage: 3,
        seen: false,
        userSend: false,
        group: false,
        sender: "gruptan gönderdi",
        lastSeen: new Date(2022, 2, 13, 13, 50, 40, 0),
        messages: [],
      },
      {
        senderEMail: "kjsfdkıyujjja@gmail.com",
        senderName: "Tuğba",
        profilePhoto:
          "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        lastMessage: " orada görüşürüz :) ben eve geldim.",
        lastMessageTime: new Date(2022, 2, 7, 11, 33, 30, 0),
        unReadMessage: 0,
        seen: true,
        userSend: true,
        group: false,
        sender: "gruptan gönderdi",
        lastSeen: new Date(2022, 2, 13, 13, 50, 40, 0),
        messages: [],
      },
      {
        senderEMail: "kjsnbmbnjhsa@gmail.com",
        senderName: "birol",
        profilePhoto:
          "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        lastMessage: "ben eve geldim. orada görüşürüz :)",
        lastMessageTime: new Date(2022, 2, 2, 20, 33, 30, 0),
        unReadMessage: 3,
        seen: true,
        userSend: true,
        group: true,
        sender: "gruptan gönderdi",
        lastSeen: new Date(2022, 2, 13, 13, 50, 40, 0),
        messages: [],
      },
      {
        senderEMail: "kjsfmpopjhsa@gmail.com",
        senderName: "birol",
        profilePhoto:
          "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        lastMessage: "ben eve geldim. orada görüşürüz :)",
        lastMessageTime: new Date(2022, 2, 1, 10, 30, 30, 0),
        unReadMessage: 4,
        seen: true,
        userSend: true,
        group: true,
        sender: "gruptan gönderdi",
        lastSeen: new Date(2022, 2, 13, 13, 50, 40, 0),
        messages: [],
      },
      {
        senderEMail: "kişsa@gmail.com",
        senderName: "Tuğba",
        profilePhoto:
          "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        lastMessage: " orada görüşürüz :) ben eve geldim.",
        lastMessageTime: new Date(2022, 2, 5, 23, 0, 0, 0),
        unReadMessage: 0,
        seen: true,
        userSend: false,
        group: false,
        sender: "gruptan gönderdi",
        lastSeen: new Date(2022, 2, 13, 13, 50, 40, 0),
        messages: [],
      },
      {
        senderEMail: "kjsfşjhsa@gmail.com",
        senderName: "birol",
        profilePhoto:
          "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        lastMessage: "ben eve geldim. orada görüşürüz :)",
        lastMessageTime: new Date(2022, 2, 2, 20, 33, 30, 0),
        unReadMessage: 3,
        seen: true,
        userSend: false,
        group: false,
        sender: "gruptan gönderdi",
        lastSeen: new Date(2022, 2, 13, 13, 50, 40, 0),
        messages: [],
      },
      {
        senderEMail: "kjsfdkşja@gmail.com",
        senderName: "birol",
        profilePhoto:
          "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        lastMessage: "ben eve geldim. orada görüşürüz :)",
        lastMessageTime: new Date(2022, 2, 3, 10, 30, 30, 0),
        unReadMessage: 3,
        seen: true,
        userSend: false,
        group: false,
        sender: "gruptan gönderdi",
        lastSeen: new Date(2022, 2, 13, 13, 50, 40, 0),
        messages: [],
      },
      {
        senderEMail: "kjsfdkşjh@gmail.com",
        senderName: "Tuğba",
        profilePhoto:
          "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        lastMessage: " orada görüşürüz :) ben eve geldim.",
        lastMessageTime: new Date(2022, 2, 7, 11, 33, 30, 0),
        unReadMessage: 0,
        seen: true,
        userSend: false,
        group: false,
        sender: "gruptan gönderdi",
        lastSeen: new Date(2022, 2, 13, 13, 50, 40, 0),
        messages: [],
      },
      {
        senderEMail: "kretjhka@gmail.com",
        senderName: "birol",
        profilePhoto:
          "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        lastMessage: "ben eve geldim. orada görüşürüz :)",
        lastMessageTime: new Date(2022, 2, 2, 20, 33, 30, 0),
        unReadMessage: 3,
        seen: true,
        userSend: false,
        group: false,
        sender: "gruptan gönderdi",
        lastSeen: new Date(2022, 2, 13, 13, 50, 40, 0),
        messages: [],
      },
      {
        senderEMail: "kjfsa@gmail.com",
        senderName: "birol",
        profilePhoto:
          "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        lastMessage: "ben eve geldim. orada görüşürüz :)",
        lastMessageTime: new Date(2022, 2, 1, 10, 30, 30, 0),
        unReadMessage: 4,
        seen: true,
        userSend: false,
        group: false,
        sender: "gruptan gönderdi",
        lastSeen: new Date(2022, 2, 13, 13, 50, 40, 0),
        messages: [],
      },
      {
        senderEMail: "kgffdvvvvvjhsa@gmail.com",
        senderName: "Tuğba",
        profilePhoto:
          "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        lastMessage: " orada görüşürüz :) ben eve geldim.",
        lastMessageTime: new Date(2022, 2, 5, 23, 0, 0, 0),
        unReadMessage: 0,
        seen: true,
        userSend: false,
        group: false,
        sender: "gruptan gönderdi",
        lastSeen: new Date(2022, 2, 13, 13, 45, 40, 0),
        messages: [],
      },
      {
        senderEMail: "bnbnnb@gmail.com",
        senderName: "birol",
        profilePhoto:
          "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        lastMessage: "ben eve geldim. orada görüşürüz :)",
        lastMessageTime: new Date(2022, 2, 2, 20, 33, 30, 0),
        unReadMessage: 3,
        seen: true,
        userSend: false,
        group: false,
        sender: "gruptan gönderdi",
        lastSeen: new Date(2022, 2, 13, 13, 50, 55, 0),
        messages: [],
      },
      {
        senderEMail: "ffghh@gmail.com",
        senderName: "birol",
        profilePhoto:
          "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        lastMessage: "ben eve geldim. orada görüşürüz :)",
        lastMessageTime: new Date(2022, 2, 3, 10, 30, 30, 0),
        unReadMessage: 3,
        seen: true,
        userSend: false,
        group: false,
        sender: "gruptan gönderdi",
        lastSeen: new Date(2022, 2, 13, 11, 50, 40, 0),
        messages: [],
      },
      {
        senderEMail: "rtrtrt@gmail.com",
        senderName: "Tuğba",
        profilePhoto:
          "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        lastMessage: " orada görüşürüz :) ben eve geldim.",
        lastMessageTime: new Date(2022, 2, 6, 11, 33, 30, 0),
        unReadMessage: 0,
        seen: true,
        userSend: false,
        group: false,
        sender: "gruptan gönderdi",
        lastSeen: new Date(2022, 2, 5, 13, 50, 40, 0),
        messages: [],
      },
      {
        senderEMail: "uyuyyy@gmail.com",
        senderName: "birol",
        profilePhoto:
          "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        lastMessage: "ben eve geldim. orada görüşürüz :)",
        lastMessageTime: new Date(2022, 2, 2, 20, 33, 30, 0),
        unReadMessage: 3,
        seen: true,
        userSend: false,
        group: false,
        sender: "gruptan gönderdi",
        lastSeen: new Date(2022, 1, 13, 13, 50, 40, 0),
        messages: [],
      },
    ],
  };


  const [myMessage, setMyMessage] = useState("");

  useEffect(() => {
    autosize(document.getElementById("textarea"));
  }, [myMessage]);

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
