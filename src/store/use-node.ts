import { create } from "zustand";

type NodeStore = {
  node: number;
  totalNodes: number | null;
  clearNode: () => void;
  setNode: (nodeClicked: number) => void;
  setTotalNodes: (totalNodes: number | null) => void;
};

const useNode = create<NodeStore>((set) => ({
  node: 0,
  totalNodes: null,
  clearNode: () => set({ node: 0 }),
  setNode: (nodeClicked: number) => set({ node: nodeClicked }),
  setTotalNodes: (totalNodes: number | null) => set({ totalNodes: totalNodes }),
}));

export default useNode;
