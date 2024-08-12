export const fetchCategories = async () => {
    const token = localStorage.getItem("authToken");
    const response = await fetch("https://sandbox.academiadevelopers.com/infosphere/categories/", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Token ${token}` : "",
        },
    });

    if (!response.ok) {
        throw new Error("Error al obtener las categorías");
    }

    const data = await response.json();
    console.log("API Response:", data); 
    return data.results || []; 
};
