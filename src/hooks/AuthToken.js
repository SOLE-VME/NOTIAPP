async function fetchAuthToken(username, password) {
    const urlBase = "https://sandbox.academiadevelopers.com/api-auth/";
  
    try {
      const response = await fetch(urlBase, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `Error ${response.status}: ${
            errorData.message || "Failed to authenticate"
          }`
        );
      }
  
      return await response.json(); // Devuelve el token o la respuesta de autenticación
    } catch (error) {
      // Propaga el error con un mensaje claro
      throw new Error(`Authentication failed: ${error.message}`);
    }
  }
  
  export default fetchAuthToken;