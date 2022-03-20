import dataURItoBlob from '../services/dataURItoBlob';
import blob2AudioBuffer from '../services/blob2AudioBuffer';

export class Player {
  private _dataURI: string = '';
  private _sourceNode: AudioBufferSourceNode | null = null;
  private _audioContext: AudioContext | null = null;
  private _handleOnEnd: () => void = () => {};
  private _setErrMsg: (value: string) => void = () => {};

  constructor(setErrMsg: (value: string) => void) {
    this._setErrMsg = setErrMsg;
  }

  set audioContext(value: AudioContext) {
    this._audioContext = value;
  }
  set dataURI(value: string) {
    this._dataURI = value;
  }
  set handleOnEnd(value: () => void) {
    this._handleOnEnd = value;
  }
  async play() {
    if (!this._audioContext || !this._dataURI) return;
    const audioContext = this._audioContext;

    const blob = dataURItoBlob(this._dataURI);

    const audioBuffer = await blob2AudioBuffer({
      data: blob,
      audioContext,
    });

    // 一時停止状態の解除
    if (audioContext.state === 'suspended') {
      audioContext.resume();
    }

    try {
      const sourceNode = audioContext.createBufferSource();
      sourceNode.buffer = audioBuffer;

      sourceNode.connect(audioContext.destination);
      sourceNode.onended = this._handleOnEnd;

      sourceNode.start(0);
      this._sourceNode = sourceNode;
    } catch (e) {
      this._setErrMsg(String(e));
    }
  }

  stop() {
    if (!this._sourceNode) return;
    this._sourceNode.stop(0);
    // AudioBufferSourceNodeは使い捨て
    this._sourceNode = null;
  }
}
