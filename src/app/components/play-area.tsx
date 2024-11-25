"use client";

import { useEffect, useRef, useState } from "react";
import GameNode from "./game-node";
import NextNode from "./next-node";
import useNode from "@/store/use-node";
import { useShallow } from "zustand/shallow";
import usePlayState from "@/store/use-play-state";

type areaSizeType = {
  width: number;
  height: number;
};

export default function PlayArea() {
  const areaRef = useRef<HTMLDivElement>(null);
  const [areaSize, setAreaSize] = useState<areaSizeType | undefined>(undefined);
  const [restart, setRestart] = useState<number>(0);

  const { totalNodes } = useNode(
    useShallow((state) => ({
      totalNodes: state.totalNodes,
    })),
  );

  const { restartKey } = usePlayState(
    useShallow((state) => ({
      restartKey: state.restartKey,
    })),
  );

  function getRandomInRange({ min, max }: { min: number; max: number }) {
    return Math.random() * (max - min) + min;
  }

  function generateRandomCoordinates() {
    if (areaSize) {
      const x = getRandomInRange({
        min: 0,
        max: areaSize.width,
      });
      const y = getRandomInRange({
        min: 0,
        max: areaSize.width,
      });
      return { x, y };
    }
    return { x: 0, y: 0 };
  }

  const getCorners = () => {
    if (areaRef.current) {
      const rect = areaRef.current.getBoundingClientRect();

      const corners = {
        topLeft: { x: rect.left, y: rect.top },
        topRight: { x: rect.right, y: rect.top },
        bottomLeft: { x: rect.left, y: rect.bottom },
        bottomRight: { x: rect.right, y: rect.bottom },
      };

      return corners;
    }
  };

  useEffect(() => {
    const corners = getCorners();
    if (corners) {
      const size: areaSizeType = {
        width: corners.topRight.x - corners.topLeft.x,
        height: corners.bottomLeft.y - corners.topLeft.y,
      };
      setAreaSize(size);
    }
  }, []);

  useEffect(() => {
    setRestart(restartKey);
  }, [restartKey]);

  return (
    <div className="flex h-full flex-col gap-[5px]">
      <div className="relative mt-[9px] h-[616px] border-[2px] border-solid border-black p-[25px]">
        <div className="h-full w-full" ref={areaRef}>
          {areaSize &&
            totalNodes &&
            Array.from({ length: totalNodes }).map((_, index) => {
              return (
                <GameNode
                  num={index + 1}
                  zIndex={1000 - index}
                  key={index}
                  coordinate={generateRandomCoordinates()}
                  restart={restart}
                />
              );
            })}
        </div>
      </div>

      <NextNode />
    </div>
  );
}
