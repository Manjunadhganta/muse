// "use client";

// import React from "react";

// type Props = {
//   queue: any[]; // You can type this better if your song structure is defined
// };

// export default function Queue({ queue }: Props) {
//   if (!queue || queue.length === 0) {
//     return (
//       <div className="bg-white/40 dark:bg-zinc-800/40 backdrop-blur-md p-6 rounded-xl">
//         <h2 className="text-lg font-semibold text-black dark:text-white mb-4">Up Next</h2>
//         <p className="text-gray-500 dark:text-gray-400 text-sm">No songs in queue.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-white/40 dark:bg-zinc-800/40 backdrop-blur-md p-6 rounded-xl max-h-[75vh] overflow-y-auto">
//       <h2 className="text-lg font-semibold text-black dark:text-white mb-4">Up Next</h2>
//       <ul className="space-y-4">
//         {queue.map((song, index) => (
//           <li key={index} className="flex items-center gap-4">
//             <img
//               src={song.image}
//               alt={song.song}
//               className="w-12 h-12 object-cover rounded-md"
//             />
//             <div className="flex flex-col">
//               <span className="text-sm font-medium text-black dark:text-white">
//                 {song.song}
//               </span>
//               <span className="text-xs text-gray-600 dark:text-gray-400">
//                 {song.primary_artists}
//               </span>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }


// src/components/Queue.tsx
import React from "react";

type Props = {
  queue: any[];
  onSongSelect: (song: any) => void;
};

export default function Queue({ queue, onSongSelect }: Props) {
  return (
    <div className="bg-white/60 dark:bg-zinc-900/60 backdrop-blur-lg rounded-2xl p-6 h-full shadow-lg overflow-y-auto">
      <h2 className="text-lg font-semibold text-black dark:text-white mb-4">Up Next</h2>
      {queue.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">No songs in queue.</p>
      ) : (
        <ul className="space-y-3">
          {queue.map((song, index) => (
            <li
              key={index}
              className="flex items-center gap-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 cursor-pointer transition"
              onClick={() => onSongSelect(song)}
            >
              <img src={song.image} alt={song.song} className="w-12 h-12 object-cover rounded" />
              <div>
                <p className="text-sm font-medium text-black dark:text-white">{song.song}</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">{song.primary_artists}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
