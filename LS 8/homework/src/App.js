import Home from "./pages/Home"
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [token, setToken] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [artists, setArtists] = useState([]);

  const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const REDIRECT_URL = "http://localhost:3000/";

  const SPACE_DELIMITER = "%20";
  const SCOPES = [
    "playlist-modify-private",
  ];
  const SCOPES_URL_PARAM = SCOPES.join(SPACE_DELIMITER);

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
    window.location = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL}&scope=${SCOPES_URL_PARAM}&response_type=token&show_dialog=true`;
  };

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    document.title = "Homework 8 || Spotify"

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

  return (
    <div className="bg-black h-screen overflow-hidden">
      {!token && (
        <div className="flex flex-col items-center justify-center min-h-screen w-full text-white">
          <h1>Haii</h1>
          <button onClick={handleLogin}>Login to Spotify</button>
        </div>
      )}

      {token && (
        <>
          <Home tokenId={token}/>
        </>
      )}
    </div>
  );
}

export default App;
