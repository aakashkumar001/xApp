import { create } from "zustand";
import { persist, devtools, createJSONStorage } from "zustand/middleware";
import useGetLikesByPostId from "../hooks/useGetLikesByPostId";


export const useLikeStore = create()(
  devtools(
    persist(
      (set) => ({
        likesByPost: [],
        setLikesByPost: async (postId: string) => {
          const result = await useGetLikesByPostId(postId);
          set({ likesByPost: result });
        },
      }),
      {
        name: "store",
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
);
