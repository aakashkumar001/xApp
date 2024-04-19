import { create } from "zustand";
import useGetCommentsByPostId from "../hooks/useGetCommentsByPostId";
import { persist, devtools, createJSONStorage } from "zustand/middleware";

export const useCommentStore = create()(
  devtools(
    persist(
      (set) => ({
        commentsByPost: [],
        setCommentsByPost: async (postId: string) => {
          const result = await useGetCommentsByPostId(postId);
          set({ commentsByPost: result });
        },
      }),
      {
        name: "store",
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
);
