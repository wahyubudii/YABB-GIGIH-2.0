import Sidebar from "./components/Sidebar";
import Center from "./components/Center";
import Player from "./components/Player";
import "./App.css";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    document.title = "Homework 4 || Spotify"
  }, []);
  return (
    <div className="bg-black h-screen overflow-hidden">
      <main className="flex">
        <Sidebar />
        <Center />
      </main>

      <div className="sticky bottom-0">
        <Player />
      </div>
    </div>
  );
}

export default App;
