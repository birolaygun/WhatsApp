import Head from "next/head";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import db, { auth, provider, storage } from "../firebase";

import HomePage from "../components/HomePage";
import { WhatsAppIcon } from "../components/icons";

export default function Home() {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state);

  // db always reflesh

  const [user, setUser] = useState(null);
  const [list, setList] = useState({});
  const [dbUsers, setDbUsers] = useState([]);
  const [dbConnections, setDbConnections] = useState([]);
  const [dbUserCount, setDbUserCount] = useState();
  const [dbConnectionCount, setDbConnectionCount] = useState();

  useEffect(() => {
    db.collection("data").onSnapshot((ss) => {
      setList(
        ss.docs.map((person) => {
          return { id: person.id, data: person.data() };
        })
      );
    });
  }, []);

  useEffect(() => {
    if (list[0]?.data?.connection) {
      setDbConnections(list[0]?.data?.connection);
    }

    if (list[0]?.data?.users) {
      setDbUsers(list[0]?.data?.users);
    }

    if (list[0]?.data?.users) {
      setDbUserCount(list[0]?.data?.userCount);
    }
    if (list[0]?.data?.users) {
      setDbConnectionCount(list[0]?.data?.connectionCount);
    }
  }, [list]);

  useEffect(() => {
    if (dbUsers && dbConnections)
      dispatch({
        type: "REFLESH_DATAS",
        payload: [dbUsers, dbConnections, dbUserCount, dbConnectionCount],
      });
  }, [dbUsers, dbConnections, dbUserCount, dbConnectionCount]);

  // login

  const login = () => {
    auth.signInWithPopup(provider).catch((e) => console.log(e));
  };

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });
  }, []);


  useEffect(() => {
    if (user && data.dbUsers) {
      if (data.dbUsers.find((fn) => fn.userMail === user.email)) {
        dispatch({
          type: "LOGIN",
          payload: data.dbUsers.find((fn) => fn.userMail === user.email),
        });
      } else {
        if (
          Object.entries(data.dbUsers).length === data.dbUsersCount &&
          Object.entries(data.dbConnections).length === data.dbConnectionCount
        ) {
          db.collection("data")
            .doc("SNA9FltXA8h6x6xlt1Ml")
            .update({
              connection: data.dbConnections,
              users: [
                ...data.dbUsers,
                {
                  authName: user.displayName,
                  authPhoto: user.photoURL,

                  lastSeen: "",
                  login: false,
                  profileName: "",
                  profilePhoto: "",
                  userMail: user.email,
                },
              ],
              userCount: dbUserCount + 1,
            });
        }
      }
    }
  }, [user, data.dbUsers]);

  const logOut = () => {
    auth.signOut();
    dispatch({ type: "LOGOUT", payload: "" });
  };

  return (
    <div>
      <button
        className="absolute text-iceWhite opacity-10 z-50"
        onClick={() => {
          console.log(data);
        }}
      >
        redux
      </button>

      <Head>
        <title>WhatsApp</title>
        <meta name="description" content="It's an education App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="">
        {data.login ? (
          <div className="flex flex-col items-center">
            <HomePage logOut={logOut} />
          </div>
        ) : (
          <div className="bg-gray_500 w-full h-full absolute flex items-center justify-center flex-col">
            <div className="text-iceWhite bg-green_300 rounded-lg rounded-tr-3xl rounded-bl-3xl w-32 h-32 p-4 flex items-center justify-center">
              {WhatsAppIcon}
            </div>
            <p className="m-5 text-iceWhite max-w-md text-center">
              This is not real WhatsApp. It's Birol Aygun's edication project.
              Please LOGIN and start messaging..
            </p>
            <button
              onClick={login}
              className="border p-2 rounded-xl bg-green_400  "
            >
              {" "}
              Login With Google{" "}
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
