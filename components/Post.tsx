"use client";

import { Models } from "appwrite";
import { useUserContext } from "@/context/AuthContext";
import {
  useDeleteSavedPost,
  useGetCurrentUser,
  useGetRecentPosts,
  useGetUsers,
  useLikePost,
  useSavePost,
} from "@/lib/react-query/queries";
import Image from "next/image";
import PostStats from "./PostStats";
import moment from "moment";
import { Ellipsis } from "lucide-react";
import Link from "next/link";


export default function Post() {
  const { user } = useUserContext();

  const {
    data: posts,
    isLoading: isPostLoading,
    isError: isErrorPosts,
  } = useGetRecentPosts();
  const {
    data: creator,
    isLoading: isCreatorLoading,
    isError: isCreatorError,
  } = useGetUsers();

  console.log(creator)

  console.log(posts);

  return (
    <>
      {posts?.documents.map((posts) => (
        <div className="w-1/2 h-3/4 lg:ml-32 lg:mt-6">
          <div className="h-3/4 w-full m-2 overflow-hidden">
            <div className="flex mb-4 gap-x-4 items-center">
              <div className="rounded-full overflow-hidden">
                <Link href={`/profile/${posts?.creator?.accountId}`}>
                <Image
                  src={posts?.creator?.imageUrl}
                  alt="image1"
                  width={40}
                  height={20}
                  style={{ objectFit: "cover",cursor:"pointer"}}
                />
                </Link>
              </div>
              <div className="text-black cursor-pointer">
                <Link href="/">
                {posts?.creator?.username}
                </Link>
                <span className="text-gray-400 text-sm ml-4">
                  {moment(posts?.$createdAt).startOf("day").fromNow()}
                </span>
                
              </div>
              
              <div className="ml-28"><Ellipsis/></div>
            </div>
            <Image
              src={posts?.imageUrl}
              alt="image1"
              width={400}
              height={400}
              style={{ objectFit: "cover",borderRadius:"8px"}}
            />
          </div>
          <PostStats post={posts} userId={user.id} />
          <hr className="ml-2 mr-2 mt-4 border-gray-300 w-full overflow-hidden color-gray"></hr>
        </div>
      ))}
    </>
  );
}
