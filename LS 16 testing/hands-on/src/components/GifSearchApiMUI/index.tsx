import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import { Response } from "../../api/fetchSearch";

type Props = { 
  dataList: Response
  submitHandle: (e: any) => void
  onChangeHandle: (e: any) => void
}

export default function GifSearchApiMUI({dataList, submitHandle, onChangeHandle}: Props) {
  const [data, setData] = useState(dataList);

  useEffect(() => {
    setData(dataList)
  }, [dataList])

  return (
    <div className="flex flex-col items-center space-y-6 pt-[6rem]">
      <form onSubmit={submitHandle}>
        <div className="flex text-slate-600 text-lg space-x-4">
          <input
            type="text"
            placeholder="Search"
            className="p-2 w-80 rounded-lg outline-none"
            onChange={onChangeHandle}
          />
          <Button  variant="contained">Submit</Button>;
        </div>
      </form>
      <div className="flex justify-center flex-wrap  space-x-6 space-y-8">
        {data.map((dataList) => {
          return (
            <div key={dataList.id} className="flex items-center space-y-2 max-w-[300px]">
              <img
                src={dataList.images.original.url}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
