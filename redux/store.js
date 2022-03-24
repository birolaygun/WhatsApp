import { createStore, combineReducers } from "redux";
import { createWrapper } from "next-redux-wrapper";
import { useEffect } from "react";
import db, { auth, provider, storage } from "../firebase";

const STATE = {
  id: "SNA9FltXA8h6x6xlt1Ml",
  login: false,
  user: {},
  dbUsers: [],
  dbConnections: [],
  dbConnectionCount: -1,
  dbUsersCount: -1,

  selectedCon: "",
  showModal: false,
  photoModal: false,
  mediaModal: false,
  mediaModalUrl: "",
  showDropDown: false,
  friendsMail: "",
};

const data = function reducer(state = STATE, action) {
  switch (action.type) {
    case "REFLESH_DATAS": {
      if (action.payload) {
        return {
          ...state,
          dbUsers: action.payload[0],
          dbConnections: action.payload[1],
          dbConnectionCount: action.payload[3],
          dbUsersCount: action.payload[2],
        };
      }
    }

    case "LOGIN": {
      return {
        ...state,
        user: Object(action.payload),
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
        selectedCon: state.dbUsers.find(
          (cnn) => cnn.userMail === action.payload
        ),
      };
    }

    case "CLEAR_SELECTED_CON": {
      return {
        ...state,
        selectedCon: "",
      };
    }

    case "SHOW_MODAL": {
      return {
        ...state,
        showModal: true,
      };
    }
    case "SHOW_MEDIAMODAL": {
      console.log(action);
      return {
        ...state,
        mediaModal: true,
        mediaModalUrl: action.payload,
      };
    }
    case "HIDE_MEDIAMODAL": {
      return {
        ...state,
        mediaModal: false,
        mediaModalUrl: "",
      };
    }
    case "SHOW_PHOTOMODAL": {
      return {
        ...state,
        photoModal: true,
      };
    }
    case "HİDE_MODAL": {
      return {
        ...state,
        showModal: false,
        friendsMail: "",
      };
    }
    case "HİDE_PHOTOMODAL": {
      return {
        ...state,
        photoModal: false,
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

const combineReducer = combineReducers({
  data,
});

const initialStore = () => {
  return createStore(combineReducer);
};

export const wrapper = createWrapper(initialStore);
