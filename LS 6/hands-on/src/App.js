import { useEffect } from 'react';
import './App.css';
import GifSearch from './components/GifSearch';
import GifGenerate from './components/GifGenerate';

function App() {
  useEffect(() => {
    document.title = "Hands-on 6"
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <GifSearch urlLink="https://media4.giphy.com/media/4HrBfVJJveBNS9ytSk/200w.gif?cid=cb3f2bebpuo6jj0g5f9gfibjre2zzbb4yb1cfshtplanlrpw&rid=200w.gif&ct=g" gifName="Nintendo Plotting GIF by Gaming GIFs"/>
        <GifGenerate />
      </header>
    </div>
  );
}

export default App;
