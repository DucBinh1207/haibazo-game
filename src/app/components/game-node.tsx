import { useEffect, useState } from "react";
import CountdownTimer from "./countdown-timer";
import cn from "../../utils/cn";
import useNode from "@/store/use-node";
import { useShallow } from "zustand/shallow";
import usePlayState from "@/store/use-play-state";
import { GameState } from "@/constant/game-state";

type props = {
  num: number;
  zIndex: number;
  coordinate: { x: number; y: number };
  restart: number;
};

export default function GameNode({ num, zIndex, coordinate, restart }: props) {
  const [isClicked, setIsClicked] = useState(false);
  const [isDisappeared, setIsDisappeared] = useState(false);
  const [bgOpacity, setBgOpacity] = useState(1);
  const [isFreeze, setIsFreeze] = useState(false);

  const { node, totalNodes, setNode } = useNode(
    useShallow((state) => ({
      node: state.node,
      totalNodes: state.totalNodes,
      setNode: state.setNode,
    })),
  );

  const { playState, setPlayState } = usePlayState(
    useShallow((state) => ({
      playState: state.playState,
      setPlayState: state.setPlayState,
    })),
  );

  function handleClickNode() {
    if (node + 1 === num) {
      setIsClicked(true);
      if (node + 1 !== totalNodes) {
        setNode(node + 1);
      }
    } else {
      setPlayState(GameState["LOST"]);
    }
  }

  useEffect(() => {
    if (isDisappeared && num === totalNodes) {
      setPlayState(GameState["WON"]);
    }
  }, [isDisappeared]);

  useEffect(() => {
    setIsDisappeared(false);
    setIsClicked(false);
    setIsFreeze(false);
    setBgOpacity(1);
  }, [restart]);

  useEffect(() => {
    if (playState === GameState["LOST"]) setIsFreeze(true);
  }, [playState]);

  useEffect(() => {
    if (playState === GameState["AUTO"] && node + 1 === num) {
      if (node === 0) {
        setIsClicked(true);
        setNode(node + 1);
      } else {
        setTimeout(() => {
          setIsClicked(true);
          setNode(node + 1);
        }, 1000);
      }
    }
  }, [node, playState]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isClicked && !isFreeze) {
        setBgOpacity((prevOpacity) => {
          if (prevOpacity > 0) {
            return prevOpacity - 10 / 3000;
          } else {
            clearInterval(interval);
            return 0;
          }
        });
      } else {
        clearInterval(interval);
      }
    }, 10);

    return () => clearInterval(interval);
  }, [isClicked, isFreeze]);

  return (
    <>
      {!isDisappeared ? (
        <div
          className={cn(
            "p-auto duration-3000 absolute h-[50px] w-[50px] cursor-pointer rounded-[50%] border-[2px] border-solid border-red-500 text-[13px] transition-opacity ease-linear",
            {
              "bg-red-500 text-white opacity-0": isClicked,
              "bg-white opacity-100 transition-none duration-0": !isClicked,
              "transition-none": playState === GameState["LOST"],
            },
          )}
          style={{
            top: coordinate.y,
            left: coordinate.x,
            zIndex: zIndex,
            ...(playState === GameState["LOST"] && { opacity: bgOpacity }),
          }}
          onClick={handleClickNode}
        >
          {isClicked ? (
            <>
              <span className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-80%] text-black">
                {num}
              </span>
              <div className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-15%]">
                <CountdownTimer setIsDisappeared={setIsDisappeared} />
              </div>
            </>
          ) : (
            <span className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] text-black">
              {num}
            </span>
          )}
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
