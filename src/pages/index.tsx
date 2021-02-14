import React, { FC } from "react";
import Webcam from "react-webcam";
import { useHistory } from "react-router-dom";

const Index: FC = () => {
  const history = useHistory();

  function handleMedia() {
    history.push("/play");
  }
  return (
    <div className="welcome-page">
      <Webcam onUserMedia={handleMedia} />;
      <img src="./medias/MONKE.gif" alt="logo" className="responsive" />
    </div>
  );
};

export default Index;
