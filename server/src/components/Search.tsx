// "use client";

// import React, { useState } from "react";
// import { searchSongs } from "@/lib/api"; // adjust the import path if needed

// export default function Search({ onSongSelect }: { onSongSelect: (song: any) => void }) {
//   const [query, setQuery] = useState("");
//   const [songs, setSongs] = useState<any[]>([]);

//   const handleSearch = async () => {
//     const data = await searchSongs(query);
//     setSongs(data);
//   };

//   return (
//     <div className="p-4">
//       <input
//         value={query}
//         onChange={(e) => setQuery(e.target.value)}
//         className="p-2 border rounded"
//         placeholder="Search a song..."
//       />
//       <button onClick={handleSearch} className="ml-2 p-2 bg-blue-500 text-white rounded">
//         Search
//       </button>

//       <ul className="mt-4">
//         {songs.map((song, idx) => (
//           <li
//             key={idx}
//             className="p-2 hover:bg-gray-100 cursor-pointer"
//             onClick={() => onSongSelect(song)}
//           >
//             {song.song} — {song.primary_artists}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// "use client";

// import React, { useState, useEffect } from "react";
// import { searchSongs } from "@/lib/api"; // adjust path if needed

// type Props = {
//   onSongSelect: (song: any) => void;
// };

// export default function Search({ onSongSelect }: Props) {
//   const [query, setQuery] = useState("");
//   const [suggestions, setSuggestions] = useState<any[]>([]);

//   useEffect(() => {
//     const delayDebounce = setTimeout(async () => {
//       if (query.trim().length > 1) {
//         const results = await searchSongs(query.trim());
//         setSuggestions(results);
//       } else {
//         setSuggestions([]);
//       }
//     }, 300); // debounce

//     return () => clearTimeout(delayDebounce);
//   }, [query]);

//   const handleSelect = (song: any) => {
//     setQuery(""); // clear input
//     setSuggestions([]);
//     onSongSelect(song); // send to parent component
//   };

//   return (
//     <div className="relative w-full max-w-xl mx-auto mt-4">
//       <input
//         type="text"
//         placeholder="Search for a song..."
//         value={query}
//         onChange={(e) => setQuery(e.target.value)}
//         className="w-full px-4 py-2 rounded-xl bg-white/20 dark:bg-zinc-800/40 text-white backdrop-blur-md border border-white/30 focus:outline-none"
//       />

//       {suggestions.length > 0 && (
//         <ul className="absolute z-10 w-full mt-2 bg-white dark:bg-zinc-800 rounded-xl shadow-lg max-h-60 overflow-y-auto">
//           {suggestions.map((song, i) => (
//             <li
//               key={i}
//               onClick={() => handleSelect(song)}
//               className="px-4 py-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-zinc-700 text-black dark:text-white"
//             >
//               {song.song} – {song.primary_artists}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }


"use client";

import React, { useState, useEffect, useRef } from "react";
import { searchSongs } from "@/lib/api";
import { IconSearch } from "@tabler/icons-react"; // Tabler icon

type Props = {
  onSongSelect: (song: any) => void;
};

export default function Search({ onSongSelect }: Props) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (query.trim().length > 1) {
        const results = await searchSongs(query.trim());
        setSuggestions(results);
      } else {
        setSuggestions([]);
      }
    }, 300); // debounce

    return () => clearTimeout(delayDebounce);
  }, [query]);

  const handleSelect = (song: any) => {
    setQuery("");
    setSuggestions([]);
    onSongSelect(song);
  };

  const handleIconClick = () => {
    // Trigger search or focus input
    inputRef.current?.focus();
    if (query.trim().length > 1) {
      searchSongs(query.trim()).then((results) => setSuggestions(results));
    }
  };

  return (
    <div className="relative w-full max-w-xl mx-auto mt-4">
      {/* Input + Icon */}
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          placeholder="Search for a song..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full px-12 py-2 rounded-xl bg-white/20 dark:bg-zinc-800/40 text-white backdrop-blur-md border border-white/30 focus:outline-none"
        />
        <IconSearch
          size={20}
          className="absolute top-1/2 left-4 -translate-y-1/2 text-white/70 cursor-pointer hover:text-white"
          onClick={handleIconClick}
        />
      </div>

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <ul className="absolute z-10 w-full mt-2 bg-white dark:bg-zinc-800 rounded-xl shadow-lg max-h-60 overflow-y-auto">
          {suggestions.map((song, i) => (
            <li
              key={i}
              onClick={() => handleSelect(song)}
              className="px-4 py-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-zinc-700 text-black dark:text-white"
            >
              {song.song} – {song.primary_artists}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
