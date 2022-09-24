import React, { useState } from 'react';
import './index.css';

const name = "clip_name"
const test = "test1"

const drumKeys = ["q", "w", "e", "a", "s", "d", "z", "x", "c"]

function DrumPad(props) {
  return (
    <div>
      <button id={props.clipName} type="button">{props.buttonKey}</button>
    </div>
   );
}

function Drums() {
  return (
    <div className="bg-slate-600">
      <DrumPad clipName={name} buttonKey={test} />
    </div>
  );
}

function Display() {
  return (
    <div id="display"></div>
  );
}



function DrumMachine() {
  return (
    <div id="drum-machine" className="flex flex-row mx-auto items-center lg:flex-row">
      <DrumPad clipName={name} buttonKey={test} />
      <Drums />
      <Display />
    </div>
  );
}

function App() {
  return (
    <div className="bg-slate-200 h-screen w-screen flex">
      <DrumMachine className="bg-slate-500 w-6 h-6" clipName={name} buttonKey={test} />
    </div>
  );
}

export default App;