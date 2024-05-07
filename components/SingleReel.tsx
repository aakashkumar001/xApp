"use client";

import { useEffect } from "react";
import PostInteraction from "./PostInteraction";
import Link from "next/link";
import { ImMusic } from "react-icons/im";
import useCreateBucketUrl from "@/app/hooks/useCreateBucketUrl";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"




export default function SingleReel(post:any) {
  console.log(post)


    useEffect(() => {
        const video = document.getElementById(`video-${post?.post.id}`) as HTMLVideoElement
        const postMainElement = document.getElementById(`PostMain-${post.post.id}`);

        if(postMainElement) {
            let observer = new IntersectionObserver((entries) => {
                entries[0].isIntersecting ? video.play() : video.pause()
            }, {threshold:[0.6]});

            observer.observe(postMainElement);
        }

    },[])

    return (
        <>
         <div id={`PostMain-${post.post.id}`} className="flex border-b py-6 ml-72">
        <div className="cursor-pointer">
          <img
            className="rounded-full max-h-[60px]"
            width="60"
            src={post?.post?.profile?.image}
          />
        </div>

        <div className="pl-3 w-full px-4">
          <div className="flex items-center justify-between pb-0.5">
            <Link href={`/profile/${post?.post?.profile?.accountId}`}>
              <span className="font-bold hover:underline cursor-pointer">
                {post?.post?.profile?.name}
              </span>
            </Link>

            <button className="border text-[15px] px-[21px] py-0.5 border-[#db2777] text-[#e33f63] hover:bg-[#ffeef2] mr-48 font-semibold rounded-md">
              Follow
            </button>
          </div>
          <p className="text-[15px] pb-0.5 break-words md:max-w-[400px] max-w-[300px] text-gray-600">
           {post?.post?.text}
          </p>
          <p className="text-[14px] pb-0.5 flex items-center font-semibold">

            <ImMusic size="14" />
            <span className="px-1 text-gray-600">original sound</span>
          </p>

          <div className="mt-2.5 flex">
            <div className="relative min-h-[500px] max-h-[580px] max-w-[280px] flex items-center bg-black rounded-xl cursor-pointer">
              <video
                id={`video-${post.post.id}`}
                loop
                controls
                className="rounded-md object-cover mx-auto h-full after:content-['Hello\_World']"
                src={useCreateBucketUrl(post?.post.video_url)}
              />
            </div>

            <PostInteraction post={post}/>
          </div>
        </div>
      </div>
        </>
    )
}