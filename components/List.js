import React from "react";
import SelectToWrite from "./SelectToWrite";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const List = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state);

  function compare(b, a) {
    if (a.messages.slice(-1)[0]?.time < b.messages.slice(-1)[0]?.time) {
      return -1;
    }
    if (a.messages.slice(-1)[0]?.time > b.messages.slice(-1)[0]?.time) {
      return 1;
    }
    return 0;
  }


  return (
    <div className="  heightCalc scrollbar  hover:scrollbar-thumb-gray_500 scrollbar-thin">
      {data.dbConnections
        .filter((fl) => fl.sides.some((mpp) => mpp.user === data.user.userMail))
        .sort(compare)
        .map((connect, i) => {
          let lastMessage = connect.messages?.slice(-1)[0];
          let opposideMail = connect.sides.map((fl) => fl.user).filter((flt) => flt !== data.user.userMail) 

          let oppositeUser = data.dbUsers.find(
            (fn) => fn.userMail == opposideMail
          );


          let unreadMessageCount = connect.messages.filter(
            (fl) => fl.writer !== data.user.userMail && fl.seen === false
          ).length;

          console.log(
            connect.messages.filter(
              (fl) => fl.writer !== data.user.userMail && fl.seen === false
            )
          );

          return (
          
            <SelectToWrite
              key={i}
              senderEMail={oppositeUser?.userMail}
              senderName={
                oppositeUser.profileName
                  ? oppositeUser.profileName
                  : oppositeUser.authName
              }
              profilePhoto={
                oppositeUser.profilePhoto
                  ? oppositeUser.profilePhoto
                  : oppositeUser.authPhoto
              }
              lastMessage={lastMessage}
              unReadMessage={unreadMessageCount}
            />
          );
        })}
    </div>
  );
};

export default List;
