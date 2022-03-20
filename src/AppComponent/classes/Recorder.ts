export class Recorder {
  private _audioElem = new Audio();
  private _audioContext: AudioContext | null = null;
  private _mediaRecorder: MediaRecorder | null = null;
  private _handleOnDataAvailable: (event: BlobEvent) => void = () => {};

  set audioContext(value: AudioContext) {
    this._audioContext = value;
  }

  set handleOnDataAvailable(value: (event: BlobEvent) => void) {
    this._handleOnDataAvailable = value;
  }

  async start() {
    if (!navigator.mediaDevices || !this._audioContext) return;
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false,
    });
    // AudioElementと連携（マイクを切る処理のため）
    this._audioElem.srcObject = stream;

    const mediaRecorder = new MediaRecorder(stream);

    // データが入力されたら、audioBufferを作成
    mediaRecorder.ondataavailable = this._handleOnDataAvailable;
    mediaRecorder.start();
    this._mediaRecorder = mediaRecorder;
  }

  stop() {
    if (!this._mediaRecorder) return;
    this._mediaRecorder.stop();
    const stream = this._audioElem.srcObject as MediaStream;
    stream.getTracks().forEach((track) => {
      track.stop();
    });
    // ブラウザのマイク使用中の表示を消すために必要
    this._audioElem.srcObject = null;
    this._mediaRecorder = null;
  }
}
