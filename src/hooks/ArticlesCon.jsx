export const fetchArticles = async (page = 1) => {
    const token = localStorage.getItem("authToken");
    const response = await fetch(
      `https://sandbox.academiadevelopers.com/infosphere/articles/?page=${page}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Token ${token}` : "",
        },
      }
    );
  
    if (!response.ok) {
      throw new Error("Error al obtener los artículos");
    }
  
    const data = await response.json();
  
    return {
      articles: data.results,
      totalCount: data.count,
      nextPage: data.next ? new URL(data.next).searchParams.get("page") : null,
      prevPage: data.previous
        ? new URL(data.previous).searchParams.get("page")
        : null,
    };
  };



  export const fetchArticle = async (id) => {
    const token = localStorage.getItem("authToken");
    const response = await fetch(`https://sandbox.academiadevelopers.com/infosphere/articles/${id}/`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Token ${token}` : "",
        },
    });

    if (!response.ok) {
        throw new Error("Error al obtener el artículo");
    }

    const data = await response.json();
    return data;
};


// hooks/ArticlesCon.js

export const fetchCrearArticulo = async (formData) => {
  const token = localStorage.getItem("authToken");

  const response = await fetch("https://sandbox.academiadevelopers.com/infosphere/articles/", {
      method: "POST",
      headers: {
          Authorization: token ? `Token ${token}` : "",

      },
      body: formData, 
  });

  if (!response.ok) {
      throw new Error("Error al crear el artículo");
  }

  return response.json(); 
};



export const fetchActualizarArticulo = async (id, articleData) => {
  const token = localStorage.getItem("authToken");

  const response = await fetch(`https://sandbox.academiadevelopers.com/infosphere/articles/${id}/`, {
      method: "PUT",
      headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Token ${token}` : "",
      },
      body: JSON.stringify(articleData),
  });

  if (!response.ok) {
      throw new Error("Error al actualizar el artículo");
  }

  return response.json(); 
};



export const fetchEliminarArticulo = async (id) => {
  const token = localStorage.getItem("authToken");

  const response = await fetch(`https://sandbox.academiadevelopers.com/infosphere/articles/${id}/`, {
      method: "DELETE",
      headers: {
          "Authorization": token ? `Token ${token}` : "",
      },
  });

  if (response.status !== 204) {
      throw new Error("Error al eliminar el artículo");
  }

  return response.status;
};

