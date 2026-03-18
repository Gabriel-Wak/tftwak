import { Github,} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-black to-gray-950 border-t border-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Combate Tático</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Sua fonte completa para estratégias, composições e guias do Combate Tático.
            </p>
          </div>

        
          <div>
            <h4 className="text-white font-semibold mb-4">Siga-nos</h4>
            <div className="w-12 h-12 flex gap-4">
              <a href="https://github.com/Gabriel-Wak" className="w-20 h-10 bg-gray-800 hover:bg-purple-600 rounded-lg flex items-center justify-center transition-colors">
                <Github className="w-12 h-12 text-white" />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-500 text-sm">
            
          </p>
        </div>
      </div>
    </footer>
  );
}
