import { GameState } from "@/constant/game-state";
import usePlayState from "@/store/use-play-state";
import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import { useShallow } from "zustand/shallow";

type props = {
  setIsDisappeared: Dispatch<SetStateAction<boolean>>;
};
export default function CountdownTimer({ setIsDisappeared }: props) {
  const { playState } = usePlayState(
    useShallow((state) => ({
      playState: state.playState,
    })),
  );

  const timer = 30;

  const [timeRemaining, setTimeRemaining] = useState(timer);

  useEffect(() => {
    if (playState === GameState["LOST"]) {
      return;
    }

    if (timeRemaining <= 0) {
      setIsDisappeared(true);
      return;
    }

    const countdownInterval = setInterval(() => {
      setTimeRemaining((prevTime) => prevTime - 1);
    }, 100);

    return () => clearInterval(countdownInterval);
  }, [timeRemaining]);

  const integer = Math.floor(timeRemaining / 10);
  const decimal = timeRemaining % 10;

  if (timeRemaining <= 0) {
    return <></>;
  }

  return (
    <>
      {integer}.{decimal}s
    </>
  );
}
