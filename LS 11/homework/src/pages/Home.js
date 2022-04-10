import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Center from "../components/Center";
import Bottom from "../components/Bottom";
import { useSelector } from "react-redux";

export default function Home() {
  const { token } = useSelector(state => state.token)
  return (
    <div>
      <main className="flex">
        <Sidebar/>
        <Center />
      </main>

      <div className="sticky bottom-0">
        <Bottom />
      </div>
    </div>
  );
}
