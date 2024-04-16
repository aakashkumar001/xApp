import { QUERY_KEYS } from "./queryKeys";
import {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";
import {
  createUserAccount,
  signInAccount,
  getCurrentUser,
  signOutAccount,
  getUsers,
  createPost,
  getPostById,
  updatePost,
  getUserPosts,
  deletePost,
  likePost,
  getUserById,
  updateUser,
  getRecentPosts,
  getInfinitePosts,
  searchPosts,
  savePost,
  deleteSavedPost,
} from "../appwrite/api";
import { INewPost, INewUser, IUpdatePost, IUpdateUser } from "@/types";

//AUTH QUERIES

export const useCreateUserAccount = () => {
  return useMutation({
    mutationFn: (user:INewUser) => createUserAccount(user),
  });
};

export const useSignInAccount = () => {
    return useMutation({
      mutationFn: (user: { email: string; password: string }) => signInAccount(user),
    });
  };

export const useSignOutAccount = () => {
    return useMutation({
      mutationFn: signOutAccount,
    });
  };

//Post Queries

export const useGetPosts = () => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.GET_INFINITE_POSTS],
    queryFn: getInfinitePosts as any,
    getNextPageParam: (lastPage: any) => {
      // If there's no data, there are no more pages.
      if (lastPage && lastPage.documents.length === 0) {
        return null;
      }

      // Use the $id of the last document as the cursor.
      const lastId = lastPage.documents[lastPage.documents.length - 1].$id;
      return lastId;
    },
  });
};
