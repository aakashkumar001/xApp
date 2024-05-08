"use client";

import useCreateBucketUrl from "@/app/hooks/useCreateBucketUrl";
import { useCommentStore } from "@/app/store/comment";
import { useLikeStore } from "@/app/store/like";
import { usePostStore } from "@/app/store/post";
import Comments from "@/components/Comments";
import CommentsHeader from "@/components/CommentsHeader";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";

export default function Reels ({ params }: any) {

    console.log(params)
  let { postById, setPostsById, postsByUser, setPostsByUser } = usePostStore();
  let { setLikesByPost }: any = useLikeStore();
  let { setCommentsByPost }: any = useCommentStore();

  const router = useRouter();

  useEffect(() => {
    setPostsById(params.postId);
    setCommentsByPost(params.postId);
    setLikesByPost(params.postId);
    setPostsByUser(params.postId);
  }, []);

  const loopThroughPostsUp = () => {
    postsByUser.forEach((post: { id: number; }) => {
        console.log(post)
        if (post.id > params.postId) {
            router.push(`/reels/${post.id}/${params.userId}`)
        }
    });
}

const loopThroughPostsDown = () => {
    postsByUser.forEach((post: { id: number; }) => {
        if (post.id < params.postId) {
            router.push(`/reels/${post.id}/${params.userId}`)
        }
    });
}

  return (
    <>
      <div
        id="PostPage"
        className="lg:flex justify-between w-full h-screen bg-black overflow-auto fixed top-0 left-0"
      >
        <div className="lg:w-[calc(100%-540px)] h-full relative">
          <Link
            href={`/reels`}
            className="absolute text-white z-20 m-5 rounded-full bg-gray-700 p-1.5 hover:bg-gray-800"
          >
            <AiOutlineClose size="27" />
          </Link>

          <div >
                        <button 
                            onClick={() => loopThroughPostsUp()}
                            className="absolute z-20 right-4 top-4 flex items-center justify-center rounded-full bg-gray-700 p-1.5 hover:bg-gray-800"
                        >
                            <BiChevronUp size="30" color="#FFFFFF"/>
                        </button>

                        <button  
                            onClick={() => loopThroughPostsDown()}
                            className="absolute z-20 right-4 top-20 flex items-center justify-center rounded-full bg-gray-700 p-1.5 hover:bg-gray-800"
                        >
                            <BiChevronDown size="30" color="#FFFFFF"/>
                        </button>
                    </div>

          {/* <video 
                                className="fixed object-cover w-full my-auto z-[0] h-screen" 
                                src="/videos/video2.mp4"
                            /> */}

          <div className="bg-black bg-opacity-70 lg:min-w-[480px] z-10 relative">
            {postById?.video_url ? (
              <video
                autoPlay
                controls
                loop
                muted
                className="h-screen mx-auto"
                src={useCreateBucketUrl(postById?.video_url)}
              />
            ) : null}
          </div>
        </div>

        <div
          id="InfoSection"
          className="lg:max-w-[550px] relative w-full h-full bg-white"
        >
          <div className="py-7" />
          {postById ? <CommentsHeader post={postById} params={params} /> : null}
          <Comments params={params} />
        </div>
      </div>
    </>
  );
}
