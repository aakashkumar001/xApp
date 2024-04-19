import { create } from "zustand";
import { persist, devtools, createJSONStorage } from "zustand/middleware";
import useGetAllPosts from "../hooks/useGetAllPosts";
import useGetPostsByUser from "../hooks/useGetPostByUserId";
import useGetPostById from "../hooks/useGetPostById";

export const usePostStore = create<any>()(
  devtools(
    persist(
      (set) => ({
        allPosts: [],
        postByUser: [],
        postById: null,
        setAllPosts: async () => {
          const result = await useGetAllPosts();
          set({ allPosts: result });
        },
        setPostsByUser: async (userId: string) => {
          const result = await useGetPostsByUser(userId);
          set({ postsByUser: result });
        },
        setPostsById: async (postId: string) => {
          const result = await useGetPostById(postId);
          set({ postByid: result });
        },
      }),
      {
        name: "store",
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
);
