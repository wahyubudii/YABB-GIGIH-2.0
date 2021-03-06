import { useEffect, useState } from "react";
import axios from "axios";
import SearchList from "./SearchList";
import { milisToMinutesAndSeconds } from "../data/timeConverter";

export default function Track({tokenId, tracksData}) {
  const [token, setToken] = useState(tokenId)
  const [searchKey, setSearchKey] = useState("");
  const [tracks, setTracks] = useState(tracksData);

  const BASE_URL = "https://api.spotify.com/v1";

  useEffect(() => {
    setTracks(tracksData)
  }, [tracksData])

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

    setTracks(data.tracks.items);
  };

  const renderTracks = () => {
    return (
      <div className="flex flex-col space-y-1 pb-28 text-white">
        {tracks.map((track, index) => {
          // return (
          //   <SearchList
          //     id={track.id}
          //     number={index + 1}
          //     image={track.album.images[0].url}
          //     songTitle={track.name}
          //     artist={track.artists[0].name}
          //     album={track.album.name}
          //     duration={track.duration_ms}
          //   />
          // )
          return (
            <div key={track.id} className="grid grid-cols-2 text-gray-500 py-4 px-1 hover:bg-gray-900 rounded-lg cursor-pointer">
              <div className="flex items-center space-x-6 mx-4">
                <p>{index + 1}</p>
                <img src={track.album.images[0].url} className="h-10 w-10" />
                <div>
                  <p className="w-36 lg:w-64 text-white hover:text-green-400 truncate">
                    {track.name}
                  </p>
                  <p className="w-36 lg:w-64 truncate">{track.artists[0].name}</p>
                </div>
              </div>
  
              <div className="flex items-center justify-between ml-auto md:ml-0">
                <p className="w-40 hidden md:inline truncate">
                  {track.album.name}
                </p>
                <p className="pr-4">{milisToMinutesAndSeconds(track.duration_ms)}</p>
              </div>
            </div>
          )
        }
      )}
      </div>
    )
  };

  return (
    <>
      {tracks.length ? (
        renderTracks()
      ) : (
        <div>No data found</div>
      )}
    </>
  );
}
