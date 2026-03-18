import { Sparkles, Trophy, Zap, ChevronRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#05070d]">
      {/* FUNDO */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,204,0,0.12),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(124,58,237,0.18),_transparent_30%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f1a] via-[#05070d] to-black" />
        <div className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div>

      {/* GLOW */}
      <div className="absolute top-24 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-yellow-500/10 blur-[140px] rounded-full" />
      <div className="absolute bottom-0 right-0 w-[320px] h-[320px] bg-purple-600/10 blur-[120px] rounded-full" />
      <div className="absolute top-1/3 left-0 w-[260px] h-[260px] bg-blue-500/10 blur-[110px] rounded-full" />

      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        {/* BADGE */}
        <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-yellow-500/20 bg-yellow-500/10 text-yellow-300 text-sm font-semibold">
          <Trophy className="w-4 h-4" />
          GUIAS, COMPS E META TFT
        </div>

        {/* TITULO */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[0.95] tracking-tight mb-6">
          <span className="text-white">A principal fonte de</span>
          <br />
          <span className="bg-gradient-to-r from-yellow-300 via-yellow-400 to-orange-400 bg-clip-text text-transparent">
            composições e guias
          </span>
          <br />
          <span className="text-white">para Teamfight Tactics</span>
        </h1>

        {/* SUBTITULO */}
        <p className="text-base sm:text-lg md:text-xl text-gray-300/90 max-w-3xl mx-auto leading-relaxed mb-10">
          Descubra comps fortes, guias de itens e estratégias atualizadas para
          subir no ranked com mais confiança e montar boards mais fortes.
        </p>

        {/* BOTOES */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-14">
          <button className="group inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-extrabold text-lg shadow-2xl shadow-yellow-500/20 hover:scale-[1.03] transition-all duration-300">
            <Sparkles className="w-5 h-5" />
            Ver Composições
            <ChevronRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </button>

          <button className="group inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 text-white font-bold text-lg hover:bg-white/10 hover:border-white/20 transition-all duration-300">
            <Zap className="w-5 h-5 text-yellow-400" />
            Guia de Itens
          </button>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm p-6">
            <div className="text-4xl md:text-5xl font-black text-yellow-400 mb-2">60+</div>
            <div className="text-gray-300 font-medium">Campeões</div>
            <div className="text-sm text-gray-500 mt-1">Para montar comps fortes</div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm p-6">
            <div className="text-4xl md:text-5xl font-black text-orange-400 mb-2">50+</div>
            <div className="text-gray-300 font-medium">Itens</div>
            <div className="text-sm text-gray-500 mt-1">Com guias e combinações</div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm p-6">
            <div className="text-4xl md:text-5xl font-black text-purple-400 mb-2">100+</div>
            <div className="text-gray-300 font-medium">Composições</div>
            <div className="text-sm text-gray-500 mt-1">Para diferentes estilos de jogo</div>
          </div>
        </div>
      </div>

      {/* FADE INFERIOR */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
    </section>
  );
}