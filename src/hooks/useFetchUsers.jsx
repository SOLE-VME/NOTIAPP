export const fetchProfiles = async (page = 1) => {
    const token = localStorage.getItem("authToken");
    const response = await fetch(`https://sandbox.academiadevelopers.com/users/profiles/?page=${page}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Token ${token}` : "",
        },
    });

    if (!response.ok) {
        throw new Error("Error al obtener los perfiles");
    }

    const data = await response.json();
    return {
        profiles: data.results,
        totalCount: data.count,
        nextPage: data.next ? new URL(data.next).searchParams.get("page") : null,
        prevPage: data.previous ? new URL(data.previous).searchParams.get("page") : null,
    };
};
