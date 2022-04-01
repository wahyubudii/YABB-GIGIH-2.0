import { useEffect } from 'react';
import './App.css';
import GifSearchUrl from './components/GifSearchUrl';
import GifGenerate from './components/GifGenerate';
import GifSearchApi from './components/GifSearchApi';

import axios from "axios";
import React, { useState } from "react";

function App() {
  const [data, setData] = useState([]);
  const [searchKey, setSearchKey] = useState("");

  useEffect(() => {
    document.title = "Hands-on 8"
  }, [])

  const submitHandle = (e) => {
    e.preventDefault();
    e.target[0].value = "";

    axios
      .get(`https://api.giphy.com/v1/gifs/search`, {
        params: {
          api_key: process.env.REACT_APP_GIPHY_KEY,
          q: { searchKey },
          limit: 12,
        },
      })
      .then((response) => {
        setData(response.data.data);
      });
  };

  const onChangeHandle = (e) => {
    setSearchKey(e.target.value)
  }

  return (
    <div className="App">
      <header className="App-header">
        {/* <GifSearchUrl urlLink="https://media4.giphy.com/media/4HrBfVJJveBNS9ytSk/200w.gif?cid=cb3f2bebpuo6jj0g5f9gfibjre2zzbb4yb1cfshtplanlrpw&rid=200w.gif&ct=g" gifName="Nintendo Plotting GIF by Gaming GIFs"/> */}
        {/* <GifGenerate /> */}
        <GifSearchApi datas={data} onChangeHandle={onChangeHandle} submitHandle={submitHandle}/>
      </header>
    </div>
  );
}

export default App;
