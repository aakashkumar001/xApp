import useCreateLike from "@/app/hooks/useCreateLike";
import useDeleteLike from "@/app/hooks/useDeleteLike";
import useGetCommentsByPostId from "@/app/hooks/useGetCommentsByPostId";
import useGetLikesByPostId from "@/app/hooks/useGetLikesByPostId";
import useIsLiked from "@/app/hooks/useIsLiked";
import { useUserContext } from "@/context/AuthContext";
import { Heart } from "lucide-react";
import { Send } from "lucide-react";
import { MessageCircle } from "lucide-react";
import { Ellipsis } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function PostInteraction({ post }: any) {
    console.log(post)
  const router = useRouter();
  const { user } = useUserContext();

  const [hasClickedLike, setHasClickedLike] = useState<boolean>(false);
  const [userLiked, setUserLiked] = useState<boolean>(false);
  const [comments, setComments] = useState<any>([]);
  const [likes, setLikes] = useState<any>([]);

  useEffect(() => {
    getAllCommentsByPost();
    getAllLikesByPost();
  }, [post]);

  useEffect(() => {
    hasUserLikedPost();
  }, [user, likes]);

  const getAllCommentsByPost = async () => {
    let result = await useGetCommentsByPostId(post?.post?.id);
    setComments(result);
  };

  const getAllLikesByPost = async () => {
    let result = await useGetLikesByPostId(post?.post?.id);
    setLikes(result);
  };

  const hasUserLikedPost = () => {
    if (!user) {
      return;
    }

    if (likes?.length < 1 || user?.id) {
      setUserLiked(false);
      return;
    }

    let res = useIsLiked(user?.id, post?.post?.id, likes);
    setUserLiked(res ? true : false);
  };

  const like = async () => {
    setHasClickedLike(true);
    await useCreateLike(user.id || "", post?.post?.id);
    await getAllLikesByPost();
    hasUserLikedPost();
    setHasClickedLike(false);
  };

  const unlike = async (id: string) => {
    console.log(id)
    setHasClickedLike(true);
    await useDeleteLike(id);
    await getAllLikesByPost();
    hasUserLikedPost();
    setHasClickedLike(false);
  };

  const likeOrUnlike = () => {
    if (!user) {
      return;
    }

    let res = useIsLiked(user?.id, post?.post?.id, likes);

    if (!res) {
      like();
    } else {
      likes.forEach((like: any) => {
        if (user?.id == like.accountId && like?.reel_id == post?.post?.id) {
          unlike(like?.id);
        }
      });
    }
  };

  return (
    <>
      <div className="relative mr-[75px]">
        <div className="absolute bottom-0 pl-2">
          <div className="pb-2 text-center">
            <button
              className="p-2 cursor-pointer"
              onClick={() => likeOrUnlike()}
            >
              <Heart
                size={26}
                fill={likes?.length > 0 && userLiked ? `${"red"}` : ""}
              />
            </button>
            <span className="text-xs text-gray-500 font-semibold">
              {likes?.length}
            </span>
          </div>

          <button
            className="pb-2 text-center"
            onClick={() =>
              router.push(`/Reels/${post?.post?.id}/${post?.post?.profile?.accountId}`)
            }
          >
            <div className="p-2 cursor-pointer">
              <MessageCircle size={26} />
            </div>
            <span className="text-xs text-gray-500 font-semibold">
              {comments?.length}
            </span>
          </button>

          <button className="text-center">
            <div className="p-2 cursor-pointer">
              <Send size={26} />
            </div>
            <span className="text-xs text-gray-500 font-semibold">55</span>
          </button>
          <button className="text-center">
            <div className="p-2 cursor-pointer">
              <Ellipsis size={26} />
            </div>
          </button>
        </div>
      </div>
    </>
  );
}
