import React, { FC, useRef, useState } from "react";
import { CameraComp } from "./components/camera/camera";
import { CameraSelectComp } from "./components/camera/select";
import { FaceCameraComp } from "./components/camera/face";

const App: FC = () => {
  const [deviceId, setDeviceId] = useState<string>();
  const videoRef = useRef<HTMLVideoElement>(null);

  const onSelect = (deviceId: string) => {
    setDeviceId(deviceId);
  };

  return (
    <div>
      {deviceId ? (
        <FaceCameraComp
          constraints={{ video: { deviceId } }}
          videoRef={videoRef}
        />
      ) : null}
      <CameraSelectComp onSelect={onSelect} />
    </div>
  );
};

export default App;
