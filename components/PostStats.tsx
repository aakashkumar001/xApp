"use client";

import {
  useDeleteSavedPost,
  useGetCurrentUser,
  useLikePost,
  useSavePost,
} from "@/lib/react-query/queries";
import { Bookmark, Heart, MessageCircle, Send } from "lucide-react";
import { useEffect, useState } from "react";
import { Models } from "appwrite";
import { checkIsLiked } from "@/lib/utils";
import { Button } from "@nextui-org/react";

const PostStats = ({ post, userId }: any) => {


  const likesList = post.likes.map((user: Models.Document) => user.$id)
  || [];

  const [likes, setLikes] = useState<string[]>([likesList]);
  const [isSaved, setIsSaved] = useState(false);


  const { mutate: likePost } = useLikePost();
  const { mutate: savePost } = useSavePost();
  const { mutate: deleteSavedPost } = useDeleteSavedPost();

  const { data: currentUser } = useGetCurrentUser();
console.log(currentUser)
  const savedPostRecord = currentUser?.save?.find(
    (record: Models.Document) => record.post.$id === post.$id
  );

  console.log(savedPostRecord)

  useEffect(() => {
    if (currentUser) {
      const savedPostRecord = currentUser.save?.find(
        (record: Models.Document) => record.post.$id === post.$id
      );

      setIsSaved(!!savedPostRecord);
    }
  }, [currentUser]);

  const handleLikePost = (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>
  ) => {
    e.stopPropagation();

    let likesArray = [...likes];

    if (likesArray.includes(userId)) {
      likesArray = likesArray.filter((Id) => Id !== userId);
    } else {
      likesArray.push(userId);
    }

    setLikes(likesArray);
    likePost({ postId: post.$id, likesArray });
  };

  const handleSavePost = (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>
  ) => {
    e.stopPropagation();

    if (savedPostRecord) {
      setIsSaved(false);
      return deleteSavedPost(savedPostRecord.$id);
    }

    savePost({ userId: userId, postId: post.$id });
    setIsSaved(true);
  };

  return (
    <>
      <div className="flex justify-between px-2">
        <div className="flex gap-2 ml-3 mt-2">
          <Heart
            fill={`${checkIsLiked(likes, userId) ? "red" : "fill"}`}
            strokeWidth={0}
            size={28}
            className="cursor-pointer"
            onClick={(e) => handleLikePost(e)}
          />

          <MessageCircle size={24} className="cursor-pointer" />
          <Send size={26} className="cursor-pointer" />
        </div>

        <div className="mr-12">
          <Bookmark
            fill={`${isSaved ? "black" : "white"}`}
            size={28}
            className="cursor-pointer"
            onClick={(e) => handleSavePost(e)}
          />
        </div>
      </div>
      <div className="ml-3">
        <div className="text-sm text-gray-900 mt-2 ml-1">{likes?.length} likes</div>
        <span className="ml-1 mt-3 text-md">{post?.creator?.username}</span>
        <span className="p-2 text-sm text-gray-800 ml-1">{post?.caption}</span>
        <div className="text-gray-500 text-sm mt-2 ml-1">view all 23 comments</div>
        <div className="text-gray-500 text-sm ml-1">Add a comment...</div>
      </div>
    </>
  );
};

export default PostStats;
