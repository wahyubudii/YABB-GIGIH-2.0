import axios from "axios";
import React, { useEffect, useState } from "react";

export default function GifSearchApi({datas, submitHandle, onChangeHandle}) {
  const [data, setData] = useState(datas);

  useEffect(() => {
    setData(datas)
  }, [datas])

  return (
    <div className="flex flex-col justify-center items-center space-y-6 pt-[6rem]">
      <form onSubmit={submitHandle}>
        <div className="flex items-center text-slate-600 text-lg space-x-4">
          <input
            type="text"
            placeholder="Search"
            className="p-2 w-80 rounded-lg outline-none"
            onChange={onChangeHandle}
          />
          <button type="submit" className="bg-transparent text-white font-semibold py-2 px-4 border border-white rounded hover:bg-blue-500 hover:text-white hover:border-transparent rounded-lg">Submit</button>
        </div>
      </form>
      <div className="flex items-center justify-center flex-wrap space-x-6 space-y-6 pb-24">
        {data.map((dataList) => {
          return (
            <div key={dataList.id} className="my-auto w-1/5">
              <img
                src={dataList.images.original.url}
                className="mx-auto max-w-xs p-4"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
