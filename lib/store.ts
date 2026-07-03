"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface GarageState {
  wishlist: string[];
  compare: string[];
  toggleWishlist: (id: string) => void;
  isWishlisted: (id: string) => boolean;
  toggleCompare: (id: string) => boolean; // returns false if limit reached
  isCompared: (id: string) => boolean;
  clearCompare: () => void;
  removeFromCompare: (id: string) => void;
}

export const useGarageStore = create<GarageState>()(
  persist(
    (set, get) => ({
      wishlist: [],
      compare: [],
      toggleWishlist: (id) =>
        set((state) => ({
          wishlist: state.wishlist.includes(id)
            ? state.wishlist.filter((x) => x !== id)
            : [...state.wishlist, id],
        })),
      isWishlisted: (id) => get().wishlist.includes(id),
      toggleCompare: (id) => {
        const { compare } = get();
        if (compare.includes(id)) {
          set({ compare: compare.filter((x) => x !== id) });
          return true;
        }
        if (compare.length >= 3) return false;
        set({ compare: [...compare, id] });
        return true;
      },
      isCompared: (id) => get().compare.includes(id),
      clearCompare: () => set({ compare: [] }),
      removeFromCompare: (id) => set((state) => ({ compare: state.compare.filter((x) => x !== id) })),
    }),
    { name: "rs-motors-garage" }
  )
);
