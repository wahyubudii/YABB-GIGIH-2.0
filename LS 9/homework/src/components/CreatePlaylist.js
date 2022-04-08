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

  const modalCreatePlaylist = () => {
      return (
        <div id="authentication-modal" tabIndex="-1" aria-hidden="true" className="items-center justify-center overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full">
            <div className="relative p-4 w-full max-w-md h-full md:h-auto">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div className="flex justify-end p-2">
                        <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-toggle="authentication-modal">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>  
                        </button>
                    </div>
                    <form className="px-6 pb-4 space-y-6 lg:px-8 sm:pb-6 xl:pb-8" action="#">
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white">Sign in to our platform</h3>
                        <div>
                            <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your title</label>
                            <input type="title" name="title" id="title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" required />
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your password</label>
                            <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                        </div>
                        <div className="flex justify-between">
                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800" required />
                                </div>
                                <div className="ml-3 text-sm">
                                <label htmlFor="remember" className="font-medium text-gray-900 dark:text-gray-300">Remember me</label>
                                </div>
                            </div>
                            <a href="#" className="text-sm text-blue-700 hover:underline dark:text-blue-500">Lost Password?</a>
                        </div>
                        <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login to your account</button>
                        <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                            Not registered? <a href="#" className="text-blue-700 hover:underline dark:text-blue-500">Create account</a>
                        </div>
                    </form>
                </div>
            </div>
        </div> 
       )
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
            <div className="flex space-x-4">
                <div className="flex flex-col bg-gray-800 text-gray-300 w-80">
                <form
                    onSubmit={searchTracks}
                    className="flex space-x-1 items-center px-3"
                >
                    <SearchIcon className="h-6 w-6" />
                    <input
                    type="text"
                    placeholder="Search for songs"
                    className="items-center p-2 my-1 bg-gray-800 outline-0 w-80 text-sm"
                    onChange={(e) => setSearchKey(e.target.value)}
                    />
                    <button type="submit" />
                </form>
                </div>
                {addPlaylist.length > 0 &&
                    <>
                        <button className="block text-white bg-green-700 hover:bg-green-800 rounded-lg text-sm px-5 py-2" type="button" data-modal-toggle="authentication-modal">Create Playlist</button>
                        <div id="authentication-modal" tabIndex="-1" aria-hidden="true" className="flex items-center justify-center overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full">
                            <div className="relative p-4 w-full max-w-md h-full md:h-auto">
                                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                    <div className="flex justify-end p-2">
                                        <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-2 ml-auto inline-flex items-center" data-modal-toggle="authentication-modal">
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>  
                                        </button>
                                    </div>
                                    <form onSubmit={handleCreatePlaylistSubmit} className="px-6 pb-4 space-y-6 lg:px-8 sm:pb-6 xl:pb-8">
                                        <h3 className="text-xl font-medium text-gray-300">Create your own playlist</h3>
                                        <div>
                                            <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Title</label>
                                            <input onChange={handleCreatePlaylistChange} type="text" name="title" id="title" className="outline-none bg-gray-600 border border-gray-500 text-white text-sm rounded-lg block w-full p-3" required />
                                        </div>
                                        <div>
                                            <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-300">Description</label>
                                            <textarea onChange={handleCreatePlaylistChange} type="text" name="description" id="description" className="outline-none bg-gray-600 border border-gray-500 text-white text-sm rounded-lg block w-full p-3" required />
                                        </div>
                                        <div className="flex items-center">
                                            <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-300">Private</label>
                                            <input onChange={handleCreatePlaylistChange} type="checkbox" name="description" id="description" className="outline-none bg-gray-600 border border-gray-500 text-white text-sm rounded-lg block w-full p-3" required />
                                        </div>
                                        <button type="submit" className="w-full text-white bg-green-700 hover:bg-green-800 rounded-lg text-sm px-5 py-3 text-center">Create Playlist</button>
                                    </form>
                                </div>
                            </div>
                        </div> 
                    </>
                }
            </div>
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
