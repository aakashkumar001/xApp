"use client"

import { Models } from "appwrite";

import {  BookmarkIcon, Loader, LucideBookMarked } from "lucide-react";
import GridPostList from "@/components/GridPostList";
import { useGetCurrentUser } from "@/lib/react-query/queries";

export default function Saved() {
  const { data: currentUser } = useGetCurrentUser();

  // const savePosts = currentUser?.save
  //   .map((savePost: Models.Document) => ({
  //     ...savePost.post,
  //     creator: {
  //       imageUrl: currentUser.imageUrl,
  //     },
  //   }))
  //   .reverse();

  const savePosts = currentUser?.save
    ? currentUser.save
        .map((savePost: Models.Document) => ({
          ...savePost.post,
          creator: {
            imageUrl: currentUser.imageUrl,
          },
        }))
        .reverse()
    : [];

  return (
    <div className="saved-container">
      <div className="flex gap-2 w-full max-w-5xl">
           <BookmarkIcon size={28}/>
        <h2 className="h3-bold md:h2-bold text-left w-full">Saved Posts</h2>
      </div>

      {!currentUser ? (
        <Loader />
      ) : (
        <ul className="w-full flex justify-center max-w-5xl gap-9">
          {savePosts.length === 0 ? (
            <p className="text-light-4">No available posts</p>
          ) : (
            <GridPostList posts={savePosts} showStats={false} />
          )}
        </ul>
      )}
    </div>
  );
};


