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

function hitIt(btn, updateName, name) {
  updateName(name);
  btn.pause();
  btn.currentTime = 0;
  btn.play();
};

function DrumPad(props) {
  const ref = useRef(null);

  const playKey = () => {
    hitIt(ref.current, props.setKeyName, props.drumKey.description);
  }

  return (
    <button
      className="drum-pad bg-slate-300 w-20 h-20"
      id={props.drumKey.description}
      type="button"
      onClick={playKey}>
      {props.drumKey.name.toUpperCase()}
      <audio ref={ref} className="clip" id={props.drumKey.name.toUpperCase()} src={props.drumKey.audio} desc={props.drumKey.description} />
    </button>
   );
}

function Drums(props) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {drumKeys.map(drumKey => {
        return <DrumPad drumKey={drumKey} key={drumKey.name} setKeyName={props.setKeyName} />;
      })}
    </div>
  );
}

function Display(props) {
  return (
    <div>
      <div id="display" className="bg-white">
        {props.keyName}
      </div>
    </div>
  );
}


function DrumMachine(props) {
  return (
    <div id="drum-machine" className="bg-slate-600 p-4 m-auto flex flex-row">
      <Drums setKeyName={props.setKeyName} />
      <Display keyName={props.keyName} className="w-70 h-70"/>
    </div>
  );
}

function App() {
  const [keyName, setKeyName] = useState("");
  const handleKeyDown = (e) => {
    if (drumKeys.map(k => k.name).includes(e.key.toLowerCase())) {
      const btn = document.getElementById(e.key.toUpperCase())
      hitIt(btn, setKeyName, btn.getAttribute("desc"));
    };
  };

  const ref = useRef(null);

  useEffect(() => {
    ref.current.focus();
  }, []);

  return (
    <div ref={ref} tabIndex={-1} onKeyDown={handleKeyDown} className="bg-slate-200 h-screen w-screen flex">
      <DrumMachine className="bg-slate-500 flex" keyName={keyName} setKeyName={setKeyName} />
    </div>
  );
}

export default App;