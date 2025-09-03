// "use client";

// import React from "react";
// import {
//   IconHeart,
//   IconPlayerPause,
//   IconPlayerPlay,
//   IconPlayerSkipBack,
//   IconPlayerSkipForward,
//   IconRepeatOnce,
//   IconArrowsShuffle,
// } from "@tabler/icons-react";
// import { useAudioPlayer } from "@/hooks/useAudioPlayer";

// type Props = {
//   song: {
//     media_url: string;
//     image: string;
//     song: string;
//     primary_artists: string;
//   } | null;
// };

// export default function Music({ song }: Props) {
//   const {
//     audioRef,
//     isPlaying,
//     currentTime,
//     duration,
//     togglePlay,
//     seek,
//   } = useAudioPlayer(song?.media_url ?? null); // ✅ always call hook with safe value

//   const formatTime = (time: number) =>
//     isNaN(time)
//       ? "0:00"
//       : `${Math.floor(time / 60)}:${String(Math.floor(time % 60)).padStart(2, "0")}`;

//   if (!song) {
//     return (
//       <div className="text-center text-gray-500 dark:text-gray-400">
//         No song selected.
//       </div>
//     );
//   }

//   return (
//     <div className="bg-white/60 dark:bg-zinc-900/60 backdrop-blur-md max-w-md mx-auto rounded-2xl shadow-lg p-10">
//       <div className="flex flex-col items-center justify-center gap-6">
//         <img
//           src={song.image}
//           alt={song.song}
//           className="w-60 h-60 object-cover rounded-xl"
//         />
//         <h1 className="text-xl font-semibold text-black dark:text-white">
//           {song.song}
//         </h1>
//         <p className="text-sm text-gray-600 dark:text-gray-400">
//           {song.primary_artists}
//         </p>

//         {/* Audio Player (hidden) */}
//         <audio ref={audioRef} className="hidden" />

//         {/* Progress Bar */}
//         <div className="w-full">
//           <input
//             type="range"
//             value={currentTime}
//             max={duration || 0}
//             onChange={(e) => seek(parseFloat(e.target.value))}
//             className="w-full h-1 bg-gray-300 rounded-lg cursor-pointer accent-indigo-500 dark:accent-white"
//           />
//           <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mt-1">
//             <span>{formatTime(currentTime)}</span>
//             <span>{formatTime(duration)}</span>
//           </div>
//         </div>

//         {/* Controls */}
//         <div className="flex items-center justify-between w-full px-6 mt-4 text-black dark:text-white">
//           <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-zinc-800">
//             <IconRepeatOnce size={24} />
//           </button>
//           <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-zinc-800">
//             <IconPlayerSkipBack size={24} />
//           </button>
//           <button
//             className="p-3 rounded-full hover:bg-gray-200 dark:hover:bg-zinc-800"
//             onClick={togglePlay}
//           >
//             {isPlaying ? (
//               <IconPlayerPause size={48} />
//             ) : (
//               <IconPlayerPlay size={48} />
//             )}
//           </button>
//           <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-zinc-800">
//             <IconPlayerSkipForward size={24} />
//           </button>
//           <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-zinc-800">
//             <IconArrowsShuffle size={24} />
//           </button>
//         </div>

//         {/* Like Button */}
//         <button className="mt-4 rounded-full p-2 hover:bg-gray-200 dark:hover:bg-zinc-800 transition">
//           <IconHeart size={28} />
//         </button>
//       </div>
//     </div>
//   );
// }


"use client";

import React from "react";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import {
  IconHeart,
  IconPlayerPause,
  IconPlayerPlay,
  IconPlayerSkipBack,
  IconPlayerSkipForward,
  IconRepeatOnce,
  IconArrowsShuffle,
} from "@tabler/icons-react";

export default function Music({ song }: { song: any }) {
  const { audioRef, isPlaying, currentTime, duration, togglePlay, seek } =
    useAudioPlayer(song?.media_url);

  const formatTime = (time: number) =>
    isNaN(time)
      ? "0:00"
      : `${Math.floor(time / 60)}:${String(Math.floor(time % 60)).padStart(2, "0")}`;

  if (!song) return null;

  return (
    <div className="flex flex-col items-center text-black dark:text-white gap-4">
      <img src={song.image} className="w-80 h-80 rounded-xl shadow-xl" alt="cover" />

      <h1 className="text-2xl font-bold">{song.song}</h1>
      <p className="text-sm text-gray-600 dark:text-gray-400">{song.primary_artists}</p>

      <audio ref={audioRef} className="hidden" />

      <div className="w-full px-4">
        <input
          type="range"
          value={currentTime}
          max={duration}
          onChange={(e) => seek(parseFloat(e.target.value))}
          className="w-full accent-black dark:accent-white"
        />
        <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      <div className="flex items-center gap-6 mt-2">
        <IconRepeatOnce size={24} />
        <IconPlayerSkipBack size={24} />
        <button onClick={togglePlay}>
          {isPlaying ? <IconPlayerPause size={48} /> : <IconPlayerPlay size={48} />}
        </button>
        <IconPlayerSkipForward size={24} />
        <IconArrowsShuffle size={24} />
      </div>
    </div>
  );
}
