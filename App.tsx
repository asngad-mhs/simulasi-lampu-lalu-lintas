
import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Features from './components/Features';
import Simulation from './components/Simulation';
import Journal from './components/Journal';
import References from './components/References';
import Contact from './components/Contact';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 font-sans">
      <Header />
      <main>
        <Hero />
        <About />
        <Features />
        <Simulation />
        <Journal />
        <References />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default App;