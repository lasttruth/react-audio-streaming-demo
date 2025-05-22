import React, {useEffect, useState} from 'react'

export default function AudioDeviceSelector({onInputChange, onOutputChange}) {
    const [devices, setDevices] = useState({ input: [], output: [] });

    useEffect(() => {
        async function getDevices() {
            const stream = await navigator.mediaDevices.getUserMedia();
            const allDevice = await navigator.mediaDevices.enumerateDevices();
            const input = allDevice.filter(device => device.kind === 'audioinput');
            const output = allDevice.filter(device => device.kind === 'audiooutput');
            setDevices({input, output});
        }

        getDevices();
    }, [])

  return (
    <div>
      <label>Microphone:</label>
      <select onChange={(e) => onInputChange(e.target.value)}>
        {devices.input.map(device => (
          <option key={device.deviceId} value={device.deviceId}>{device.label || 'Mic'}</option>
        ))}
      </select>

      <label>Speaker:</label>
      <select onChange={(e) => onOutputChange(e.target.value)}>
        {devices.output.map(device => (
          <option key={device.deviceId} value={device.deviceId}>{device.label || 'Speaker'}</option>
        ))}
      </select>
    </div>
  )
}
