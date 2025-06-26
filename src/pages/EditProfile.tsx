import React, { useState } from 'react';
import { updateProfile } from 'firebase/auth';
import { auth } from '../firebase/config';

const EditProfile: React.FC = () => {
  const user = auth.currentUser;
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [photoURL, setPhotoURL] = useState(user?.photoURL || '');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    try {
      await updateProfile(user, { displayName, photoURL });
      setMessage('Perfil actualizado correctamente');
    } catch (error) {
      setMessage('Error al actualizar el perfil');
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto mt-4 p-2 sm:p-4 bg-white rounded shadow flex flex-col items-center min-h-[calc(100vh-80px)]">
      <h2 className="text-lg sm:text-2xl font-bold mb-4 text-center">Editar Perfil</h2>
      <form onSubmit={handleSubmit} className="space-y-4 w-full">
        <div>
          <label className="block mb-1 text-xs sm:text-sm">Nombre de usuario</label>
          <input
            type="text"
            className="w-full border px-2 py-2 rounded text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
            value={displayName}
            onChange={e => setDisplayName(e.target.value)}
          />
        </div>
        <div>
          <label className="block mb-1 text-xs sm:text-sm">Foto de perfil (URL)</label>
          <input
            type="text"
            className="w-full border px-2 py-2 rounded text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
            value={photoURL}
            onChange={e => setPhotoURL(e.target.value)}
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded text-xs sm:text-sm hover:bg-blue-600 transition-colors">Guardar cambios</button>
      </form>
      {message && <p className="mt-4 text-center text-xs sm:text-sm">{message}</p>}
    </div>
  );
};

export default EditProfile;
