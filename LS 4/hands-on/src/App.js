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
        <Task />
      </header>
    </div>
  );
}

export default App;