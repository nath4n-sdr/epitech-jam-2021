import React, { FC, useRef, useState } from "react";
import { CameraSelectComp } from "./components/camera/select";
import { FaceCamera2Comp } from "./components/camera/face-2";

const App: FC = () => {
  const [deviceId, setDeviceId] = useState<string>();
  const videoRef = useRef<HTMLVideoElement>(null);

  const onSelect = (deviceId: string) => {
    setDeviceId(deviceId);
  };

  return (
    <div>
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
