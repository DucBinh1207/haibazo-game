"use client";

import { GameState, TitleMapping } from "@/constant/game-state";
import useNode from "@/store/use-node";
import usePlayState from "@/store/use-play-state";
import cn from "@/utils/cn";
import { ChangeEvent, useState } from "react";
import { useShallow } from "zustand/shallow";
import GameTimer from "./game-timer";

export default function GameControlPanel() {
  const { playState, setRestart, setPlayState } = usePlayState(
    useShallow((state) => ({
      playState: state.playState,
      setRestart: state.setRestart,
      setPlayState: state.setPlayState,
    })),
  );

  const { clearNode, setTotalNodes } = useNode(
    useShallow((state) => ({
      clearNode: state.clearNode,
      setTotalNodes: state.setTotalNodes,
    })),
  );

  const [points, setPoints] = useState("");

  function isValid(value: string) {
    const regex = /^-?[1-9]\d*$/;
    return regex.test(value);
  }

  function handleChangePoints(e: ChangeEvent<HTMLInputElement>) {
    if (isValid(e.target.value)) {
      setPoints(e.target.value);
    } else {
      setPoints("");
    }
  }

  function handlePlay() {
    if (points !== "") {
      setTotalNodes(Number(points));
      setPlayState(GameState["PLAY"]);
    }
  }

  function handleRestart() {
    setPlayState(GameState["PLAY"]);

    if (playState === GameState["AUTO"])
      setTimeout(() => {
        clearNode();
        setRestart();
      }, 1000);
    else {
      clearNode();
      setRestart();
    }
  }

  function handleAutoPlay() {
    if (playState === GameState["AUTO"]) setPlayState(GameState["PLAY"]);
    else {
      setPlayState(GameState["AUTO"]);
    }
  }

  function handleNewGame() {
    setPlayState(GameState["IDLE"]);
    setTotalNodes(null);
    setPoints("");

    if (playState === GameState["AUTO"])
      setTimeout(() => {
        clearNode();
      }, 1000);
    else {
      clearNode();
    }
  }

  return (
    <ul>
      <li>
        <h1
          className={cn("text-[25px] font-bold uppercase", {
            "text-green-600": playState === GameState["WON"],
            "text-red-600": playState === GameState["LOST"],
          })}
        >
          {TitleMapping[playState]}
        </h1>
      </li>
      <li className="my-[10px] flex gap-[10px]">
        <div className="flex w-[150px] flex-col">
          <label
            htmlFor="points"
            className="flex h-[30px] items-center text-[22px] leading-[1]"
          >
            <span>Points:</span>
          </label>
          <label htmlFor="time" className="h-[30px] text-[22px]">
            Time:
          </label>
        </div>
        <div className="flex flex-col">
          <input
            value={points}
            type="text"
            id="points"
            onChange={handleChangePoints}
            className="h-[30px] w-[150px] border border-solid border-black px-[5px] py-[2px] outline-none"
          />

          <span id="time" className="h-[30px] text-[22px]">
            {playState !== GameState["IDLE"] ? (
              <GameTimer playState={playState} />
            ) : (
              "0.0s"
            )}
          </span>
        </div>
      </li>
      <li className="flex gap-[10px]">
        {playState === GameState["IDLE"] ? (
          <button
            className="hover-animate w-[150px] rounded-[4px] border border-solid border-black bg-gray-200 px-[10px] py-[5px] text-[15px] hover:bg-gray-400"
            onClick={handlePlay}
          >
            Play
          </button>
        ) : (
          <>
            <button
              className="hover-animate w-[150px] rounded-[4px] border border-solid border-black bg-gray-200 px-[10px] py-[5px] text-[15px] hover:bg-gray-400"
              onClick={handleRestart}
            >
              Restart
            </button>
            {playState !== GameState["LOST"] && (
              <button
                className="hover-animate w-[150px] rounded-[4px] border border-solid border-black bg-gray-200 px-[10px] py-[5px] text-[15px] hover:bg-gray-400"
                onClick={handleAutoPlay}
              >
                {playState === GameState["AUTO"]
                  ? "Auto Play OFF"
                  : "Auto Play ON"}
              </button>
            )}
            <button
              className="hover-animate w-[150px] rounded-[4px] border border-solid border-black bg-gray-200 px-[10px] py-[5px] text-[15px] hover:bg-gray-400"
              onClick={handleNewGame}
            >
              New Game
            </button>
          </>
        )}
      </li>
    </ul>
  );
}
