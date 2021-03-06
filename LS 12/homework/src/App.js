import Home from "./pages/Home"
import Login from "./pages/Login";
import Error from "./pages/Error";
import "./App.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "./features/authorization"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import CreatePlaylistPage from "./pages/CreatePlaylistPage";

function App() {
  const dispatch = useDispatch()
  const { token } = useSelector(state => state.token);

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    document.title = "Homework 12 || Spotify"

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

  return (
    <Router>
      <div className="bg-black h-screen overflow-hidden">
        <Routes>
          <Route path="*" element={<Error />}/>

          {/* Home */}
          <Route path="/" element={token ? (
            <Navigate to='/home' />
          ) : (
            <Login />
          )} />
          <Route path="/home" element={!token ? (
            <Navigate to='/' />
          ) : (
            <Home />
          )} />

          {/* Create Playlist */}
          <Route path="/create-playlist" element={!token ? (
            <Navigate to='/' />
          ) : (
            <CreatePlaylistPage />
          )}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
