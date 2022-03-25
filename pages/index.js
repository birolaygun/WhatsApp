import Head from "next/head";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import db, { auth, provider, storage } from "../firebase";
import { signIn, signOut, useSession } from "next-auth/react";

import HomePage from "../components/HomePage";
import { WhatsAppIcon } from "../components/icons";

import { useBeforeunload } from "react-beforeunload";

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

  // useEffect(() => {
  //   auth.onAuthStateChanged((authUser) => {
  //     if (authUser) {
  //       setUser(authUser);
  //     } else {
  //       setUser(null);
  //     }
  //   });
  // }, []);

  // const logOut = () => {
  //   auth.signOut();
  //   dispatch({ type: "LOGOUT", payload: "" });
  // };

  console.log(data.session);
  useEffect(() => {
    if (data.session.image && data.dbUsers) {
      if (
        data.dbUsers.find((fn) => fn.userMail === data.session.sessionEmail)
      ) {
        console.log("loginnn");
        dispatch({
          type: "LOGIN",
          payload: data.dbUsers.find(
            (fn) => fn.userMail === data.session.sessionEmail
          ),
        });
      } else {
        console.log("loginnn 222");

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
                  authName: data.session.sessionName,
                  authPhoto: data.session.sessionImage,

                  lastSeen: "",
                  login: false,
                  profileName: "",
                  profilePhoto: "",
                  userMail: data.session.sessionEmail,
                },
              ],
              userCount: dbUserCount + 1,
              connectionCount: data.connectionCount,
            });
        }
      }
    }
  }, [data.session]);

  useEffect(() => {
    if (
      Object.entries(data.dbUsers).length === data.dbUsersCount &&
      Object.entries(data.dbConnections).length === data.dbConnectionCount &&
      data.user.login === false
    ) {
      db.collection("data")
        .doc("SNA9FltXA8h6x6xlt1Ml")
        .update({
          connection: data.dbConnections,
          users: data.dbUsers.map((user) => {
            if (user.userMail === data.user.userMail) {
              return { ...user, login: true };
            } else {
              return user;
            }
          }),
          userCount: data.dbUsersCount,
          connectionCount: data.dbConnectionCount,
        });
    }
  }, [data.user]);

  const makeOffline = () => {
    if (
      Object.entries(data.dbUsers).length === data.dbUsersCount &&
      Object.entries(data.dbConnections).length === data.dbConnectionCount &&
      data.user.login === true
    ) {
      db.collection("data")
        .doc("SNA9FltXA8h6x6xlt1Ml")
        .update({
          connection: data.dbConnections,
          users: data.dbUsers.map((user) => {
            if (user.userMail === data.user.userMail) {
              return { ...user, login: false, lastSeen: String(new Date()) };
            } else {
              return user;
            }
          }),
          userCount: data.dbUsersCount,
          connectionCount: data.dbConnectionCount,
        });
    } else {
      console.log("çıkış hatası");
    }
  };

  useBeforeunload(() => {
    makeOffline();
  });

  return (
    <div>
      <Head>
        <title>WhatsApp</title>
        <meta name="description" content="It's an education App" />
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
              This is not real WhatsApp. It is Birol Ayguns edication project.
              Please LOGIN and start messaging..
            </p>
            <button
              onClick={() => signIn()}
              className="border p-2 rounded-xl bg-green_400  "
            >
              {" "}
              Login To Contiue{" "}
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
