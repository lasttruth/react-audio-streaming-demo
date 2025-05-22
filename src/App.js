import React, { useState, useRef } from 'react';
import AudioDeviceSelector from './components/AudioDeviceSelector';

function App() {
  const [inputId, setInputId] = useState(null);
  const [outputId, setOutputId] = useState(null);
  const audioRef = useRef(null);
  const localStreamRef = useRef(null);

  const startStream = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: { deviceId: inputId ? { exact: inputId } : undefined }
    });

    localStreamRef.current = stream;
    audioRef.current.srcObject = stream;

    // Try setting output if supported
    if (outputId && audioRef.current.setSinkId) {
      try {
        await audioRef.current.setSinkId(outputId);
      } catch (err) {
        console.error('Error setting sinkId:', err);
      }
    }
  };

  return (
    <div>
      <h1>Audio Streaming</h1>
      <AudioDeviceSelector
        onInputChange={setInputId}
        onOutputChange={setOutputId}
      />
      <button onClick={startStream}>Start Stream</button>
      <audio ref={audioRef} autoPlay controls />
    </div>
  );
}

export default App;
