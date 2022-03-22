import logo from './logo.svg';
import './App.css';
import Task from './pages/home';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    document.title = "Hands-on 4"
 }, []);
  return (
    <div className="App">
      <header className="App-header">
        <Task linkSource="https://i.giphy.com/media/Vh8pbGX3SGRwFDh3V0/source.gif" />
      </header>
    </div>
  );
}

export default App;
