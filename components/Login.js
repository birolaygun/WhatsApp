import React from "react";
import db, { auth, provider, storage } from "../firebase";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const Login = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state);

  const [user, setUser] = useState({});

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
    if (user) {
      dispatch({
        type: "LOGIN",
        payload: [user.displayName, user.email, user.photoURL],
      });
    }
  }, [user]);

  return (
    <div>
      {data.login ? (
        <div>
          <button
            onClick={() => {
              auth.signOut();
              dispatch({
                type: "LOGOUT",
              });
            }}
            className="border p-2 rounded-md bg-red-600 text-white"
          >
            Log Out
          </button>
        </div>
      ) : (
        <div>
          <button
            onClick={login}
            className="border p-2 rounded-md bg-blue-600 text-white"
          >
            {" "}
            Login With Google{" "}
          </button>
        </div>
      )}
    </div>
  );
};

export default Login;
