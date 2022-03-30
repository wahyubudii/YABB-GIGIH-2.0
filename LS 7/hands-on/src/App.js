import { useEffect } from 'react';
import './App.css';
import GifSearchUrl from './components/GifSearchUrl';
import GifGenerate from './components/GifGenerate';
import GifSearchApi from './components/GifSearchApi';

function App() {
  useEffect(() => {
    document.title = "Hands-on 7"
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <GifSearchUrl urlLink="https://media4.giphy.com/media/4HrBfVJJveBNS9ytSk/200w.gif?cid=cb3f2bebpuo6jj0g5f9gfibjre2zzbb4yb1cfshtplanlrpw&rid=200w.gif&ct=g" gifName="Nintendo Plotting GIF by Gaming GIFs"/>
        {/* <GifGenerate /> */}
        <GifSearchApi />
      </header>
    </div>
  );
}

export default App;
