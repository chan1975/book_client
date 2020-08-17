import React from 'react';
import Home from './pages/Home'
import {Route} from 'wouter'
import DetailImage from './pages/DetailImage'
import './App.css';
import 'bulma/css/bulma.css'

function App() {
  return (
    <div className="App">
      <Route
         component={Home}
         path='/'
      />
      <Route
         component={DetailImage}
         path='/detail/:id'
      />
    </div>
  );
}

export default App;
