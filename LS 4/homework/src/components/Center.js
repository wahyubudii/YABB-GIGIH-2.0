import { ChevronDownIcon } from "@heroicons/react/solid";
import { shuffle } from "lodash";
import React, { useEffect, useState } from "react";

const colors = [
  "from-indigo-500",
  "from-blue-500",
  "from-green-500",
  "from-red-500",
  "from-yellow-500",
  "from-pink-500",
  "from-purple-500",
];

function Center() {
  const [color, setColor] = useState(null);

  useEffect(() => {
     setColor(shuffle(colors).pop())
  }, []);
  return (
    <div className="flex-grow">
      <header className="absolute top-5 right-8">
        <div className="flex items-center bg-red-300 space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2">
          <img
            src="https://i.pinimg.com/originals/71/12/c6/7112c684ad8669e2ee1c4a38db9b7891.jpg"
            className="rounded-full w-10 h-10"
          />
          <h2>Wahyu Budi</h2>
          <ChevronDownIcon className="h-5 w-5" />
        </div>
      </header>

      <section
        className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 text-white p-8 w-full`}
      >
        {/* <img src='' /> */}
        <h1>Hello</h1>
      </section>
    </div>
  );
}

export default Center;
