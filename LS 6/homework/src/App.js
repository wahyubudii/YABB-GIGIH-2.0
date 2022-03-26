import Sidebar from "./components/Sidebar";
import Center from "./components/Center";
import Bottom from "./components/Bottom";
import "./App.css";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    document.title = "Homework 6 || Spotify"
  }, []);
  return (
    <div className="bg-black h-screen overflow-hidden">
      <main className="flex">
        <Sidebar />
        <Center />
      </main>

      <div className="sticky bottom-0">
        <Bottom />
      </div>
    </div>
  );
}

export default App;
