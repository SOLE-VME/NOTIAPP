export const fetchProfileData = async () => {
    const token = localStorage.getItem("authToken");

    const response = await fetch("https://sandbox.academiadevelopers.com/users/profiles/profile_data/", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Token ${token}` : "",
        },
    });

    if (!response.ok) {
        throw new Error("Error al obtener los datos del perfil.");
    }

    return await response.json();
};


export const updateProfileFull = async (id, data) => {
    const token = localStorage.getItem("authToken");

    const response = await fetch(`https://sandbox.academiadevelopers.com/users/profiles/${id}/`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Token ${token}` : "",
        },
        body: JSON.stringify(data), // Cambiado de `profileData` a `data`
    });

    if (!response.ok) {
        throw new Error("Error al actualizar el perfil.");
    }

    return await response.json();
};

export const updateProfilePartial = async (id, data) => {
  const formData = new FormData();
  
  for (const key in data) {
    if (data[key] !== undefined && data[key] !== null) {
      formData.append(key, data[key]);
    }
  }

  const token = localStorage.getItem("authToken");

  const response = await fetch(`https://sandbox.academiadevelopers.com/users/profiles/${id}/`, {
    method: 'PATCH',
    headers: {
      Authorization: token ? `Token ${token}` : "",
    },
    body: formData, // Enviar el FormData en lugar de JSON
  });

  if (!response.ok) {
    throw new Error("Error al actualizar el perfil.");
  }

  return await response.json();
};

export const fetchUserProfileById = async (id) => {
  const token = localStorage.getItem("authToken");

  const response = await fetch(`https://sandbox.academiadevelopers.com/users/profiles/${id}/`, {
      method: "GET",
      headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Token ${token}` : "",
      },
  });

  if (!response.ok) {
      throw new Error("Error al obtener el perfil del usuario.");
  }

  return await response.json();
};

export const updateProfileImage = async (formData, token) => {
  const response = await fetch("https://example.com/api/profile/update-image/", {
    method: 'POST',
    headers: {
      'Authorization': `Token ${token}`,
    },
    body: formData
  });

  if (!response.ok) {
    throw new Error("Error al actualizar la imagen del perfil");
  }

  return response.json();
};
