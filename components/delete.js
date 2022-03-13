import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import db, { auth, provider, storage } from "../firebase";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import Login from "../components/Login";

export default function Home() {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [surName, setSurName] = useState("");
  const [updateName, setUpdateName] = useState("");
  const [updateSurName, setUpdateSurName] = useState("");
  const [modal, setModal] = useState(false);
  const [list, setList] = useState([]);
  const [file, setFile] = useState("");
  const [fileList, setFileList] = useState([]);
  const [logined, setLogined] = useState(false);

  //redux hooks
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state);

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
      console.log("user değişti", user.displayName);
      dispatch({
        type: "GET_USER",
        payload: [user.displayName, user.email, user.photoURL],
      });
    }
  }, [user]);

  const sendToDb = (e) => {
    db.collection("personel").add({
      name: name,
      surName: surName,
    });
    setName("");
    setSurName("");
  };

  useEffect(() => {
    db.collection("personel").onSnapshot((ss) => {
      setList(
        ss.docs.map((person) => {
          return { id: person.id, data: person.data() };
        })
      );
    });

    db.collection("pics").onSnapshot((ss) => {
      setFileList(
        ss.docs.map((file) => {
          return { id: file.id, data: file.data() };
        })
      );
    });
  }, []);

  const deleteDoc = (personId) => {
    db.collection("personel").doc(personId).delete();
  };

  const deleteCollection = () => {
    list.forEach((li) => {
      deleteDoc(li.id);
    });
  };

  const updateDoc = (personId) => {
    db.collection("personel").doc(personId).update({
      name: updateName,
      surName: updateSurName,
    });
    setUpdateName("");
    setUpdateSurName("");
    setModal(false);
  };

  // store

  const [progress, setProgress] = useState(0);

  const addFile = (file) => {
    if (file) {
      const storageRef = ref(storage, `${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const prog = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(prog);
        },
        (err) => console.log(err),
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            // console.log(url);

            db.collection("pics").add({
              img: url,
              name: file.name,
            });
          });
        }
      );
    } else {
      return;
    }
  };

  const deleteFile = (id, name) => {
    const desertRef = ref(storage, name);
    deleteObject(desertRef)
      .then(() => {
        // File deleted successfully
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
      });

    db.collection("pics").doc(id).delete();
  };

  const deleteAllFiles = () => {
    fileList.forEach((li) => {
      deleteFile(li.id, li.data.name);
    });
  };

  return (
      <div>
        <Head>
          <title>WhatsApp</title>
          <meta name="description" content="It's an education App" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        {logined ?  <Home /> : <Login />}
        
      </div>
  );
}





<div
className={
  styles.container + " justify-center items-center flex min-h-screen"
}
>

<main className="max-w-xl ">
  <div className="border-2 p-2 m-2 flex flex-col items-center ">
    <h1 className="font-bold text-lg m-3">Redux</h1>
    <div>
      <button
        className="border p-2 rounded-md bg-gray-600 text-white"
        onClick={() => {
          dispatch({ type: "INC", payload: 1 });
        }}
      >
        increase
      </button>
      <button
        className="border p-2 rounded-md bg-gray-600 text-white"
        onClick={() => {
          dispatch({ type: "DEC", payload: 1 });
        }}
      >
        Decrease
      </button>
    </div>
    <h1>{data.user.name}</h1>
  </div>

  <div className="border-2 p-2 m-2 flex flex-col items-center ">
    <h1 className="font-bold text-lg m-3">Auth</h1>
    {user ? (
      <div className="flex flex-col items-center">
        <button
          onClick={() => auth.signOut()}
          className="border p-2 rounded-md bg-red-600 text-white"
        >
          Log Out
        </button>
        <br />
        <h1>
          Hoşgeldin <b>{user.displayName}</b>{" "}
        </h1>
        <h2>
          e-mail: <b>{user.email} </b>{" "}
        </h2>
        <img
          className="rounded-full shadow-lg"
          src={user.photoURL}
          alt=""
        />
      </div>
    ) : (
      // + {auth._delegate.displayName}
      <button
        onClick={login}
        className="border p-2 rounded-md bg-blue-600 text-white"
      >
        {" "}
        Login With Google{" "}
      </button>
    )}
  </div>

  <div className="border-2 p-2 m-2 flex flex-col items-center ">
    <h1 className="font-bold text-lg m-3">Data Base</h1>
    <div className="flex flex-col items-center">
      <input
        className="border m-1 p-1 rounded shadow-sm"
        onChange={(e) => {
          setName(e.target.value);
        }}
        type="text"
        value={name}
      />{" "}
      <input
        className="border m-1 p-1 rounded shadow-sm"
        onChange={(e) => {
          setSurName(e.target.value);
        }}
        type="text"
        value={surName}
      />{" "}
      <button
        className="border p-2 rounded-md bg-green-500 text-white"
        onClick={() => {
          sendToDb();
        }}
      >
        Send It To Data Base
      </button>
      <div>
        <br />
        <div className="flex items-center justify-between w-96 ">
          <h2 className="font-semibold">My Data Base:</h2>
          <button
            onClick={() => {
              deleteCollection();
            }}
            className="border p-1 rounded-md  text-white bg-red-500"
          >
            Delete All
          </button>
        </div>
        <hr /> <br />
        <ul>
          {list.map((person) => {
            return (
              <li
                key={person.id}
                className="flex items-center justify-between border-b"
              >
                {modal && (
                  <div className="bg-black bg-opacity-70  absolute w-full h-full grid items-center justify-center left-0 top-0">
                    <form className="flex flex-col items-center justify-center bg-white p-7 rounded-md">
                      <div className="flex justify-between items-center w-full">
                        <label htmlFor="updateName">Name</label>
                        <input
                          id="updateName"
                          className="border m-1 p-1 rounded shadow-sm"
                          onChange={(e) => {
                            setUpdateName(e.target.value);
                          }}
                          type="text"
                          value={updateName}
                        />{" "}
                      </div>
                      <div className="flex justify-between items-center w-full">
                        <label htmlFor="updateSurName">Surname</label>
                        <input
                          id="updateSurName"
                          className="border m-1 p-1 rounded shadow-sm"
                          onChange={(e) => {
                            setUpdateSurName(e.target.value);
                          }}
                          type="text"
                          value={updateSurName}
                        />{" "}
                      </div>
                      <div>
                        <button
                          type="submit"
                          className="border p-2 rounded-md bg-blue-500 text-white"
                          onClick={() => {
                            updateDoc(person.id);
                          }}
                        >
                          Update
                        </button>
                        <button
                          onClick={() => {
                            setUpdateName("");
                            setUpdateSurName("");
                            setModal(false);
                          }}
                          className="border p-2 rounded-md bg-red-500 text-white"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                )}
                name: <b>{person.data.name} </b> surname:{" "}
                <b>{person.data.surName} </b>{" "}
                <span>
                  <button
                    onClick={() => {
                      setModal(true);
                    }}
                    className="border p-1 rounded-md bg-blue-500 text-white"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-pencil-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => {
                      deleteDoc(person.id);
                    }}
                    className="border p-1 rounded-md bg-red-500 text-white"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-x"
                      viewBox="0 0 16 16"
                    >
                      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                    </svg>
                  </button>
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  </div>

  <div className="border-2 p-2 m-2 flex flex-col items-center mb-8">
    <h1 className="font-bold text-lg m-3">Storage</h1>
    <form
      onSubmit={() => {
        addFile(file);
      }}
      action="#"
    >
      <input
        className="border"
        onChange={(e) => {
          setFile(e.target.files[0]);
        }}
        type="file"
        name=""
        id="fileUpload"
      />
      <button
        className="border p-2 rounded-md bg-blue-500 text-white"
        type="submit"
      >
        Submit
      </button>

      <button
        className="border p-2 rounded-md bg-red-500 text-white"
        onClick={() => {
          deleteAllFiles();
        }}
      >
        {" "}
        Delete All
      </button>
      <br />
      {progress < 100 && progress > 0 && (
        <h1 className="text-center font-semibold">{progress} % </h1>
      )}
    </form>
    <br />
    {fileList.map((photo) => (
      <div
        key={photo.id}
        className="flex items-center border shadow-lg rounded-lg p-1"
      >
        <img
          className="w-72 m-1 shadow-md rounded-lg"
          src={photo.data.img}
          alt=""
        />
        <button
          onClick={() => {
            deleteFile(photo.id, photo.data.name);
          }}
          className="border p-1 rounded-md bg-red-500 text-white m-4 h-14"
        >
          delete
        </button>
      </div>
    ))}
  </div>
</main>
</div>