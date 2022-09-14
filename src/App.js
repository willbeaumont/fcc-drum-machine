import './index.css';

function Drums() {
  return <div />
}

function Display() {
  return <div id="display"/>
}

function DrumMachine() {
  return (
    <div id="drum-machine">
      <Drums />
      <Display />
    </div>
  );
};

function App() {
  return (
    <div>
      <DrumMachine />
    </div>
  );
}

export default App;