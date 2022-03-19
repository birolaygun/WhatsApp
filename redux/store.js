import { createStore, combineReducers } from "redux";
import { createWrapper } from "next-redux-wrapper";
import { useEffect } from "react";

const STATE = {
  id: "SNA9FltXA8h6x6xlt1Ml",

  login: false,
  userEMail: "sdf",
  userName: "sdfff",
  userPictureUrl: "dsf",

  chatsBadge: 11,
  profileName: "",
  profilePhoto: "",
  userProfileName: "sdf",
  userProfilePhotoUrl: "fds",

  user: {},
  dbUsers: [],
  dbConnections: [],

  selectedCon: "",
  showModal: false,
  showDropDown: false,
  friendsMail: "",

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

const data = function reducer(state = STATE, action) {
  switch (action.type) {
    case "REFLESH_DATAS": {
      if (action.payload) {
        // console.log(action.payload);
        return {
          ...state,
          dbUsers: action.payload[0],
          dbConnections: action.payload[0],
        };
      }
    }

    case "LOGIN": {
      return {
        ...state,

        userName: action.payload[0],
        userEMail: action.payload[1],
        userPictureUrl: action.payload[2],

        user: {
          name: action.payload[0],
          eMail: action.payload[1],
          photo: action.payload[2],
        },
        login: true,
      };
    }

    case "LOGOUT": {
      return {
        ...state,
        user: {},
        login: false,
      };
    }

    case "SELECT_CON": {
      return {
        ...state,
        selectedCon: state.connects.find(
          (cnn) => cnn.senderEMail === action.payload
        ),
      };
    }

    case "CLEAR_SELECTED_CON": {
      return {
        ...state,
        selectedCon: "",
      };
    }

    case "SEND_MESSAGE": {
      if (state.selectedCon) {
        let aa = state.connects.map((cnn) => {
          if (cnn.senderEMail !== state.selectedCon.senderEMail) {
            return cnn;
          } else {
            return {
              ...cnn,
              messages: [
                ...cnn.messages,
                {
                  userSend: true,
                  time: new Date(),
                  message: action.payload,
                  seen: false,
                },
              ],
            };
          }
        });

        console.log(aa);
      }

      return {
        ...state,
        connects: aa,
      };
    }

    case "SHOW_MODAL": {
      return {
        ...state,
        showModal: true,
      };
    }
    case "HİDE_MODAL": {
      return {
        ...state,
        showModal: false,
        friendsMail: "",
      };
    }
    case "SET_FRIENDS_MAIL": {
      return {
        ...state,
        friendsMail: action.payload,
      };
    }
    case "SHOW_DROPDOWN": {
      return {
        ...state,
        showDropDown: true,
      };
    }
    case "HİDE_DROPDOWN": {
      return {
        ...state,
        showDropDown: false,
      };
    }
    case "ADD_FRİEND": {
      return {
        ...state,
        connects: [
          ...state.connects,
          {
            senderEMail: action.payload,
            senderName: "buu",
            profilePhoto:
              "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
            lastMessage: "buuuu :)",
            lastMessageTime: new Date(2022, 2, 15, 10, 30, 30, 0),
            unReadMessage: 4,
            seen: true,
            userSend: false,
            group: true,
            sender: "gruptan gönderdi",
            lastSeen: new Date(2022, 2, 13, 13, 50, 40, 0),
            messages: [],
          },
        ],
      };
    }

    default:
      return state;
  }
};

// messages: [
//   {
//     userSend: true,
//     time: new Date(2022, 2, 13, 17, 51, 40, 0),
//     message:
//       " hello World  hello Worldhello Worldhello Worldhello Worldhello World hello Worldhello Worldhello Worldhello Worldhello World!!",
//     seen: false,
//   },

const combineReducer = combineReducers({
  data,
});

const initialStore = () => {
  return createStore(combineReducer);
};

export const wrapper = createWrapper(initialStore);
