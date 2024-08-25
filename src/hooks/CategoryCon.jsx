export const fetchCategories = async () => {
    const response = await fetch("https://sandbox.academiadevelopers.com/infosphere/categories/", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error("Error al obtener las categorías");
    }

    const data = await response.json();
    return data.results || [];
};

export const createCategory = async (categoryData, token) => {
    const response = await fetch("https://sandbox.academiadevelopers.com/infosphere/categories/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${token}`
        },
        body: JSON.stringify(categoryData),
    });

    if (!response.ok) {
        throw new Error("Error al crear la categoría");
    }

    const data = await response.json();
    return data;
};

export const updateCategory = async (id, categoryData, token) => {
    const response = await fetch(`https://sandbox.academiadevelopers.com/infosphere/categories/${id}/`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${token}`
        },
        body: JSON.stringify(categoryData),
    });

    if (!response.ok) {
        throw new Error("Error al actualizar la categoría");
    }

    const data = await response.json();
    return data;
};

export const deleteCategory = async (id, token) => {
    const response = await fetch(`https://sandbox.academiadevelopers.com/infosphere/categories/${id}/`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${token}`
        },
    });

    if (!response.ok) {
        throw new Error("Error al eliminar la categoría");
    }
};
