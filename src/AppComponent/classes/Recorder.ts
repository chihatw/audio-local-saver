export class Recorder {
  private _audioElem = new Audio();
  private _audioContext: AudioContext | null = null;
  private _mediaRecorder: MediaRecorder | null = null;
  private _setAudioBuffer: ((audioBuffer: AudioBuffer | null) => void) | null =
    null;

  set audioContext(value: AudioContext) {
    this._audioContext = value;
  }

  set setAudioBuffer(value: (audioBuffer: AudioBuffer | null) => void) {
    this._setAudioBuffer = value;
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
    mediaRecorder.ondataavailable = async (e) => {
      const blob = e.data;
      const audioBuffer = await blobForAudioBuffer({
        data: blob,
        audioContext: this._audioContext!,
      });
      !!this._setAudioBuffer && this._setAudioBuffer(audioBuffer);
    };
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

const blobForAudioBuffer = async ({
  data,
  audioContext,
}: {
  data: Blob;
  audioContext: AudioContext;
}): Promise<AudioBuffer | null> => {
  const chunks: Blob[] = [];
  chunks.push(data);
  const blob = new Blob(chunks, { type: 'audio/ogg; codecs=opus' });
  const arrayBuffer = await blob.arrayBuffer();
  let audioBuffer = null;
  if (!!arrayBuffer) {
    audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    normalize(audioBuffer);
  }
  return audioBuffer;
};

const normalize = (audioBuffer: AudioBuffer) => {
  const audioData = audioBuffer.getChannelData(0);

  let ymax = 0; // 配列内の最大値
  for (let i = 0; i < audioData.length; i++) {
    const y = Math.abs(audioData[i]);
    y > ymax && (ymax = y);
  }

  for (let i = 0; i < audioData.length; i++) {
    // 最大値に対する比率を計算
    audioData[i] /= ymax;
  }
};
