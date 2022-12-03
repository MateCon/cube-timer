import type { NextPage } from "next";
import React, { useEffect, useState } from "react";
import Stopwatch from "../components/stopwatch";
import ScrambleViewer from "../components/scramble-viewer";
import TimeViewer from "../components/time-viewer";
import Time from "../models/Time";
import dynamic from "next/dynamic";
import { load, save } from "../helpers/localstorage";

const Home: NextPage = () => {
  const [times, setTimes] = useState<Time[]>(load("solves") || []);
  const [lastSolve, setLastSolve] = useState<Time | undefined>();

  useEffect(() => {
    if (!lastSolve || lastSolve.time === undefined) return;
    setTimes((prev) => [...prev, lastSolve]);
  }, [lastSolve, setTimes]);

  useEffect(() => {
    save("solves", times);
  }, [times]);

  return (
    <div className="h-screen flex flex-col text-white bg-[rgb(20,20,20)]">
      <ScrambleViewer lastSolve={lastSolve} />
      <TimeViewer times={times} setTimes={setTimes} />
      <Stopwatch setLastSolve={setLastSolve} />
    </div>
  );
};

export default dynamic(() => Promise.resolve(Home), { ssr: false });
