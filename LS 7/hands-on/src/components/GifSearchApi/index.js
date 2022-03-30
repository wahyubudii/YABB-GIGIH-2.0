import axios from "axios";
import React, { useEffect, useState } from "react";

export default function GifSearchApi() {
  const [data, setData] = useState([]);
  const [value, setValue] = useState("");

  const submitHandle = (event) => {
    event.preventDefault();
    event.target[0].value = "";

    axios
      .get(`https://api.giphy.com/v1/gifs/search`, {
        params: {
          api_key: process.env.REACT_APP_GIPHY_KEY,
          q: { value },
          limit: 12,
        },
      })
      .then((response) => {
        setData(response.data.data);
      });
  };

  return (
    <div className="flex flex-col justify-center items-center space-y-6 pt-[6rem]">
      <form onSubmit={submitHandle}>
        <div className="flex items-center text-slate-600 text-lg space-x-4">
          <input
            type="text"
            placeholder="Masukkan url link gif disini"
            className="p-2 w-80"
            onChange={(e) => {
              setValue(e.target.value);
            }}
          />
          <input
            type="submit"
            className="bg-transparent text-white font-semibold py-2 px-4 border border-white rounded hover:bg-blue-500 hover:text-white hover:border-transparent"
          />
        </div>
      </form>
      <div className="flex flex-wrap space-x-6 space-y-6">
        {data.map((dataList) => {
          return (
            <div key={dataList.id} className="my-auto space-y-2">
              <img
                src={dataList.images.original.url}
                className="items.center mx-auto"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
