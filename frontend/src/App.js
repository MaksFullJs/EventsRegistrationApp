
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import EventsBoard from './pages/EventsBoard';
import EventRegistration from './pages/EventRegistration/EventRegistration';
import EventParticipants from './pages/EventParticipants/EventParticipants';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<EventsBoard />}></Route>
        <Route path='/event/:id/registration' element={<EventRegistration />}></Route>
        <Route path='/event/:id/participants' element={<EventParticipants />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
