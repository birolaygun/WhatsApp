import { createStore, combineReducers } from "redux";
import { createWrapper } from "next-redux-wrapper";

const STATE = {
  login: false,
  user: {},
  chatsBadge: 311,

  connects:[
    {
      userEMail: "kjsfdkşjhsa@gmail.com",
      userName: "birol buraa",
      profilePhoto: "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      lastMessage: "ben eve geldim. orada görüşürüz :)",
      lastMessageTime: new Date(2022, 2, 1, 10, 30, 30, 0),
      unReadMessage: 4,
      seen: true,
      userSend: false,
      group: true,
      sender: "gruptan gönderdi"
    },
    {
      userEMail: "kjsfdkşjhsa@gmail.com",
      userName: "Tuğba",
      profilePhoto: "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      lastMessage: " orada görüşürüz :) ben eve geldim.",
      lastMessageTime: new Date(2022, 2, 5, 23, 0, 0, 0),
      unReadMessage: 0,
      seen: true,
      userSend: false,
      group: false,
      sender: "gruptan gönderdi"
    },
    {
      userEMail: "kjsfdkşjhsa@gmail.com",
      userName: "birol bu",
      profilePhoto: "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      lastMessage: "ben eve geldim. orada görüşürüz :)",
      lastMessageTime: new Date(2022, 2, 2, 20, 33, 30, 0),
      unReadMessage: 3,
      seen: false,
      userSend: true,
      group: false,
      sender: "gruptan gönderdi"
    },
    {
      userEMail: "kjsfdkşjhsa@gmail.com",
      userName: "birol",
      profilePhoto: "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      lastMessage: "ben eve geldim. orada görüşürüz :)",
      lastMessageTime: new Date(2022, 2, 3, 10, 30, 30, 0),
      unReadMessage: 3,
      seen: false,
      userSend: false,
      group: false,
      sender: "gruptan gönderdi"
    },
    {
      userEMail: "kjsfdkşjhsa@gmail.com",
      userName: "Tuğba",
      profilePhoto: "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      lastMessage: " orada görüşürüz :) ben eve geldim.",
      lastMessageTime: new Date(2022, 2, 7, 11, 33, 30, 0),
      unReadMessage: 0,
      seen: true,
      userSend: true,
      group: false,
      sender: "gruptan gönderdi"
    },
    {
      userEMail: "kjsfdkşjhsa@gmail.com",
      userName: "birol",
      profilePhoto: "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      lastMessage: "ben eve geldim. orada görüşürüz :)",
      lastMessageTime: new Date(2022, 2, 2, 20, 33, 30, 0),
      unReadMessage: 3,
      seen: true,
      userSend: true,
      group: true,
      sender: "gruptan gönderdi"
    },
    {
      userEMail: "kjsfdkşjhsa@gmail.com",
      userName: "birol",
      profilePhoto: "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      lastMessage: "ben eve geldim. orada görüşürüz :)",
      lastMessageTime: new Date(2022, 2, 1, 10, 30, 30, 0),
      unReadMessage: 4,
      seen: true,
      userSend: true,
      group: true,
      sender: "gruptan gönderdi"
    },
    {
      userEMail: "kjsfdkşjhsa@gmail.com",
      userName: "Tuğba",
      profilePhoto: "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      lastMessage: " orada görüşürüz :) ben eve geldim.",
      lastMessageTime: new Date(2022, 2, 5, 23, 0, 0, 0),
      unReadMessage: 0,
      seen: true,
      userSend: false,
      group: false,
      sender: "gruptan gönderdi"
    },
    {
      userEMail: "kjsfdkşjhsa@gmail.com",
      userName: "birol",
      profilePhoto: "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      lastMessage: "ben eve geldim. orada görüşürüz :)",
      lastMessageTime: new Date(2022, 2, 2, 20, 33, 30, 0),
      unReadMessage: 3,
      seen: true,
      userSend: false,
      group: false,
      sender: "gruptan gönderdi"
    },
    {
      userEMail: "kjsfdkşjhsa@gmail.com",
      userName: "birol",
      profilePhoto: "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      lastMessage: "ben eve geldim. orada görüşürüz :)",
      lastMessageTime: new Date(2022, 2, 3, 10, 30, 30, 0),
      unReadMessage: 3,
      seen: true,
      userSend: false,
      group: false,
      sender: "gruptan gönderdi"
    },
    {
      userEMail: "kjsfdkşjhsa@gmail.com",
      userName: "Tuğba",
      profilePhoto: "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      lastMessage: " orada görüşürüz :) ben eve geldim.",
      lastMessageTime: new Date(2022, 2, 7, 11, 33, 30, 0),
      unReadMessage: 0,
      seen: true,
      userSend: false,
      group: false,
      sender: "gruptan gönderdi"
    },
    {
      userEMail: "kjsfdkşjhsa@gmail.com",
      userName: "birol",
      profilePhoto: "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      lastMessage: "ben eve geldim. orada görüşürüz :)",
      lastMessageTime: new Date(2022, 2, 2, 20, 33, 30, 0),
      unReadMessage: 3,
      seen: true,
      userSend: false,
      group: false,
      sender: "gruptan gönderdi"
    },
    {
      userEMail: "kjsfdkşjhsa@gmail.com",
      userName: "birol",
      profilePhoto: "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      lastMessage: "ben eve geldim. orada görüşürüz :)",
      lastMessageTime: new Date(2022, 2, 1, 10, 30, 30, 0),
      unReadMessage: 4,
      seen: true,
      userSend: false,
      group: false,
      sender: "gruptan gönderdi"
    },
    {
      userEMail: "kjsfdkşjhsa@gmail.com",
      userName: "Tuğba",
      profilePhoto: "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      lastMessage: " orada görüşürüz :) ben eve geldim.",
      lastMessageTime: new Date(2022, 2, 5, 23, 0, 0, 0),
      unReadMessage: 0,
      seen: true,
      userSend: false,
      group: false,
      sender: "gruptan gönderdi"
    },
    {
      userEMail: "kjsfdkşjhsa@gmail.com",
      userName: "birol",
      profilePhoto: "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      lastMessage: "ben eve geldim. orada görüşürüz :)",
      lastMessageTime: new Date(2022, 2, 2, 20, 33, 30, 0),
      unReadMessage: 3,
      seen: true,
      userSend: false,
      group: false,
      sender: "gruptan gönderdi"
    },
    {
      userEMail: "kjsfdkşjhsa@gmail.com",
      userName: "birol",
      profilePhoto: "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      lastMessage: "ben eve geldim. orada görüşürüz :)",
      lastMessageTime: new Date(2022, 2, 3, 10, 30, 30, 0),
      unReadMessage: 3,
      seen: true,
      userSend: false,
      group: false,
      sender: "gruptan gönderdi"
    },
    {
      userEMail: "kjsfdkşjhsa@gmail.com",
      userName: "Tuğba",
      profilePhoto: "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      lastMessage: " orada görüşürüz :) ben eve geldim.",
      lastMessageTime: new Date(2022, 2, 7, 11, 33, 30, 0),
      unReadMessage: 0,
      seen: true,
      userSend: false,
      group: false,
      sender: "gruptan gönderdi"
    },
    {
      userEMail: "kjsfdkşjhsa@gmail.com",
      userName: "birol",
      profilePhoto: "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      lastMessage: "ben eve geldim. orada görüşürüz :)",
      lastMessageTime: new Date(2022, 2, 2, 20, 33, 30, 0),
      unReadMessage: 3,
      seen: true,
      userSend: false,
      group: false,
      sender: "gruptan gönderdi"
    },
  ]
};

const data = function reducer(state = STATE, action) {
  switch (action.type) {
    case "INC":
      return { ...state, sayı: state.sayı + action.payload };

    case "DEC":
      return { ...state, sayı: state.sayı - action.payload };

    case "LOGIN": {
      return {
        ...state,
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

    default:
      return state;
  }
};

const combineReducer = combineReducers({
  data,
});

const initialStore = () => {
  return createStore(combineReducer);
};

export const wrapper = createWrapper(initialStore);
