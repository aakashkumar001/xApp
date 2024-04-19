"use client";

import { useEffect } from "react";
import PostInteraction from "./PostInteraction";
import Link from "next/link";
import { ImMusic } from "react-icons/im";



export default function SingleReel(post:any) {

    console.log(post)

    useEffect(() => {
        const video = document.getElementById(`video-${post?.id}`) as HTMLVideoElement
        const postMainElement = document.getElementById(`PostMain-${post.id}`);

        if(postMainElement) {
            let observer = new IntersectionObserver((entries) => {
                entries[0].isIntersecting ? video.play() : video.pause()
            }, {threshold:[0.6]});

            observer.observe(postMainElement);
        }

    },[])

    return (
        <>
         <div id={`PostMain-${post.id}`} className="flex border-b py-6 ml-72">
        <div className="cursor-pointer">
          <img
            className="rounded-full max-h-[60px]"
            width="60"
            src="/images/image3.jpg"
          />
        </div>

        <div className="pl-3 w-full px-4">
          <div className="flex items-center justify-between pb-0.5">
            <Link href={`/profile`}>
              <span className="font-bold hover:underline cursor-pointer">
                username
              </span>
            </Link>

            <button className="border text-[15px] px-[21px] py-0.5 border-[#F02C56] text-[#F02C56] hover:bg-[#ffeef2] mr-48 font-semibold rounded-md">
              Follow
            </button>
          </div>
          <p className="text-[15px] pb-0.5 break-words md:max-w-[400px] max-w-[300px]">
            Tera rastaa
          </p>
          <p className="text-[14px] text-gray-500 pb-0.5">#fun #cool</p>
          <p className="text-[14px] pb-0.5 flex items-center font-semibold">
            <ImMusic size="17" />
            <span className="px-1">original sound - AWESOME</span>
          </p>

          <div className="mt-2.5 flex">
            <div className="relative min-h-[500px] max-h-[580px] max-w-[280px] flex items-center bg-black rounded-xl cursor-pointer">
              <video
                id={"1"}
                loop
                controls
                muted
                className="rounded-md object-cover mx-auto h-full"
                src="/videos/video2.mp4"
              />
              {/* <img 
                className="absolute right-2 bottom-10" 
                width="90" 
                src="/images/tiktok-logo-white.png"
            /> */}
            </div>

            {/* <PostMainLikes post={post} /> */}
            <PostInteraction />
          </div>
        </div>
      </div>
        </>
    )
}