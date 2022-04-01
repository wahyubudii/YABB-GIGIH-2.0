import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Center from "../components/Center";
import Bottom from "../components/Bottom";

export default function Home({tokenId}) {
  const [token, setToken] = useState(tokenId);
  return (
    <div>
      <main className="flex">
        <Sidebar />
        <Center tokenId={token} />
      </main>

      <div className="sticky bottom-0">
        <Bottom />
      </div>
    </div>
  );
}
