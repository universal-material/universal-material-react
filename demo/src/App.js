import React from 'react';
import logo from './logo.svg';
import './App.scss';

import ExampleComponent from '@universal-material/react'
import { Button, TextField } from '@universal-material/react'

function App() {
  return (
    <div className="App">
      <Button color="primary">Teste</Button>
      <TextField label="Text field" />
    </div>
  );
}

export default App;
