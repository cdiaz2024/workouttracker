import React from 'react';
import './App.css';
import WorkoutButtons from './Workoutbuttons';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Allworkouts from './workoutpage';
import SessionCreateForm from './ui-components/SessionCreateForm';
import SessionDisplay from './SessionDisplay';
import DispSessionsCollection from './ui-components/DispSessionsCollection';
import BigButton from './BigButton';
import BackButton from './BackButton';
import { BorderDispSessionsCollection } from './ui-components';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Routes>
            <Route exact path='/' element={<WorkoutButtons />} />
            <Route exact path='/new' element={<div><SessionCreateForm/><BackButton/></div>}/>
            <Route exact path='/Display' element={<div><SessionDisplay/><BorderDispSessionsCollection/><BackButton/></div>}/>
          </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App;
