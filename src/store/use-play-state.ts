import { GameStateType } from "../constant/game-state";
import { create } from "zustand";

type PlayStore = {
  playState: GameStateType;
  restartKey: number;
  clearPlayState: () => void;
  setPlayState: (state: GameStateType) => void;
  setRestart: () => void;
};

const usePlayState = create<PlayStore>((set, get) => ({
  playState: 1,
  restartKey: 0,
  clearPlayState: () => set({ playState: 1 }),
  setPlayState: (state: GameStateType) => set({ playState: state }),
  setRestart: () => {
    const currentKey = get().restartKey;
    set({ restartKey: currentKey + 1 });
  },
}));

export default usePlayState;
