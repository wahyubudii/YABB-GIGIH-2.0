import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Bottom from "../components/Bottom";
import CreatePlaylist from "../components/CreatePlaylist";
import { useSelector } from "react-redux";

export default function Home() {
  const { token } = useSelector(state => state.token)
  return (
    <div>
      <main className="flex">
        <Sidebar/>
        <CreatePlaylist />
      </main>

      <div className="sticky bottom-0">
        <Bottom />
      </div>
    </div>
  );
}
