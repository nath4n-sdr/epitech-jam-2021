import React, {FC, useState} from "react";
import {CameraComp} from "./components/camera/camera";
import {CameraSelect} from "./components/camera/select";

const App: FC = () => {
  const [deviceId, setDeviceId] = useState<string>();

  const onSelect = (deviceId: string) => {
    setDeviceId(deviceId);
  }

  return (
    <div>
      {deviceId ? <CameraComp constraints={{video: {deviceId}}}/> : null}
      <CameraSelect onSelect={onSelect}/>
    </div>
  )
}

export default App;
