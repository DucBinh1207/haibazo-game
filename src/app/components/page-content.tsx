"use client";

import GameControlPanel from "./game-control-panel";
import PlayArea from "./play-area";

export default function PageContent() {
  return (
    <div className="pt-[50px]">
      <div className="mx-auto flex h-[900px] w-[700px] flex-col gap-[10px] border-[2px] border-solid border-black p-[40px]">
        <GameControlPanel />
        <PlayArea />
      </div>
    </div>
  );
}
