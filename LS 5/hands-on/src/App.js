import './App.css';
import GifGenerate from './components/Gif Generate';
import gif from './data/index';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <GifGenerate urlLink={gif.url} gifName={gif.title}/>
      </header>
    </div>
  );
}

export default App;
