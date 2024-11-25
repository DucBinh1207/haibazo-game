import { GameState } from "@/constant/game-state";
import usePlayState from "@/store/use-play-state";
import React, { useState, useEffect } from "react";
import { useShallow } from "zustand/shallow";

export default function GameTimer({ playState }: { playState: number }) {
  const { restartKey } = usePlayState(
    useShallow((state) => ({
      restartKey: state.restartKey,
    })),
  );

  const timer = 0;

  const [time, setTime] = useState(timer);

  const integer = Math.floor(time / 10);
  const decimal = time % 10;

  useEffect(() => {
    if (playState !== GameState["PLAY"] && playState !== GameState["AUTO"])
      return;

    const countdownInterval = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 100);

    return () => clearInterval(countdownInterval);
  }, [time]);

  useEffect(() => {
    setTime(0);
  }, [restartKey]);

  return (
    <>
      {integer}.{decimal}s
    </>
  );
}
