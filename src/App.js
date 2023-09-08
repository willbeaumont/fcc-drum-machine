import React, { useEffect, useRef, useState } from 'react';
import './index.css';

const drumKeys = [
  {
    name: "q",
    audio: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
    description: "Heater 1"
  },
  {
    name: "w",
    audio: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
    description: "Heater 2"
  },
  {
    name: "e",
    audio: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
    description: "Heater 3"
  },
  {
    name: "a",
    audio: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
    description: "Heater 4"
  },
  {
    name: "s",
    audio: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
    description: "Clap"
  },
  {
    name: "d",
    audio: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
    description: "Open-HH"
  },
  {
    name: "z",
    audio: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
    description: "Closed-HH"
  },
  {
    name: "x",
    audio: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
    description: "Kick-n'-Hat"
  },
  {
    name: "c",
    audio: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
    description: "Kick"
  }
]

function hitIt(btn, updateName, name, volume) {
  updateName(name);
  btn.currentTime = 0;
  btn.play();
  btn.volume = volume;
};

function DrumPad(props) {
  const ref = useRef(null);

  const playKey = () => {
    hitIt(ref.current, props.setKeyName, props.drumKey.description, props.volume);
  }

  return (
    <button
      className="drum-pad bg-teal-500 hover:bg-teal-600 w-16 h-16 border border-sky-900 rounded-md"
      id={props.drumKey.description}
      type="button"
      onClick={playKey}>
      {props.drumKey.name.toUpperCase()}
      <audio
        ref={ref}
        className="clip"
        id={props.drumKey.name.toUpperCase()}
        src={props.drumKey.audio}
        desc={props.drumKey.description}
      />
    </button>
   );
}

function Drums(props) {
  return (
    <div className="bg-teal-300 w-72 h-72 grid grid-cols-3 place-items-center">
      {drumKeys.map(drumKey => {
        return <DrumPad drumKey={drumKey} key={drumKey.name} volume={props.volume} setKeyName={props.setKeyName} />;
      })}
    </div>
  );
}

function Display(props) {
  return (
    <div id="display" className="bg-teal-400 w-72 h-72 py-4 flex flex-col items-center place-content-around">
      <h1 className="text-3xl">Drum Machine</h1>
      <div className="flex flex-col items-center">
        <h2 className="text-xl p-1">Sound Name</h2>
        <div className="bg-teal-100 w-full h-7 text-center border border-sky-900 rounded-md">
          <p className="text-lg">{props.keyName}</p>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <h2 className="text-xl p-1">Volume</h2>
        <div>
          <input
            type="range"
            min="0" max="1" step="0.01"
            value={props.volume}
            onChange={(e) => props.setVolume(e.target.value)}
            className="w-full h-2 bg-gray-300 appearance-none cursor-pointer accent-sky-900" />
        </div>
      </div>
    </div>
  );
}

function DrumMachine(props) {
  return (
    <div id="drum-machine" className="m-auto border-4 border-sky-900 divide-y-4 md:divide-x-4 md:divide-y-0 divide-sky-900 rounded-md flex flex-col md:flex-row">
      <Display keyName={props.keyName} volume={props.volume} setVolume={props.setVolume} />
      <Drums setKeyName={props.setKeyName} volume={props.volume} />
    </div>
  );
}

function App() {
  const [keyName, setKeyName] = useState("");
  const handleKeyDown = (e) => {
    if (drumKeys.map(k => k.name).includes(e.key.toLowerCase())) {
      const btn = document.getElementById(e.key.toUpperCase())
      hitIt(btn, setKeyName, btn.getAttribute("desc"), volume);
    };
  };

  const [volume, setVolume] = useState(1);

  const ref = useRef(null);

  useEffect(() => {
    ref.current.focus();
  });

  return (
    <div ref={ref} tabIndex={-1} onKeyDown={handleKeyDown} className="bg-teal-100 w-screen h-screen flex text-sky-900">
      <DrumMachine keyName={keyName} setKeyName={setKeyName} volume={volume} setVolume={setVolume} />
    </div>
  );
}

export default App;