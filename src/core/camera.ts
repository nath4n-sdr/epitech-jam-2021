export class Camera {
  constraints: MediaStreamConstraints;

  constructor(constraints: MediaStreamConstraints) {
    this.constraints = constraints;
  }

  private _stream?: MediaStream;

  get stream(): MediaStream | undefined {
    return this._stream;
  }

  static async getDeviceIds(): Promise<string[]> {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const cameraDevices = devices.filter((device) => {
      return device.kind === "videoinput";
    });

    return cameraDevices.map((device) => device.deviceId);
  }

  async start(): Promise<void> {
    this._stream = await navigator.mediaDevices.getUserMedia(this.constraints);
  }

  async stop(): Promise<void> {
    this._stream?.getTracks().forEach((track) => track.stop());
  }
}
