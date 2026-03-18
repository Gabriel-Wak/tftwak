import { useEffect, useState } from 'react';
import { Flame, X } from 'lucide-react';
import { supabase } from '../lib/supabase';
import Auth from './Auth';
import ProfileSetup from './ProfileSetup';

type Profile = {
  display_name?: string;
  avatar_url?: string;
  riot_game_name?: string;
};

export default function Header() {
  const [showAuth, setShowAuth] = useState(false);
  const [showProfileSetup, setShowProfileSetup] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    getUserAndProfile();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      getUserAndProfile();
    });

    return () => subscription.unsubscribe();
  }, []);

  async function getUserAndProfile() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    setUser(user);

    if (!user) {
      setProfile(null);
      return;
    }

    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    setProfile(data);
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
  }

  const displayName =
    profile?.display_name || profile?.riot_game_name || user?.email || 'Usuário';

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 bg-black/40 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-white font-bold text-lg">
            <Flame className="w-8 h-8 text-yellow-400" />
            TFT WAK
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm text-gray-300">
            <button className="hover:text-white transition">Composições</button>
            <button className="hover:text-white transition">Itens</button>
            <button className="hover:text-white transition">Guias</button>
          </nav>

          {!user ? (
            <button
              onClick={() => setShowAuth(true)}
              className="px-4 py-2 rounded-xl bg-white/10 border border-white/10 text-white hover:bg-white/20 transition"
            >
              Conecte-se
            </button>
          ) : (
            <div className="flex items-center gap-3">
              {profile?.avatar_url ? (
                <img
                  src={profile.avatar_url}
                  alt={displayName}
                  className="w-10 h-10 rounded-full object-cover border border-white/10"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gray-700 border border-white/10" />
              )}

              <div className="text-white text-sm font-semibold">
                {displayName}
              </div>

              <button
                onClick={() => setShowProfileSetup(true)}
                className="px-3 py-2 rounded-xl bg-white/10 border border-white/10 text-white hover:bg-white/20 transition text-sm"
              >
                Editar perfil
              </button>

              <button
                onClick={handleLogout}
                className="px-3 py-2 rounded-xl bg-white/10 border border-white/10 text-white hover:bg-white/20 transition text-sm"
              >
                Sair
              </button>
            </div>
          )}
        </div>
      </header>

      {showAuth && (
        <div className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-center justify-center px-4">
          <div className="relative w-full max-w-md">
            <button
              onClick={() => setShowAuth(false)}
              className="absolute -top-12 right-0 w-10 h-10 rounded-xl bg-white/10 border border-white/10 text-white hover:bg-white/20 transition flex items-center justify-center"
            >
              <X className="w-5 h-5" />
            </button>

            <Auth />
          </div>
        </div>
      )}

      {showProfileSetup && user && (
        <div className="fixed inset-0 z-[110] bg-black/70 backdrop-blur-sm flex items-center justify-center px-4">
          <ProfileSetup
            userId={user.id}
            currentName={profile?.display_name || profile?.riot_game_name || ''}
            currentAvatar={profile?.avatar_url || ''}
            onUpdated={getUserAndProfile}
            onClose={() => setShowProfileSetup(false)}
          />
        </div>
      )}
    </>
  );
}