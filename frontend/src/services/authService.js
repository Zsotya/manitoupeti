// Ellenőrzi, hogy a JWT token lejárt-e
function isTokenExpired(token) {
  if (!token) {
    return true; // Nincs token, lejártnak tekintjük
  }

  const tokenData = parseToken(token);
  if (!tokenData || !tokenData.exp) {
    return true; // Token adat érvénytelen, vagy nincs lejárati ideje
  }

  const currentTime = Math.floor(Date.now() / 1000); // Jelenlegi dátum másodpercben
  return tokenData.exp < currentTime;
}

// JWT token dekódolása, elemzés
function parseToken(token) {
  try {
    // Base64 formátummá formázás
    const [, payload] = token.split(".");
    const base64 = payload.replace("-", "+").replace("_", "/");
    return JSON.parse(atob(base64));
  } catch (error) {
    console.error("Hiba a token elemzése közben:", error);
    return null;
  }
}

// Felhasználó kijelentkeztetése
function logoutUser() {
  localStorage.removeItem("token");
  localStorage.removeItem("isMainAdmin");
}

export default {
  isTokenExpired,
  logoutUser,
};
