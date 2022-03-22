import Sidebar from "./components/Sidebar";
import Center from "./components/Center";
import "./App.css";

function App() {
  return (
    <>
      <main className="bg-black h-screen overflow-hidden flex">
        <Sidebar />
        <Center />
        {/* Center */}
      </main>

      <div>{/* Player */}</div>
    </>
  );
}

export default App;
