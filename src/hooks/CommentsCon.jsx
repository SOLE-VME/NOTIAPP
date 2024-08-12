export const fetchComentarios = async (articleId) => {
    const token = localStorage.getItem("authToken");
    const response = await fetch(`https://sandbox.academiadevelopers.com/infosphere/comments/?article=${articleId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Token ${token}` : "",
        },
    });

    if (!response.ok) {
        throw new Error("Error al obtener los comentarios");
    }

    const data = await response.json();
    return data; 
};


export const fetchCrearComentario = async (articleId, content, token) => {
    const response = await fetch("https://sandbox.academiadevelopers.com/infosphere/comments/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Token ${token}` : "",
        },
        body: JSON.stringify({
            content,
            article: articleId,
        }),
    });

    if (!response.ok) {
        throw new Error("Error al crear el comentario");
    }

    const data = await response.json();
    return data;
};


export const fetchEditarComentario = async (commentId, articleId, content, token) => {
    const response = await fetch(`https://sandbox.academiadevelopers.com/infosphere/comments/${commentId}/`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Token ${token}` : "",
        },
        body: JSON.stringify({
            content,
            article: articleId,
        }),
    });

    if (!response.ok) {
        throw new Error("Error al editar el comentario");
    }

    const data = await response.json();
    return data;
};

export const fetchEliminarComentario = async (commentId, token) => {
    const response = await fetch(`https://sandbox.academiadevelopers.com/infosphere/comments/${commentId}/`, {
        method: "DELETE",
        headers: {
            Authorization: `Token ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error("Error al eliminar el comentario");
    }

    
};