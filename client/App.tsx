import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Events } from './pages/Events';
import { Booking } from './pages/Booking';
import { About } from './pages/InfoPages';
import { Schedule } from './pages/Schedule';
import { Gallery } from './pages/Gallery';
import { RahasyaHome } from './pages/RahasyaHome';
import { RahasyaEvents } from './pages/RahasyaEvents';

function App() {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/events" element={<Events />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/tickets" element={<Booking />} />

          {/* Rahasya / Tech Fest Routes */}
          <Route path="/rahasya" element={<RahasyaHome />} />
          <Route path="/rahasya/booking" element={<Booking />} />
          <Route path="/rahasya/events" element={<RahasyaEvents />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
}

export default App;