export class Player {
  private _sourceNode: AudioBufferSourceNode | null = null;
  private _audioBuffer: AudioBuffer | null = null;
  private _audioContext: AudioContext | null = null;
  private _handleOnEnd: (() => void) | null = null;

  set audioContext(value: AudioContext) {
    this._audioContext = value;
  }
  set audioBuffer(value: AudioBuffer) {
    this._audioBuffer = value;
  }
  set handleOnEnd(value: () => void) {
    this._handleOnEnd = value;
  }
  play() {
    if (!this._audioContext || !this._audioBuffer) return;
    const audioContext = this._audioContext;
    const audioBuffer = this._audioBuffer;

    // 一時停止状態の解除
    if (audioContext.state === 'suspended') {
      audioContext.resume();
    }

    const sourceNode = audioContext.createBufferSource();
    sourceNode.buffer = audioBuffer;

    sourceNode.connect(audioContext.destination);
    sourceNode.onended = () => {
      !!this._handleOnEnd && this._handleOnEnd();
    };
    sourceNode.start(0);
    this._sourceNode = sourceNode;
  }

  stop() {
    if (!this._sourceNode) return;
    this._sourceNode.stop(0);
    // AudioBufferSourceNodeは使い捨て
    this._sourceNode = null;
  }
}
