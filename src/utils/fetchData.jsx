export const exerciseOption = {
  method: "GET",
  headers: {
    // Vite exposes env vars through import.meta.env and requires the VITE_ prefix.
    "x-rapidapi-key": import.meta.env.VITE_RAPID_API_KEY,
    "x-rapidapi-host": "exercisedb.p.rapidapi.com",
    "Content-Type": "application/json",
  },
};

export const fetchData = async (url, options) => {
  const response = await fetch(url, options);
  const data = await response.json();
  return data;
};
