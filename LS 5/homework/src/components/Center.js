import { ChevronDownIcon } from "@heroicons/react/solid";
import { shuffle } from "lodash";
import React, { useEffect, useState } from "react";
import data from "../data/data";
import Songs from "./Songs";

const colors = [
  "from-indigo-500",
  "from-blue-500",
  "from-green-500",
  "from-red-500",
  "from-yellow-500",
  "from-pink-500",
  "from-purple-500",
];

function Center() {
  const [color, setColor] = useState(null);

  useEffect(() => {
     setColor(shuffle(colors).pop())
  }, []);

  return (
    <div className="flex-grow h-screen overflow-y-scroll scrollbar-hide">
      <header className="absolute top-5 right-8">
        <div className="flex items-center bg-black text-white space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2">
          <img
            src="https://i.pinimg.com/originals/71/12/c6/7112c684ad8669e2ee1c4a38db9b7891.jpg"
            className="rounded-full w-10 h-10"
          />
          <h2>Wahyu Budi</h2>
          <ChevronDownIcon className="h-5 w-5" />
        </div>
      </header>
   
      <section className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 text-white p-8 w-full`}>
        <img src={data.album.images[0].url} className="h-56 w-56 shadow-2xl" />
        <div>
          <p className="font-bold">{data.album.album_type.toUpperCase()}</p>
          <h1 className="text-2xl md:text-3xl xl:text-5xl font-bold">{data.album.name}</h1>
          <div className="pt-4 text-gray-400 flex items-center justify-space-evenly space-x-2 ">
            <img src="https://i.scdn.co/image/6dd0ffd270903d1884edf9058c49f58b03db893d" className="h-7 w-7 rounded-full" />
            <p className="text-white hover:text-green-400"><a href={data.artists[0].external_urls.spotify}>{data.album.artists[0].name}</a></p>
            <span>•</span>
            <p>{data.album.release_date}</p>
            <span>•</span>
            <p>{data.album.total_tracks} songs</p>
          </div>
        </div>
      </section>

      <div>
        <Songs />
      </div>
    </div>
  );
}

export default Center;
