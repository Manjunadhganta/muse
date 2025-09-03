// "use client";

// import React, { useState } from "react";
// import Music from "@/components/Music";
// import Search from "@/components/Search";

// export default function HomePage() {
//   const [selectedSong, setSelectedSong] = useState(null);

//   return (
//     <div className="min-h-screen p-4 bg-gray-100 dark:bg-black text-black dark:text-white">
//       <Search onSongSelect={setSelectedSong} />
//       <Music song={selectedSong} />
//     </div>
//   );
// }


// "use client";

// import React, { useState } from "react";
// import Search from "@/components/Search";
// import Music from "@/components/Music";
// import Queue from "@/components/Queue";

// export default function HomePage() {
//   const [selectedSong, setSelectedSong] = useState<any>(null);
//   const [queue, setQueue] = useState<any[]>([]);

//   const handleSongSelect = (song: any) => {
//     setCurrentSong(song);
//     setQueue((prevQueue) => [song, ...prevQueue.filter((s) => s.id !== song.id)]);
//   };

//   return (
//     <main className="min-h-screen p-6 bg-gradient-to-br from-zinc-100 to-zinc-300 dark:from-zinc-800 dark:to-zinc-900">
//       <Search onSongSelect={handleSongSelect} />
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
//         <div className="glass rounded-xl p-6 shadow-xl">
//           <Music song={selectedSong} />
//         </div>
//         <div className="glass rounded-xl p-6 shadow-xl">
//           <Queue queue={queue} onSongSelect={handleSongSelect} />
//         </div>
//       </div>
//     </main>
//   );
// }


"use client";

import React, { useState } from "react";
import Search from "@/components/Search";
import Music from "@/components/Music";
import Queue from "@/components/Queue";

export default function HomePage() {
  const [selectedSong, setSelectedSong] = useState<any>(null);
  const [queue, setQueue] = useState<any[]>([]);

  const handleSongSelect = async (song: any) => {
  setSelectedSong(song);

  // Add selected song to top of queue
  setQueue((prevQueue) => [song, ...prevQueue.filter((s) => s.id !== song.id)]);

  // ✅ Fetch recommendations
  try {
    const res = await fetch(`http://localhost:5100/song/?query=${encodeURIComponent(song.primary_artists)}`);
    const data = await res.json();

    if (data.status !== false && Array.isArray(data.results)) {
      const recommendations = data.results
        .filter((s: any) => s.id !== song.id) // Avoid duplicate
        .slice(0, 5); // Limit to 5 recommendations

      setQueue((prevQueue) => [
        ...prevQueue,
        ...recommendations.filter((rec) => !prevQueue.some((q) => q.id === rec.id))
      ]);
    }
  } catch (error) {
    console.error("Error fetching recommendations:", error);
  }
};


  return (
    <main className="min-h-screen p-6 bg-gradient-to-br from-zinc-100 to-zinc-300 dark:from-zinc-800 dark:to-zinc-900">
      <Search onSongSelect={handleSongSelect} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10 h-[80vh]">
        <div className="glass rounded-xl p-6 shadow-xl overflow-y-auto">
          <Music song={selectedSong} />
        </div>
        <div className="glass rounded-xl p-6 shadow-xl overflow-y-auto">
          <Queue queue={queue} onSongSelect={handleSongSelect} />
        </div>
      </div>
    </main>
  );
}
