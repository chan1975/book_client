import React from 'react';
import Home from './pages/Home'
import {Route} from 'wouter'
import './App.css';
import 'bulma/css/bulma.css'

function App() {
  return (
    <div className="App">
      <section className="App-content">
        <Route
          component={Home}
          path='/'
        />
      </section>
    </div>
  );
}

export default App;
