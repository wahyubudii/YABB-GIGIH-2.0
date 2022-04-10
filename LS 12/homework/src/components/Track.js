import { useEffect, useState } from "react";
import SearchList from "./SearchList";

export default function Track({ tracksData }) {
  const [tracks, setTracks] = useState(tracksData);

  useEffect(() => {
    setTracks(tracksData);
  }, [tracksData]);

  return (
    <>
      {tracks.length ? <SearchList data={tracks} /> : <div>No data found</div>}
    </>
  );
}
