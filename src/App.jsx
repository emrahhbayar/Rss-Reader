import { useState } from 'react';
import Navbar from './components/Navbar';
import Router from './routing/Router'
import RssContext from './contexts/RssContext';

function App() {

  return (
    <RssContext>
      <Navbar />
      <Router />
    </RssContext>
  )
}

export default App
