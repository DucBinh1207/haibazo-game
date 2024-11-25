import { GameState } from "@/constant/game-state";
import useNode from "@/store/use-node";
import usePlayState from "@/store/use-play-state";
import { useShallow } from "zustand/shallow";

export default function NextNode() {
  const { node } = useNode(
    useShallow((state) => ({
      node: state.node,
    })),
  );
  const { playState } = usePlayState(
    useShallow((state) => ({
      playState: state.playState,
    })),
  );

  if (playState === GameState["PLAY"] || playState === GameState["AUTO"])
    return <span>Next : {node + 1}</span>;

  return <></>;
}
