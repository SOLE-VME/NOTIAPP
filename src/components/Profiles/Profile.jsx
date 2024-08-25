import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { fetchProfileData } from '../../hooks/useFetchProfile'; // Asegúrate de que la ruta es correcta
import './styles.css';

const Profile = () => {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setLoading(true);
        setError(null);
        if (auth.isAuthenticated) {
          const data = await fetchProfileData();
          setProfile(data);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [auth.isAuthenticated]);

  const handleEditClick = () => {
    if (profile) {
      navigate(`/edit-profile/${profile.user__id}`);
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  if (!profile) {
    return <div className="no-profile">No profile data available.</div>;
  }

  return (
    <div className="profile-container">
      <h1>Mi Perfil</h1>
      <div className="profile-image-container">
        <img 
          src={profile.image || 'https://png.pngtree.com/png-vector/20191018/ourmid/pngtree-user-icon-isolated-on-abstract-background-png-image_1824979.jpg'} 
          alt="Profile" 
          className="profile-image"
          onError={(e) => e.target.src = 'https://png.pngtree.com/png-vector/20191018/ourmid/pngtree-user-icon-isolated-on-abstract-background-png-image_1824979.jpg'} // Maneja imágenes rotas
        />
      </div>
      <div className="profile-details">
        <p><strong>User ID:</strong> {profile.user__id}</p>
        <p><strong>Username:</strong> {profile.username}</p>
        <p><strong>Nombre:</strong> {profile.first_name} {profile.last_name}</p>
        <p><strong>Email:</strong> {profile.email}</p>
        <p><strong>Fecha de Nacimiento:</strong> {profile.dob || 'No disponible'}</p>
        <p><strong>Biografía:</strong> {profile.bio || 'No disponible'}</p>
        <p><strong>Fecha de Alta:</strong> {profile.created_at ? new Date(profile.created_at).toLocaleDateString() : 'No disponible'}</p>
        <p><strong>Fecha de Modificación:</strong> {profile.updated_at ? new Date(profile.updated_at).toLocaleDateString() : 'No disponible'}</p>
      </div>
      <button className="btn btn-primary" onClick={handleEditClick}>Editar Perfil</button>
    </div>
  );
};

export default Profile;
