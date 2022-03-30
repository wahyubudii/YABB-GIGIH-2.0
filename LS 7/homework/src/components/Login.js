import { useEffect, useState } from "react";
import axios from "axios";

export default function Login() {
  const [token, setToken] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    if (window.location.hash) {
      const { access_token, expires_in, token_type } = getParamsSporifyAuth(
        window.location.hash
      );

      localStorage.clear();
      localStorage.setItem("accessToken", access_token);
      localStorage.setItem("experiedIn", expires_in);
      localStorage.setItem("tokenType", token_type);
    }
  });

  const handleLogin = () => {
    window.location = `${SPOTIFY_AUTHORIZE_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL_AFTER_LOGIN}&scope=${SCOPES_URL_PARAM}&response_type=token&show_dialog=true`;
  };

  const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
  const SPOTIFY_AUTHORIZE_ENDPOINT = "https://accounts.spotify.com/authorize";
  const REDIRECT_URL_AFTER_LOGIN = "http://localhost:3000/";

  const SPACE_DELIMITER = "%20";
  const SCOPES = [
    "playlist-modify-private",
    "user-read-currently-playing",
    "user-modify-playback-state",
  ];
  const SCOPES_URL_PARAM = SCOPES.join(SPACE_DELIMITER);

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    if (!token && hash) {
      token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];

      window.location.hash = "";
      window.localStorage.setItem("token", token);
    }

    setToken(token);
  }, []);

  const getParamsSporifyAuth = (hash) => {
    const stringAfterHastag = hash.substring(1);
    const paramsInUrl = stringAfterHastag.split("&");
    const paramsSplitUp = paramsInUrl.reduce((accumulater, currentValue) => {
      console.log(currentValue);
      const [key, value] = currentValue.split("=");
      accumulater[key] = value;
      return accumulater;
    }, {});
    return paramsSplitUp;
  };

  const logout = () => {
    setToken("");
    window.localStorage.removeItem("token");
  };

  const searchArtists = async (e) => {
    e.preventDefault();
    const { data } = await axios.get("https://api.spotify.com/v1/search", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        q: searchKey,
        type: "artist",
      },
    });

    setArtists(data.artists.items);
  };

  const renderArtists = () => {
    return artists.map((artist) => (
      <div key={artist.id}>
        {artist.images.length ? (
          <img width={"100%"} src={artist.images[0].url} alt="" />
        ) : (
          <div>No Image</div>
        )}
        {artist.name}
      </div>
    ));
  };

  return (
    <div className="flex flex-col items-center bg-black min-h-screen w-full justify-center text-white">
      {!token ? (
        <>
          <h1>Haii</h1>
          <button onClick={handleLogin}>Login to Spotify</button>
        </>
      ) : (
        <button onClick={logout}>Logout</button>
      )}

      {token ? (
        <form onSubmit={searchArtists}>
          <input type="text" onChange={(e) => setSearchKey(e.target.value)} />
          <button type={"submit"}>Search</button>
        </form>
      ) : (
        <h2>Please login</h2>
      )}

      {renderArtists()}
    </div>
  );
}
