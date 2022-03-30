import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { callPhone, leftArrow, search, treeDats, videoCam } from "./icons";

const ConnectNav = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state);
  const [typing, setTyping] = useState(false);

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let time = new Date(data.selectedCon.lastSeen);
  let timeReact;

  if (time) {
    if (time.toDateString() === new Date().toDateString()) {
      timeReact = "Today " + String(new Date().toTimeString().slice(0, 5));
    } else if (
      new Date().toDateString() > time.toDateString() &&
      new Date().getTime() - time.getTime() < 7 * 24 * 60 * 60 * 1000
    ) {
      timeReact = days[time.getDay()];
    } else {
      timeReact = time.toLocaleDateString();
    }
  }

  useEffect(() => {
    if (data.selectedCon) {
      setTyping(
        data.dbConnections
          .filter(
            (connect) =>
              connect.sides
                .map((side) => side.user)
                .includes(data.selectedCon.userMail) &&
              connect.sides
                .map((side) => side.user)
                .includes(data.user.userMail)
          )[0]
          .sides.find((fn) => fn.user === data.selectedCon.userMail).typing
      );
    }
  }, [data.dbConnections, data.selectedCon]);

  return (
    <div>
      {data.selectedCon && (
        <div className=" p-1 md:px-3 h-[87px] border-b bg-gray_500 border-iceWhite border-opacity-20 flex items-center">
          <button
            onClick={() => {
              dispatch({
                type: "CLEAR_SELECTED_CON",
                payload: "",
              });
            }}
            className="md:hidden text-iceWhite flex-grow-0"
          >
            {leftArrow}
          </button>

          <div className="w-fit float-left flex-grow-0">
            {data.selectedCon.profilePhoto || data.selectedCon.authPhoto ? (
              <img
                className="w-12 h-12 rounded-full"
                src={
                  data.selectedCon.profilePhoto
                    ? data.selectedCon.profilePhoto
                    : data.selectedCon.authPhoto
                }
                alt=""
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-blue_100 flex items-center justify-center text-2xl font-semibold">
                {data.selectedCon.userMail[0].toUpperCase()}
              </div>
            )}
          </div>

          <div className="flex-1 flex items-center  justify-between p-3 flex-grow-2 break-words">
            <div className=" overflow-hidden flex flex-col items-start justify-start text-sm md:text-md flex-1 break-words">
              <h2 className="text-iceWhite font-bold whitespace-nowrap text-ellipsis ">
                {data.selectedCon.profileName
                  ? data.selectedCon.profileName
                  : data.selectedCon.authName
                  ? data.selectedCon.authName
                  : data.selectedCon.userMail}
              </h2>
              {typing ? (
                <div className="flex items-center truncate text-ellipsis w-full overflow-hidden text-iceWhite text-opacity-80">
                  typing...
                </div>
              ) : (
                <div className="flex items-center truncate text-ellipsis w-full overflow-hidden text-iceWhite text-opacity-80">
                  {data.selectedCon.login
                    ? "Online"
                    : data.selectedCon.lastSeen
                    ? `last seen: ${timeReact}`
                    : "Not login yet"}
                </div>
              )}
            </div>

            <div className="flex items-center justify-center space-x-7 text-iceWhite text-opacity-80 w-min  ">
              <div className=" hidden md:block"> {videoCam} </div>
              <div className=" "> {callPhone} </div>
              <div className="border-r h-5 hidden md:block"> </div>
              <div className=" hidden md:block"> {search} </div>
              <div className="rotate-90 mt-2 text-lg "> {treeDats} </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConnectNav;