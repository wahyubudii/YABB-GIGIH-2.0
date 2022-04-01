import { LogoutIcon, SearchIcon } from "@heroicons/react/outline";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { shuffle } from "lodash";
import React, { useEffect, useState } from "react";
import Songs from "./Songs";
import data from "../data/data";
import Track from "./Track";
import axios from "axios";

const colors = [
  "from-indigo-500",
  "from-blue-500",
  "from-green-500",
  "from-red-500",
  "from-yellow-500",
  "from-pink-500",
  "from-purple-500",
];

export default function Center({tokenId}) {
  const [color, setColor] = useState(null);
  const [token, setToken] = useState(tokenId);
  const [searchKey, setSearchKey] = useState("");
  const [artists, setArtists] = useState([]);
  const [tracks, setTracks] = useState([]);

  const BASE_URL = "https://api.spotify.com/v1";
  
  useEffect(() => {
    setColor(shuffle(colors).pop())
  }, []);
  
  const searchTracks = async (e) => {
    e.preventDefault();
    e.target[0].value = "";
    const { data } = await axios.get(`${BASE_URL}/search`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        q: searchKey,
        type: "track,artist",
      },
    });

    setArtists(data.artists.items);
    setTracks(data.tracks.items);
  };

  const logout = () => {
    setToken("");
    window.localStorage.removeItem("token");
    window.location = "http://localhost:3000"
  };

  return (
    <div className="flex-grow h-screen overflow-y-scroll scrollbar-hide responsive">
      <header className="absolute top-5 right-8">
        <div className="group inline-block">
          <button type="button" id="dropdownDefault" data-dropdown-toggle="dropdown" className="flex items-center bg-black text-white space-x-3 hover:opacity-90 cursor-pointer rounded-full p-1 pr-2">
            <img
              src="https://i.pinimg.com/originals/71/12/c6/7112c684ad8669e2ee1c4a38db9b7891.jpg"
              className="rounded-full w-10 h-10"
            />
            <h2>Wahyu Budi</h2>
            <ChevronDownIcon className="h-5 w-5" />
          </button>
          <div className="origin-top-right text-left absolute hidden group-hover:block right-0 mt-1 w-56 rounded-md bg-black">
            <a href="#" className="text-white block px-5 py-4 text-sm">Account</a>
            <button onClick={logout} className='flex items-center justify-between text-white text-sm hover:bg-red-500 space-x-2 px-5 py-4 w-full'>
                <p>Logout</p>
                <LogoutIcon className='h-5 w-5'/>
            </button>
          </div>
        </div>
      </header>
   
      <section className={`bg-gradient-to-b to-black ${color} h-84 text-white w-full`}>
        <div className="pt-6 w-26 px-8">
            <div className="flex flex-col text-gray-500 bg-white rounded-full w-80">
              <form onSubmit={searchTracks} className="flex space-x-2 items-center px-3">
                <SearchIcon className='h-7 w-7'/>
                <input type="text" placeholder="Search" className="p-1 my-1 bg-white outline-0 w-80 rounded-full" onChange={(e) => setSearchKey(e.target.value)}/>
                <button type={"submit"} />
              </form>
            </div>
        </div>
        <div className="flex items-end space-x-7 p-8 pt-12">
          {tracks.length ? (
            <>
              {tracks.slice(1,2).map((track) => {
                return (
                  <div key={track.id} className="flex items-end space-x-7">
                    <img src={track.album.images[0].url} className="h-56 w-56 shadow-2xl" />
                    <div>
                      <p className="font-bold">{track.album.album_type.toUpperCase()}</p>
                      <h1 className="text-2xl md:text-3xl xl:text-5xl font-bold">{track.album.name}</h1>
                      <div className="pt-4 text-gray-400 flex items-center justify-space-evenly space-x-2 ">
                        {artists.length ? (
                          <img src={artists[0].images[0].url} className="h-7 w-7 rounded-full" />
                        ) : (
                          <img src={track.album.images[0].url} className="h-7 w-7 rounded-full" />
                        )}
                        
                        <p className="text-white hover:text-green-400"><a href={track.artists[0].external_urls.spotify}>{track.artists[0].name}</a></p>
                        <span>•</span>
                        <p>{track.album.release_date}</p>
                        <span>•</span>
                        <p>{track.album.total_tracks} tracks</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </>
          ) : (
            <>
              <img src={data[0].album.images[0].url} className="h-56 w-56 shadow-2xl" />
              <div>
                <p className="font-bold">{data[0].album.album_type.toUpperCase()}</p>
                <h1 className="text-2xl md:text-3xl xl:text-5xl font-bold">{data[0].album.name}</h1>
                <div className="pt-4 text-gray-400 flex items-center justify-space-evenly space-x-2 ">
                  <img src="https://i.scdn.co/image/6dd0ffd270903d1884edf9058c49f58b03db893d" className="h-7 w-7 rounded-full" />
                  <p className="text-white hover:text-green-400"><a href={data[0].artists[0].external_urls.spotify}>{data[0].album.artists[0].name}</a></p>
                  <span>•</span>
                  <p>{data[0].album.release_date}</p>
                  <span>•</span>
                  <p>{data[0].album.total_tracks} songs</p>
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      <div className="space-y-4 pt-4">
        <div className="px-8 flex flex-col space-y-1 text-gray-500">
          {tracks.length ? (
            <Track tokenId={tokenId} tracksData={tracks}/>
          ) : (
            <Songs />
          )}
        </div>
      </div>
    </div>
  );
}