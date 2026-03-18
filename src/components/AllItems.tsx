import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Search, Sword } from 'lucide-react';

type Item = {
  id: string;
  name: string;
  description: string;
  image_url?: string;
  recipe: string[];
};

export default function AllItems() {
  const [items, setItems] = useState<Item[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadItems();
  }, []);

  async function loadItems() {
    const { data, error } = await supabase
      .from('items')
      .select('*')
      .order('name', { ascending: true });

    if (error) {
      console.log(error);
    }

    if (data) {
      setItems(data);
    }

    setLoading(false);
  }

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase()) ||
    item.description?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <section className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Carregando itens...</div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-950 to-black py-20 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/20 rounded-full border border-orange-500/30 mb-4">
            <Sword className="w-4 h-4 text-orange-400" />
            <span className="text-orange-300 text-sm font-semibold">TODOS OS ITENS</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black mb-4">
            Interface Completa de Itens
          </h1>

          <p className="text-gray-400 max-w-2xl mx-auto">
            Veja todos os itens com imagem, descrição e receita
          </p>
        </div>

        <div className="max-w-3xl mx-auto mb-10">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Pesquisar item..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-gray-900 border border-gray-800 rounded-2xl pl-12 pr-4 py-4 text-white outline-none focus:border-orange-500"
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-5 border border-gray-700 hover:border-orange-500/40 transition-all duration-300"
            >
              <div className="mb-4 flex justify-center">
                <div className="p-3 rounded-2xl bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-500/20">
                  {item.image_url ? (
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="w-16 h-16 object-contain"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-xl bg-gray-700" />
                  )}
                </div>
              </div>

              <h3 className="text-lg font-bold text-white mb-2 text-center">
                {item.name}
              </h3>

              <p className="text-sm text-gray-400 text-center mb-4 min-h-[40px]">
                {item.description}
              </p>

              <div>
                <p className="text-xs text-gray-500 font-semibold mb-2 text-center">
                  RECEITA
                </p>

                <div className="flex flex-wrap justify-center gap-2">
                  {item.recipe?.length > 0 ? (
                    item.recipe.map((component, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 rounded-lg bg-gray-950 border border-gray-700 text-xs text-gray-300"
                      >
                        {component}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-gray-500">Sem receita</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}