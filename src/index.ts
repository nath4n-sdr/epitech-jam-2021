import {Camera} from "./core/camera";

const cameraId = "camera";
const cameraSelectId = "cameraSelect";
const cameraStartButtonId = "cameraStartButton";
const cameraStopButtonId = "cameraStopButton";

async function main() {
  // DOM Elements
  const cameraElem = document.getElementById(cameraId);
  const cameraSelectElem = document.getElementById(cameraSelectId);
  const cameraStartButtonElem = document.getElementById(cameraStartButtonId);
  const cameraStopButtonElem = document.getElementById(cameraStopButtonId);
  let camera: Camera | undefined;

  if (
    !cameraElem
    || !(cameraElem instanceof HTMLVideoElement)
    || !cameraSelectElem
    || !(cameraSelectElem instanceof HTMLSelectElement)
    || !cameraStartButtonElem
    || !cameraStopButtonElem) return;

  // Camera
  const cameraDeviceIds = await Camera.getDeviceIds();

  const cameraSelectOptionElems = cameraDeviceIds.map((deviceId) => {
    const option = document.createElement("option");

    option.value = deviceId;
    option.innerText = deviceId;

    return option;
  });

  cameraSelectElem.append(...cameraSelectOptionElems);

  // Event functions
  cameraStartButtonElem.onclick = async function () {
    camera = new Camera(cameraElem, {
      video: {
        deviceId: cameraSelectElem.value
      },
    });

    await camera.start();
  }

  cameraStopButtonElem.onclick = async function () {
    await camera?.stop();

    camera = undefined;
  }
}

main().catch(console.error);
