import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Flame, Mail, Lock, User, Hash } from 'lucide-react';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [riotGameName, setRiotGameName] = useState('');
  const [riotTagLine, setRiotTagLine] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      setLoading(false);

      if (error) {
        alert(error.message);
        return;
      }

      alert('Login realizado com sucesso!');
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setLoading(false);
      alert(error.message);
      return;
    }

    const user = data.user;

    if (user) {
      const { error: profileError } = await supabase.from('profiles').upsert({
            id: user.id,
            display_name: riotGameName,
            riot_game_name: riotGameName,
            riot_tag_line: riotTagLine,
            });

      if (profileError) {
        setLoading(false);
        alert(profileError.message);
        return;
      }
    }

    setLoading(false);
    alert('Conta criada com sucesso!');
  }

  return (
    <section className="relative w-full max-w-md overflow-hidden rounded-[28px] border border-white/10 bg-[#0a0f1a]/95 shadow-2xl shadow-black/50">
      {/* FUNDO */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,204,0,0.12),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(124,58,237,0.18),_transparent_30%)]" />
        <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:42px_42px]" />
      </div>

      <div className="relative z-10 p-8">
        {/* TOPO */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-yellow-500/20 bg-yellow-500/10 text-yellow-300 text-xs font-semibold mb-4">
            <Flame className="w-4 h-4" />
            TFT WAK 
          </div>

          <h2 className="text-3xl md:text-4xl font-black text-white mb-2">
            {isLogin ? 'Conectar-se' : 'Criar conta'}
          </h2>

          <p className="text-gray-400 text-sm md:text-base">
            {isLogin
              ? 'Entre com seu email e senha'
              : 'Crie sua conta e vincule seu Riot ID'}
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Mail className="w-4 h-4 text-gray-500 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="email"
              placeholder="Seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-2xl bg-white/5 border border-white/10 pl-11 pr-4 py-3.5 text-white placeholder:text-gray-500 outline-none focus:border-yellow-400/50"
              required
            />
          </div>

          <div className="relative">
            <Lock className="w-4 h-4 text-gray-500 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="password"
              placeholder="Sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-2xl bg-white/5 border border-white/10 pl-11 pr-4 py-3.5 text-white placeholder:text-gray-500 outline-none focus:border-yellow-400/50"
              required
            />
          </div>

          {!isLogin && (
            <>
              <div className="relative">
                <User className="w-4 h-4 text-gray-500 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Riot ID"
                  value={riotGameName}
                  onChange={(e) => setRiotGameName(e.target.value)}
                  className="w-full rounded-2xl bg-white/5 border border-white/10 pl-11 pr-4 py-3.5 text-white placeholder:text-gray-500 outline-none focus:border-yellow-400/50"
                  required
                />
              </div>

              <div className="relative">
                <Hash className="w-4 h-4 text-gray-500 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Tag (ex: BR1)"
                  value={riotTagLine}
                  onChange={(e) => setRiotTagLine(e.target.value)}
                  className="w-full rounded-2xl bg-white/5 border border-white/10 pl-11 pr-4 py-3.5 text-white placeholder:text-gray-500 outline-none focus:border-yellow-400/50"
                  required
                />
              </div>
            </>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-extrabold text-base shadow-xl shadow-yellow-500/20 hover:scale-[1.01] transition-all duration-300 disabled:opacity-50 disabled:hover:scale-100"
          >
            {loading
              ? 'Carregando...'
              : isLogin
              ? 'Entrar'
              : 'Criar conta'}
          </button>
        </form>

        {/* TROCAR LOGIN/CADASTRO */}
        <button
          type="button"
          onClick={() => setIsLogin(!isLogin)}
          className="w-full mt-5 text-sm text-gray-400 hover:text-white transition"
        >
          {isLogin
            ? 'Não tem conta? Criar conta'
            : 'Já tem conta? Entrar'}
        </button>
      </div>
    </section>
  );
}