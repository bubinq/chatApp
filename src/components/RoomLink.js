import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";
import { RoomContext } from "../contexts/roomContext";

export const RoomLink = ({ chatRoom, togglePopUp }) => {
  const [hasPass, setIsPrivate] = useState(false);
  const { toggleLoginModal } = useContext(RoomContext);
  const { authUser } = useContext(AuthContext);
  
  useEffect(() => {
    if (chatRoom.isPrivate) {
      setIsPrivate(true);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {authUser ? (
        <>
          {hasPass ? (
            <Link to={`/chatroom/${chatRoom.id}`} onClick={togglePopUp}>
              {" "}
              {chatRoom.name} &#128274;{" "}
            </Link>
          ) : (
            <Link to={`/chatroom/${chatRoom.id}`}> {chatRoom.name} </Link>
          )}
        </>
      ) : (
        <>
          {hasPass ? (
            <Link to={`/`} onClick={() => toggleLoginModal()}>
              {" "}
              {chatRoom.name} &#128274;{" "}
            </Link>
          ) : (
            <Link to={`/`} onClick={() => toggleLoginModal()}>
              {" "}
              {chatRoom.name}{" "}
            </Link>
          )}
        </>
      )}
    </>
  );
};
