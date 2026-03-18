import { useState } from 'react';
import { supabase } from '../lib/supabase';

type Props = {
  userId: string;
  currentName?: string;
  currentAvatar?: string;
  onUpdated: () => void;
  onClose: () => void;
};

export default function ProfileSetup({
  userId,
  currentName = '',
  currentAvatar = '',
  onUpdated,
  onClose,
}: Props) {
  const [displayName, setDisplayName] = useState(currentName);
  const [avatarUrl, setAvatarUrl] = useState(currentAvatar);
  const [loading, setLoading] = useState(false);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);

    const fileExt = file.name.split('.').pop();
    const filePath = `${userId}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(filePath, file, { upsert: true });

    if (uploadError) {
      setLoading(false);
      alert(uploadError.message);
      return;
    }

    const { data } = supabase.storage.from('avatars').getPublicUrl(filePath);
    setAvatarUrl(data.publicUrl);
    setLoading(false);
  }

  async function saveProfile() {
    setLoading(true);

    const { error } = await supabase.from('profiles').upsert({
      id: userId,
      display_name: displayName,
      avatar_url: avatarUrl,
    });

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    onUpdated();
    onClose();
  }

  return (
    <div className="w-full max-w-md bg-[#0a0f1a] border border-white/10 rounded-3xl p-6 shadow-2xl">
      <h2 className="text-2xl font-black text-white mb-4">Editar perfil</h2>

      <div className="flex flex-col items-center mb-6">
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt="Avatar"
            className="w-24 h-24 rounded-full object-cover border border-white/10 mb-3"
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-gray-800 border border-white/10 mb-3" />
        )}

        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="text-sm text-white"
        />
      </div>

      <input
        type="text"
        placeholder="Seu nome"
        value={displayName}
        onChange={(e) => setDisplayName(e.target.value)}
        className="w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3 text-white outline-none mb-4"
      />

      <div className="flex gap-3">
        <button
          onClick={onClose}
          className="w-full py-3 rounded-2xl bg-white/10 text-white font-bold"
        >
          Cancelar
        </button>

        <button
          onClick={saveProfile}
          disabled={loading}
          className="w-full py-3 rounded-2xl bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold disabled:opacity-50"
        >
          {loading ? 'Salvando...' : 'Salvar'}
        </button>
      </div>
    </div>
  );
}