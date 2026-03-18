import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Composition } from '../types/tft';
import { Star, Users, Plus, X, Check, Trash2,} from 'lucide-react';

type Champion = {
  id: string;
  name: string;
  cost?: number;
  image_url?: string;
};

export default function Compositions() {
  const [compositions, setCompositions] = useState<Composition[]>([]);
  const [champions, setChampions] = useState<Champion[]>([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [compName, setCompName] = useState('');
  const [selectedChampions, setSelectedChampions] = useState<Champion[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadCompositions();
    async function importarItens() {
  const confirmImport = window.confirm(
    'Isso vai adicionar os itens do LoL na tabela items. Deseja continuar?'
  );

  if (!confirmImport) return;

  const version = '13.1.1';
  const dataUrl = `https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/item.json`;
  const imageBase = `https://ddragon.leagueoflegends.com/cdn/${version}/img/item`;

  const response = await fetch(dataUrl);
  const json = await response.json();

  const items = Object.entries(json.data).map(([_, item]: any) => ({
    name: item.name,
    description: item.plaintext || '',
    image_url: `${imageBase}/${item.image.full}`,
    recipe: item.from || [],
  }));

  const { error } = await supabase.from('items').insert(items);

  if (error) {
    console.log('Erro ao importar itens:', error);
    alert('Erro ao importar itens');
    return;
  }

  alert('Itens importados com sucesso!');
}
    loadChampions();
  }, []);

  async function loadCompositions() {
    const { data } = await supabase
      .from('compositions')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(6);

    if (data) {
      setCompositions(data);
    }

    setLoading(false);
  }

  async function loadChampions() {
    const { data } = await supabase
      .from('champions')
      .select('*')
      .order('cost', { ascending: true })
      .order('name', { ascending: true });

    if (data) {
      setChampions(data);
    }
  }

  function openModal() {
    setCompName('');
    setSelectedChampions([]);
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  function toggleChampion(champion: Champion) {
    const exists = selectedChampions.some((c) => c.id === champion.id);

    if (exists) {
      setSelectedChampions(selectedChampions.filter((c) => c.id !== champion.id));
      return;
    }

    setSelectedChampions([...selectedChampions, champion]);
  }

  async function createComposition() {
    if (!compName.trim()) {
      alert('Digite um nome para a comp');
      return;
    }

    if (selectedChampions.length === 0) {
      alert('Escolha pelo menos 1 campeão');
      return;
    }

    setSaving(true);

    const championsPayload = selectedChampions.map((champion) => ({
      name: champion.name,
      image_url: champion.image_url || '',
      cost: champion.cost || 0,
    }));

    const { error } = await supabase.from('compositions').insert([
      {
        name: compName,
        tier: 'A',
        description: 'Composição criada por você',
        playstyle: 'Personalizada',
        champions: championsPayload,
        key_items: [],
      },
    ]);

    setSaving(false);

    if (error) {
      console.log(error);
      alert('Erro ao salvar a comp');
      return;
    }

    closeModal();
    loadCompositions();
  }

  async function deleteComposition(id: string) {
    const confirmDelete = window.confirm('Tem certeza que deseja excluir essa comp?');

    if (!confirmDelete) return;

    const { error } = await supabase
      .from('compositions')
      .delete()
      .eq('id', id);

    if (error) {
      console.log('Erro ao excluir:', error);
      alert('Erro ao excluir a comp');
      return;
    }

    setCompositions((prev) => prev.filter((comp) => comp.id !== id));
  }

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'S':
        return 'from-yellow-500 to-orange-500';
      case 'A':
        return 'from-blue-500 to-purple-500';
      case 'B':
        return 'from-green-500 to-teal-500';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  const getTierBadgeColor = (tier: string) => {
    switch (tier) {
      case 'S':
        return 'bg-yellow-500';
      case 'A':
        return 'bg-blue-500';
      case 'B':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  if (loading) {
    return (
      <section className="py-24 bg-black">
        <div className="container mx-auto px-4">
          <div className="text-center text-white">Carregando composições...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="comps" className="scroll-mt-32 py-24 bg-black relative overflow-hidden" >
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-block mb-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-purple-500/20 rounded-full border border-purple-500/30">
              <Star className="w-4 h-4 text-purple-400" />
              <span className="text-purple-300 text-sm font-semibold">COMPOSIÇÕES EM ALTA</span>
            </div>
          </div>

          <h2 className="text-5xl md:text-6xl font-black text-white mb-4">
            Composições Top Tier
          </h2>

          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
            Monte sua própria composição de forma simples
          </p>

          <button
            onClick={openModal}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold shadow-lg shadow-purple-900/30 hover:scale-105 transition-all duration-300"
          >
            <Plus className="w-5 h-5" />
            Criar minha comp
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {compositions.map((comp, index) => (
            <div
              key={comp.id}
              className="group relative bg-gradient-to-br from-[#131c2f] to-[#1a2437] rounded-3xl overflow-hidden border border-white/10 hover:border-purple-500/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-purple-900/20"
              style={{
                animation: `fadeInUp 0.6s ease-out ${index * 0.08}s both`,
              }}
            >
              <div className={`h-1.5 bg-gradient-to-r ${getTierColor(comp.tier)}`} />

              <div className="p-6">
                <div className="flex items-start justify-between mb-4 gap-3">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1">
                      {comp.name}
                    </h3>
                    <p className="text-gray-400 text-sm">{comp.playstyle}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className={`${getTierBadgeColor(comp.tier)} px-3 py-1 rounded-xl`}>
                      <span className="text-white font-bold text-sm">{comp.tier}</span>
                    </div>

                    <button
                      onClick={() => deleteComposition(comp.id)}
                      className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 hover:bg-red-500/20 transition flex items-center justify-center"
                      title="Excluir comp"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <p className="text-gray-300 mb-5 line-clamp-2">
                  {comp.description}
                </p>

                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Users className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-400 font-semibold">Campeões</span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {comp.champions?.slice(0, 6).map((champion: any, i: number) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 px-2.5 py-2 bg-black/30 rounded-xl border border-white/10"
                      >
                        {champion.image_url ? (
                          <img
                            src={champion.image_url}
                            alt={champion.name}
                            className="w-8 h-8 rounded-lg object-cover"
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-lg bg-gray-700" />
                        )}

                        <span className="text-xs text-gray-200 font-medium">
                          {champion.name}
                        </span>
                      </div>
                    ))}

                    {comp.champions?.length > 6 && (
                      <div className="px-3 py-2 bg-black/30 rounded-xl border border-white/10 text-xs text-gray-400">
                        +{comp.champions.length - 6}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center px-4">
          <div className="w-full max-w-5xl max-h-[90vh] overflow-hidden rounded-3xl border border-white/10 bg-[#0f1728] shadow-2xl shadow-purple-900/20">
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
              <div>
                <h3 className="text-2xl font-black text-white">Criar minha comp</h3>
                <p className="text-sm text-gray-400">
                  Escolha um nome e selecione os campeões
                </p>
              </div>

              <button
                onClick={closeModal}
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 transition"
              >
                <X className="w-5 h-5 mx-auto" />
              </button>
            </div>

            <div className="grid lg:grid-cols-[1.2fr_2fr] gap-0">
              <div className="p-6 border-r border-white/10 bg-[#0c1422]">
                <label className="block text-sm text-gray-400 mb-2">Nome da comp</label>
                <input
                  type="text"
                  value={compName}
                  onChange={(e) => setCompName(e.target.value)}
                  placeholder="Ex: Mago Ahri"
                  className="w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3 text-white outline-none focus:border-purple-500"
                />

                <div className="mt-6">
                  <p className="text-sm text-gray-400 mb-3">
                    Campeões escolhidos ({selectedChampions.length})
                  </p>

                  <div className="flex flex-wrap gap-2 min-h-[120px] rounded-2xl bg-black/20 border border-white/10 p-3">
                    {selectedChampions.length === 0 && (
                      <span className="text-sm text-gray-500">
                        Nenhum campeão selecionado
                      </span>
                    )}

                    {selectedChampions.map((champion) => (
                      <div
                        key={champion.id}
                        className="flex items-center gap-2 px-2.5 py-2 rounded-xl bg-white/5 border border-white/10"
                      >
                        {champion.image_url ? (
                          <img
                            src={champion.image_url}
                            alt={champion.name}
                            className="w-8 h-8 rounded-lg object-cover"
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-lg bg-gray-700" />
                        )}

                        <span className="text-sm text-white">{champion.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={createComposition}
                  disabled={saving}
                  className="mt-6 w-full py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold hover:opacity-90 transition disabled:opacity-50"
                >
                  {saving ? 'Salvando...' : 'Salvar comp'}
                </button>
              </div>

              <div className="p-6">
                <p className="text-sm text-gray-400 mb-4">Escolha seus campeões</p>

                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 max-h-[60vh] overflow-y-auto pr-1">
                  {champions.map((champion) => {
                    const selected = selectedChampions.some((c) => c.id === champion.id);

                    return (
                      <button
                        key={champion.id}
                        onClick={() => toggleChampion(champion)}
                        className={`relative rounded-2xl p-2 border transition-all duration-200 ${
                          selected
                            ? 'border-purple-500 bg-purple-500/10 shadow-lg shadow-purple-900/20'
                            : 'border-white/10 bg-white/5 hover:border-purple-400/50 hover:bg-white/10'
                        }`}
                      >
                        {selected && (
                          <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center">
                            <Check className="w-4 h-4 text-white" />
                          </div>
                        )}

                        {champion.image_url ? (
                          <img
                            src={champion.image_url}
                            alt={champion.name}
                            className="w-full aspect-square object-cover rounded-xl"
                          />
                        ) : (
                          <div className="w-full aspect-square rounded-xl bg-gray-700" />
                        )}

                        <div className="mt-2 text-left">
                          <p className="text-sm font-semibold text-white truncate">
                            {champion.name}
                          </p>
                          <p className="text-xs text-gray-400">
                            Custo {champion.cost ?? '-'}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}