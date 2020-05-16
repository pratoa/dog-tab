import React from 'react';
import DogImage from './DogImage'
import Menu from './Menu'
import './App.css';

function App() {
  return (
    <div className="App">
      <DogImage>
        <Menu />
      </DogImage>
    </div>
  );
}

export default App;
