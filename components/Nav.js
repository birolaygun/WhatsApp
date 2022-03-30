import { camera, plus, search, treeDats } from "./icons";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Dropdown from "./Dropdown";
import { useEffect, useState } from "react";

const Nav = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state);

  const [unreadPersonCount, setUnreadPersonCount] = useState();

  useEffect(() => {
    setUnreadPersonCount(
      Object.entries(
        data.dbConnections
          ?.filter((fl) => {
            return (
              fl.sides[0].user === data.user.userMail ||
              fl.sides[1].user === data.user.userMail
            );
          })
          .filter((fin) => {
            return fin.messages.some(
              (sm) => sm.writer !== data.user.userMail && sm.seen === false
            );
          })
      ).length
    );
  }, [data.dbConnections]);

  console.log(
    data.user.profilePhoto ? data.user.profilePhoto : data.user.authPhoto
  );

  return (
    <div>
      <div className="px-3 pt-3 bg-gray_500 text-iceWhite border-b  space-y-4 border-iceWhite border-opacity-20 h-[87px] md:hidden">
        <div className="flex items-center justify-between">
          <div className="font-bold text-lg">WhatsApp</div>
          <div className="flex items-center space-x-5 font-bold">
            <div
              className="cursor-pointer mr-11 mt-1"
              onClick={() => {
                setTimeout(() => {
                  dispatch({
                    type: "SHOW_MODAL",
                  });
                }, 1);
              }}
            >
              {plus}
            </div>
            <div className="absolute  right-4 mt-3">
              <Dropdown />
            </div>
          </div>
        </div>
        <div className="flex items-center ">
          <div className="mb-2">{camera}</div>

          <div className="flex items-center justify-between w-full px-3">
            <div className="flex items-center px-2 border-b-2 border-green_400 pb-1">
              CHATS{" "}
              {unreadPersonCount > 0 && (
                <span
                  className={` ${
                    data.chatsBadge < 100 ? "h-4 w-4" : "h-5 w-5"
                  } text-gray_900 ml-2  bg-green_400 rounded-full p-1 text-[10px] flex items-center justify-center`}
                >
                  {unreadPersonCount}
                </span>
              )}
            </div>
            <div>STATUS</div>
            <div>CALLS</div>
          </div>
        </div>
      </div>{" "}
      <div
        className="px-3  bg-gray_500 text-iceWhite 
      space-y-4 border-b  border-iceWhite border-opacity-20 h-[87px] 
      hidden md:flex items-center justify-between"
      >
        <img
          className="w-12 h-12 rounded-full"
          src={
            data.user.profilePhoto
              ? data.user.profilePhoto
              : data.user.authPhoto
          }
          alt=""
        />
        <div className="text-iceWhite flex items-center space-x-5">
          <div
            className="mb-3 cursor-pointer"
            onClick={() => {
              setTimeout(() => {
                dispatch({
                  type: "SHOW_MODAL",
                });
              }, 0);
            }}
          >
            {plus}
          </div>
          <Dropdown />
        </div>
      </div>{" "}
    </div>
  );
};

export default Nav;
