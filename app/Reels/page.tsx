"use client"

import PostInteraction from "@/components/PostInteraction";
import { Heart } from "lucide-react";
import { Send } from "lucide-react";
import { MessageCircle } from "lucide-react";
import { Ellipsis } from "lucide-react";
import Link from "next/link";
import { usePostStore } from "../store/post";
import { useEffect } from "react";
import SingleReel from "@/components/SingleReel";

export default function () {
  const {allPosts,setAllPosts} = usePostStore();
  
  useEffect( () => {
    setAllPosts();
  },[])


  return (
    <>
      {/* <div className="w-full h-screen ml-96 mt-16 flex justify-center">
      <div className="aspect-video relative">
        <div className="flex mb-4 gap-x-4">
        <div className="text-gray-500">Username</div>
        <div className="text-gray-500"><button>Follow</button></div>
        </div>
      <video autoPlay loop controls width="320" height="240">
        <source src="/videos/video2.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute flex flex-col gap-4 bottom-40 ml-[340px]">
        <div>
        <Heart/>
        </div>
        <div>
        <MessageCircle/>
        </div>
        <div>
         <Send/>
        </div> 
        <div>
          <Ellipsis/>
        </div>
      </div>
      </div>
      
    </div> */}
       {allPosts.map((post: any,index: any) => (
        <SingleReel post={post} key={index} />
       ))}
    </>
  );
}
