export class Camera {
  videoElement: HTMLVideoElement;
  constraints: MediaStreamConstraints;

  private _stream?: MediaStream;

  constructor(videoElement: HTMLVideoElement, constraints: MediaStreamConstraints) {
    this.videoElement = videoElement;
    this.constraints = constraints;
  }

  async start(): Promise<void> {
    try {
      this._stream = await navigator.mediaDevices.getUserMedia(this.constraints);

      this.videoElement.srcObject = this._stream;
    } catch (e) {
      console.log(e);
    }
  }

  async stop() {
    const tracks = this._stream?.getTracks();

    tracks?.forEach((track) => {
      track.stop();
    });
  }

  get stream(): MediaStream | undefined {
    return this._stream;
  }

  static async getDeviceIds(): Promise<string[]> {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const cameraDevices = devices.filter((device) => device.kind === "videoinput");

    return cameraDevices.map((device) => device.deviceId);
  }
}
