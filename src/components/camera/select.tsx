import React, { FC, useEffect, useRef, useState } from "react";
import { Camera } from "../../core/camera";

type Props = {
  onSelect: (id: string) => void;
};

export const CameraSelectComp: FC<Props> = (props) => {
  const { onSelect } = props;
  const [deviceIds, setDeviceIds] = useState<string[]>([]);
  const selectRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    Camera.getDeviceIds().then((deviceIds) => setDeviceIds(deviceIds));
  }, []);

  const onClick = () => {
    if (selectRef.current) {
      onSelect(selectRef.current.value);
    }
  };

  return (
    <>
      <select ref={selectRef}>
        {deviceIds.map((deviceId) => {
          return (
            <option key={deviceId} value={deviceId}>
              {deviceId}
            </option>
          );
        })}
      </select>
      <button onClick={onClick}>Select</button>
    </>
  );
};
