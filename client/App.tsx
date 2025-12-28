import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { AnimatedRoutes } from './components/AnimatedRoutes';
import { Home } from './pages/Home';
import { Events } from './pages/Events';
import { Booking } from './pages/Booking';
import { About } from './pages/InfoPages';
import { Schedule } from './pages/Schedule';
import { Gallery } from './pages/Gallery';
import { RahasyaHome } from './pages/RahasyaHome';
import { RahasyaEvents } from './pages/RahasyaEvents';
import { RahasyaTimeline } from './pages/RahasyaTimeline';
import { RahasyaAbout } from './pages/RahasyaAbout';

function App() {
  return (
    <HashRouter>
      <Layout>
        <AnimatedRoutes />
      </Layout>
    </HashRouter>
  );
}

export default App;