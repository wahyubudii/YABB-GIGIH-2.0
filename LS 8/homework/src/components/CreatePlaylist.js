import { SearchIcon } from "@heroicons/react/outline";
import { shuffle } from "lodash";
import { useEffect, useState } from "react";
import { milisToMinutesAndSeconds } from "../data/timeConverter";
import axios from "axios";
import Header from "./Header";

const colors = [
  "from-indigo-500",
  "from-blue-500",
  "from-green-500",
  "from-red-500",
  "from-yellow-500",
  "from-pink-500",
  "from-purple-500",
  "from-gray-500",
];

export default function CreatePlaylist({ tokenId }) {
  const [color, setColor] = useState(null);
  const [token, setToken] = useState(tokenId);
  const [searchKey, setSearchKey] = useState("");
  const [artists, setArtists] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [selectedTracksUri, setSelectedTracksUri] = useState([]);
  const [isSelected, setIsSelected] = useState(false);
  const [addPlaylist, setAddPlaylist] = useState([]);
  const [totalDuration, setTotalDuration] = useState(0);
  const [playlist, setPlaylist] = useState({
      title: "",
      description: "",
      private: true
  })

  const BASE_URL = "https://api.spotify.com/v1";

  useEffect(() => {
    setColor(shuffle(colors).pop());
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

  const toggleSelect = (track) => {
    const uri = track.uri;
    const songDuration = track.duration_ms

    setTotalDuration(totalDuration + songDuration)

    // delete
    if (selectedTracksUri.includes(uri)) {
      setSelectedTracksUri(selectedTracksUri.filter((item) => item !== uri));
      setAddPlaylist(addPlaylist.filter((item) => item !== track));
      setIsSelected(false);
    } else {
      setSelectedTracksUri([...selectedTracksUri, uri]);
      setAddPlaylist([...addPlaylist, track]);
      setIsSelected(true);
    }
  };

  const handleCreatePlaylistChange = (e) => {
      const {name, value} = e.target;
      setPlaylist({...playlist, [name]: value});
  }

  const handleCreatePlaylistSubmit = (e) => {
      e.preventDefault();
      console.log(playlist)
  }

  return (
    <div className="flex-grow h-screen overflow-y-scroll scrollbar-hide responsive">
      <Header tokenId={tokenId} />

      <section
        className={`bg-gradient-to-b to-black ${color} h-84 text-white w-full`}
      >
        {addPlaylist.length > 0 ? (
          addPlaylist.slice(0, 1).map((playlist) => {
            return (
              <div
                key={playlist.id}
                className="flex items-end space-x-7 p-8 pt-12"
              >
                <div key={playlist.key} className="flex items-end space-x-7">
                  <img
                    src={playlist.album.images[0].url}
                    className="h-56 w-56 shadow-2xl"
                  />
                  <div>
                    <p className="font-bold">Playlist</p>
                    <h1 className="pt-2 text-2xl md:text-3xl xl:text-5xl font-bold">
                      {playlist.name}
                    </h1>
                    <div className="pt-4 text-gray-400 flex items-center justify-space-evenly space-x-2 ">
                      <p className="text-white hover:text-green-400">
                        <a href="">Wahyu Budi</a>
                      </p>
                      <span>•</span>
                      <p>{addPlaylist.length} songs</p>
                      <span>•</span>
                      <p>{milisToMinutesAndSeconds(totalDuration)} min</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="flex items-end space-x-7 p-8 pt-12">
            <div className="flex items-end space-x-7">
              <img src="https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg" className="h-56 w-56 shadow-2xl" />
              <div>
                <p className="font-bold">Playlist</p>
                <h1 className="text-3xl md:text-4xl xl:text-7xl font-bold">
                  My Playlist #1
                </h1>
                <p className="pt-6 font-bold text-sm">Wahyu Budi</p>
              </div>
            </div>
          </div>
        )}
      </section>

      <div className="space-y-4 pt-4">
        <div className="px-8 flex flex-col space-y-6 text-white">
          <div className="flex flex-col space-y-1 text-white">
            {addPlaylist.length > 0 ? (
              addPlaylist.map((playlist) => {
                return (
                  <div
                    key={playlist.id}
                    className="grid grid-cols-2 text-gray-500 text-sm py-2 px-1 hover:bg-gray-900 rounded-lg cursor-pointer"
                  >
                    <div className="flex items-center space-x-3 mx-2">
                      <img
                        src={playlist.album.images[0].url}
                        className="h-9 w-9"
                      />
                      <div>
                        <p className="w-36 lg:w-64 text-white hover:text-green-400 truncate">
                          {playlist.name}
                        </p>
                        <p className="w-36 lg:w-64 truncate">
                          {playlist.artists[0].name}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between ml-auto md:ml-0 mx-4">
                      <p className="w-40 hidden md:inline truncate">
                        {playlist.album.name}
                      </p>
                      <p className="pr-4">
                        {milisToMinutesAndSeconds(playlist.duration_ms)}
                      </p>
                      {!addPlaylist.includes(playlist.uri) && (
                        <button
                          onClick={() => toggleSelect(playlist)}
                          className="bg-red-700 hover:bg-red-800 text-white py-2 rounded-full w-20"
                        >
                          Deselect
                        </button>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <div></div>
            )}
          </div>

          <div className="w-full space-y-3">
            <h1 className="text-lg font-bold">
              Let's find something for your playlist
            </h1>
          </div>

          <hr className="border-slate-800" />

          <div className="flex flex-col space-y-1 pb-28 text-white">
            {tracks.slice(1, 10).map((track) => {
              return (
                <div
                  key={track.id}
                  className="grid grid-cols-2 text-gray-500 text-sm py-2 px-1 hover:bg-gray-900 rounded-lg cursor-pointer"
                >
                  <div className="flex items-center space-x-3 mx-2">
                    <img src={track.album.images[0].url} className="h-9 w-9" />
                    <div>
                      <p className="w-36 lg:w-64 text-white hover:text-green-400 truncate">
                        {track.name}
                      </p>
                      <p className="w-36 lg:w-64 truncate">
                        {track.artists[0].name}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between ml-auto md:ml-0 mx-4">
                    <p className="w-40 hidden md:inline truncate">
                      {track.album.name}
                    </p>
                    <p className="pr-4">
                      {milisToMinutesAndSeconds(track.duration_ms)}
                    </p>
                    {selectedTracksUri.includes(track.uri) ? (
                      <button
                        onClick={() => toggleSelect(track)}
                        className="bg-red-700 hover:bg-red-800 text-white py-2 rounded-full w-20"
                      >
                        Deselect
                      </button>
                    ) : (
                      <button
                        onClick={() => toggleSelect(track)}
                        className="border-[1px] border-grey-700 bg-black hover:bg-white hover:text-black text-white py-2 rounded-full w-20"
                      >
                        Select
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
