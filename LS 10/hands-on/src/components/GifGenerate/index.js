import React from "react";
import data from '../../data'

function GifGenerate() {
  return (
    <div className="flex flex-wrap space-x-6 space-y-6">
      {data.map((dataList) => {
        if (dataList.rating === "g") {
          return (
            <div key={dataList.id} className="my-auto space-y-2">
              <img src={dataList.url} className="items.center mx-auto" />
              <h3 className="pt-4 text-sm">{dataList.title}</h3>
              <p className="text-[14px]">Rating: {dataList.rating}</p>
              <p className="text-[14px]">
                Diupload pada: {dataList.uploadedDate}
              </p>
            </div>
          );
        }
      })}
    </div>
  );
}

export default GifGenerate;
