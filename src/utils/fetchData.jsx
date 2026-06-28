export const exerciseOption = {
  method: "GET",
  headers: {
    // Vite exposes env vars through import.meta.env and requires the VITE_ prefix.
    "x-rapidapi-key": import.meta.env.VITE_RAPID_API_KEY,
    "x-rapidapi-host": "exercisedb.p.rapidapi.com",
    "Content-Type": "application/json",
  },
};

export const youtubeOptions = {
  method: "GET",

  headers: {
    "x-rapidapi-key": import.meta.env.VITE_RAPID_API_KEY,
    "x-rapidapi-host": "youtube-search-and-download.p.rapidapi.com",
    "Content-Type": "application/json",
  },
};

export const fetchData = async (url, options = {}) => {
  // Allow callers to request non-JSON responses (e.g. images) by
  // passing a `returnType` property on the `options` object.
  const { returnType, ...fetchOptions } = options;

  const response = await fetch(url, fetchOptions);
  if (!response.ok) throw new Error(`Request failed: ${response.status}`);

  if (returnType === "blob") {
    return await response.blob();
  }

  return await response.json();
};
