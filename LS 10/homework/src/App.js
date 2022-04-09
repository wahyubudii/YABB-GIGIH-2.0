import Home from "./pages/Home"
import "./App.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "./features/authorization"

function App() {
  const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const REDIRECT_URL = "http://localhost:3000/";

  const SPACE_DELIMITER = "%20";
  const SCOPES = [
    "playlist-modify-private",
  ];
  const SCOPES_URL_PARAM = SCOPES.join(SPACE_DELIMITER);

  const dispatch = useDispatch()
  const { token } = useSelector(state => state.token);

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    document.title = "Homework 10 || Spotify"

    if (!token && hash) {
      token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];

      window.location.hash = "";
      window.localStorage.setItem("token", token);
    }

    dispatch(setToken(token))
  }, []);

  const handleLogin = () => {
    window.location = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL}&scope=${SCOPES_URL_PARAM}&response_type=token&show_dialog=true`;
  };

  return (
    <div className="bg-black h-screen overflow-hidden">
      {!token && (
        <div className="flex flex-col items-center justify-center min-h-screen w-full text-white">
          <button onClick={handleLogin} className="bg-green-500 px-6 py-4 rounded-full text-md">Login to Spotify</button>
        </div>
      )}

      {token && (
        <>
          <Home/>
        </>
      )}
    </div>
  );
}

export default App;
