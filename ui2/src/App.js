import React from 'react';
import './App.css';
import SurveyDesigner from './components/SurveyDesigner';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>调查设计工具</h1>
      </header>
      <main>
        <SurveyDesigner />
      </main>
    </div>
  );
}

export default App;
