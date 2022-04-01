import { useState } from "react";
import { milisToMinutesAndSeconds } from "../data/timeConverter";

export default function SearchList({ id, number, image, songTitle, artist, album, duration }) {
  return (
    <div key={id} className="grid grid-cols-2 text-gray-500 py-4 px-1 hover:bg-gray-900 rounded-lg cursor-pointer">
      <div className="flex items-center space-x-6 mx-4">
        <p>{number}</p>
        <img src={image} className="h-10 w-10" />
        <div>
          <p className="w-36 lg:w-64 text-white hover:text-green-400 truncate">
            {songTitle}
          </p>
          <p className="w-36 lg:w-64 truncate">{artist}</p>
        </div>
      </div>

      <div className="flex items-center justify-between ml-auto md:ml-0">
        <p className="w-40 hidden md:inline truncate">
          {album}
        </p>
        <p className="pr-4">{milisToMinutesAndSeconds(duration)}</p>
      </div>
    </div>
    )
}
