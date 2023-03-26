import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface BearState {
  bears: number;
  increase: (by: number) => void;
  sell: (by: RequestInfo | URL) => void;
}

const useBearStore = create<BearState>()(
  devtools(
    persist(
      set => ({
        bears: 0,
        increase: by => set(state => ({ bears: state.bears + by })),
        sell: async by => {
          const response = await fetch(by);
          set({ bears: await response.json() });
        },
      }),
      { name: "bears" }
    )
  )
);

const nuts = useBearStore(state => state.bears);
const honey = useBearStore(state => state.increase);
honey(1);
