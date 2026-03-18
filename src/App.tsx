import { useState } from 'react';
import Hero from './components/Hero';
import Compositions from './components/Compositions';
import Items from './components/Items';
import About from './components/About';
import Footer from './components/Footer';
import Header from './components/Header';

function App() {
  const [showAuth, setShowAuth] = useState(false);

  return (
    <div className="min-h-screen bg-black">
      <Header />
      <Hero />
      <Compositions />
      <Items />
      <About />
      <Footer />

      {showAuth && (
        <div className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-center justify-center px-4">
          <div className="relative w-full max-w-md">
            <button
              onClick={() => setShowAuth(false)}
              className="absolute -top-12 right-0 px-4 py-2 rounded-xl bg-white/10 border border-white/10 text-white hover:bg-white/20 transition"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;