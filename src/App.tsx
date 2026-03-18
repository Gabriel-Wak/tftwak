import Hero from './components/Hero';
import Compositions from './components/Compositions';
import Items from './components/Items';
import About from './components/About';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-black">
      <Hero />
      <Compositions />
      <Items />
      <About />
      <Footer />
    </div>
  );
}

export default App;