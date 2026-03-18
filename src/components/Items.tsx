import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Item } from '../types/tft';
import { Sword, Shield, Sparkles, X } from 'lucide-react';

export default function Items() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAllItems, setShowAllItems] = useState(false);

  useEffect(() => {
    loadItems();
  }, []);

  async function loadItems() {
    const { data } = await supabase
      .from('items')
      .select('*');

    if (data) {
      setItems(data);
    }

    setLoading(false);
  }

  const getItemIcon = (index: number) => {
    const icons = [Sword, Shield, Sparkles];
    const Icon = icons[index % icons.length];
    return Icon;
  };

  if (loading) {
    return (
      <section className="py-24 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4">
          <div className="text-center text-white">Carregando itens...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="items" className="scroll-mt-32 py-24 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-orange-500/20 rounded-full border border-orange-500/30">
              <Sword className="w-4 h-4 text-orange-400" />
              <span className="text-orange-300 text-sm font-semibold">ARSENAL</span>
            </div>
          </div>

          <h2 className="text-5xl md:text-6xl font-black text-white mb-4">
            Guia de Itens
          </h2>

          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Combine componentes e crie itens poderosos para seus campeões
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {items.slice(0, 9).map((item, index) => {
            const Icon = getItemIcon(index);

            return (
              <div
                key={item.id}
                className="group relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700 hover:border-orange-500/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/20"
                style={{
                  animation: `fadeInScale 0.6s ease-out ${index * 0.1}s both`
                }}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-500/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <div className="relative">
                  <div className="mb-4 inline-block p-3 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                    {item.image_url ? (
                      <img
                        src={item.image_url}
                        alt={item.name}
                        className="w-12 h-12 object-contain"
                      />
                    ) : (
                      <Icon className="w-8 h-8 text-white" />
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-orange-400 transition-colors">
                    {item.name}
                  </h3>

                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    {item.description}
                  </p>

                  {item.recipe?.length > 0 && (
                    <div>
                      <div className="text-xs text-gray-500 mb-2 font-semibold">RECEITA</div>
                      <div className="flex flex-wrap gap-2">
                        {item.recipe.map((component, i) => (
                          <div
                            key={i}
                            className="px-3 py-1 bg-gray-950 rounded-lg border border-gray-700 text-xs text-gray-300"
                          >
                            {component}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <button
            onClick={() => setShowAllItems(true)}
            className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl font-bold text-lg text-white shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 hover:scale-105"
          >
            Ver Todos os Itens
          </button>
        </div>
      </div>

      {showAllItems && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm overflow-y-auto">
          <div className="container mx-auto px-4 py-10">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl md:text-5xl font-black text-white">
                  Todos os Itens
                </h2>
                <p className="text-gray-400 mt-2">
                  Veja todos os itens disponíveis com descrição e receita
                </p>
              </div>

              <button
                onClick={() => setShowAllItems(false)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 border border-white/10 text-white hover:bg-white/20 transition"
              >
                <X className="w-4 h-4" />
                Fechar
              </button>
            </div>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {items.map((item, index) => {
                const Icon = getItemIcon(index);

                return (
                  <div
                    key={item.id}
                    className="group relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-5 border border-gray-700 hover:border-orange-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-500/10"
                  >
                    <div className="relative">
                      <div className="mb-4 flex justify-center">
                        <div className="p-3 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl shadow-lg">
                          {item.image_url ? (
                            <img
                              src={item.image_url}
                              alt={item.name}
                              className="w-14 h-14 object-contain"
                            />
                          ) : (
                            <Icon className="w-8 h-8 text-white" />
                          )}
                        </div>
                      </div>

                      <h3 className="text-lg font-bold text-white text-center mb-2">
                        {item.name}
                      </h3>

                      <p className="text-sm text-gray-400 text-center mb-4 min-h-[48px]">
                        {item.description}
                      </p>

                      {item.recipe?.length > 0 && (
                        <div>
                          <div className="text-xs text-gray-500 mb-2 font-semibold text-center">
                            RECEITA
                          </div>

                          <div className="flex flex-wrap justify-center gap-2">
                            {item.recipe.map((component, i) => (
                              <div
                                key={i}
                                className="px-2 py-1 bg-gray-950 rounded-lg border border-gray-700 text-xs text-gray-300"
                              >
                                {component}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </section>
  );
}