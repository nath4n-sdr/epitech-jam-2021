import React, { FC, useRef, useState } from "react";
import { CameraSelectComp } from "./components/camera/select";
import { FaceCamera2Comp } from "./components/camera/face-camera-2";
import { FaceVideoComp } from "./components/camera/face-video";

const App: FC = () => {
  const [deviceId, setDeviceId] = useState<string>();
  const videoRef = useRef<HTMLVideoElement>(null);

  const onSelect = (deviceId: string) => {
    setDeviceId(deviceId);
  };

  return (
    <div>
      <FaceVideoComp url={"images/monkey2.mp4"} />
      <FaceVideoComp url={"images/monkey3.mp4"} />
      {deviceId ? (
        <FaceCamera2Comp
          constraints={{ video: { deviceId } }}
          videoRef={videoRef}
        />
      ) : null}
      <CameraSelectComp onSelect={onSelect} />
    </div>
  );
};

export default App;
