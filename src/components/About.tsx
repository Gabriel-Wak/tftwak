import { Brain, Target, Users as Users2, Zap } from 'lucide-react';

export default function About() {
  const features = [
    {
      icon: Brain,
      title: 'Estratégia Profunda',
      description: 'Cada partida é única. Adapte-se ao meta e às escolhas dos adversários.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Target,
      title: 'Posicionamento Tático',
      description: 'A posição de seus campeões no tabuleiro pode mudar o rumo da batalha.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Users2,
      title: 'Sinergias Únicas',
      description: 'Combine campeões e ative poderosos bônus de classe e origem.',
      color: 'from-orange-500 to-yellow-500'
    },
    {
      icon: Zap,
      title: 'Ritmo Dinâmico',
      description: 'Partidas rápidas e intensas com tomadas de decisão constantes.',
      color: 'from-green-500 to-teal-500'
    }
  ];

  return (
   <section id="guias" className="scroll-mt-32 py-24 bg-black">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-black text-white mb-4">
              O Que é TFT?
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Teamfight Tactics é um jogo de estratégia auto-battler onde você monta um time de campeões,
              equipa-os com itens poderosos e compete contra 7 adversários para ser o último sobrevivente.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 border border-gray-700 hover:border-gray-600 transition-all duration-500 hover:scale-105"
                style={{
                  animation: `slideInLeft 0.8s ease-out ${index * 0.15}s both`
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-500"></div>

                <div className="relative">
                  <div className={`inline-block p-4 bg-gradient-to-br ${feature.color} rounded-xl mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-3">
                    {feature.title}
                  </h3>

                  <p className="text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="relative bg-gradient-to-br from-purple-900/30 to-blue-900/30 rounded-3xl p-12 border border-purple-500/30 backdrop-blur-sm overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/20 rounded-full filter blur-3xl"></div>

            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center">
                Pronto para a Arena?
              </h3>
              <p className="text-gray-300 text-center mb-8 max-w-2xl mx-auto">
                Junte-se a milhões de jogadores em todo o mundo e mostre suas habilidades táticas.
                A cada set, novos campeões, itens e mecânicas são introduzidos.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
        onClick={() => window.open('https://www.riotgames.com/pt-br', '_blank')}
        className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl font-bold text-lg text-white shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 hover:scale-105"
      >
        Jogue agoraS
      </button>
                <button  onClick={() => window.open('https://tftacademy.com/tierlist/comps', '_blank')} className="px-8 py-4 bg-white/10 backdrop-blur-md rounded-xl font-bold text-lg text-white border-2 border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                  Assistir Tutorial
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </section>
  );
}
