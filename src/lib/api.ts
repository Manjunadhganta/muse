// export const searchSongs = async (query: string) => {
//   try {
//     const res = await fetch(`http://192.168.0.107:5100/song/?query=${query}`);
//     const data = await res.json();
//     return data;
//   } catch (err) {
//     console.error("Error fetching songs:", err);
//     return [];
//   }
// };


import axios from "axios";

const API_BASE_URL = "http://192.168.0.107:5100";

export const searchSongs = async (query: string) => {
  try {
    const res = await axios.get(`${API_BASE_URL}/song/`, {
      params: { query },
    });
    return res.data;
  } catch (error) {
    console.error("Error fetching songs:", error);
    return [];
  }
};
