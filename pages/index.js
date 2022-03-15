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
import HomePage from "../components/HomePage";
import { WhatsAppIcon } from "../components/icons";

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
      dispatch({
        type: "LOGIN",
        payload: [user.displayName, user.email, user.photoURL],
      });
    } else {
      dispatch({ type: "LOGOUT", payload: "" });
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

  const logOut = () => {
    auth.signOut();
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
              Please LOGIN and send start a messaging..
            </p>
            <button
              onClick={login}
              className="border p-2 rounded-xl bg-green_300  "
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
