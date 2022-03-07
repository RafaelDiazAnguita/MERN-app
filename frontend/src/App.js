import React from 'react';
import { BrowserRouter, Route,Routes} from 'react-router-dom'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navigation from './components/Navigation';
import NotesList from './components/NotesList';
import CreateNote from './components/CreateNote';
import LogIn from './components/LogIn';
import SignUp from './components/SignUp';


function App() {
  return (
      <BrowserRouter>
        <Navigation/>
        
        <Routes>
          <Route path="/" element={<NotesList/>}/>
          <Route path="/edit/:id" element={<CreateNote/>}/>
          <Route path="/create" element={<CreateNote/>}/>
          <Route path="/login" element={<LogIn/>}/>
          <Route path="/signup" element={<SignUp/>}/>
        </Routes>
        

      </BrowserRouter>
  );
}

export default App;
