"use client";


import useCreateLike from "@/app/hooks/useCreateLike";
import useDeleteLike from "@/app/hooks/useDeleteLike";
import useIsLiked from "@/app/hooks/useIsLiked";
import { useCommentStore } from "@/app/store/comment"
import { useLikeStore } from "@/app/store/like"
import moment from "moment"
import { useUserContext } from "@/context/AuthContext"
import Link from "next/link";
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { AiFillHeart } from "react-icons/ai";
import { BiLoaderCircle, BiSolidChat,} from "react-icons/bi";
import { ImMusic } from "react-icons/im";
import useCreateBucketUrl from "@/app/hooks/useCreateBucketUrl";
import { Trash } from "lucide-react";



export default function CommentsHeader ({post,params}:any) {


   console.log(post,params)

    let { setLikesByPost, likesByPost }:any = useLikeStore()
    let { commentsByPost, setCommentsByPost }:any = useCommentStore()

    const {user} = useUserContext();
    const router = useRouter()
    const [hasClickedLike, setHasClickedLike] = useState<boolean>(false)
    const [isDeleteing, setIsDeleteing] = useState<boolean>(false)
    const [userLiked, setUserLiked] = useState<boolean>(false)

    useEffect(() => { 
        setCommentsByPost(params?.postId) 
        setLikesByPost(params?.postId)
    }, [post])
    useEffect(() => { hasUserLikedPost() }, [likesByPost])
    
    const hasUserLikedPost = () => {
        if (likesByPost.length < 1 || !user?.id) {
            setUserLiked(false)
            return
        }
        let res = useIsLiked(user.id, params.postId, likesByPost)
        setUserLiked(res ? true : false)
    }

    const like = async () => {
        try {
            setHasClickedLike(true)
            await useCreateLike(user?.id || '', params.postId)
            setLikesByPost(params.postId)
            setHasClickedLike(false)
        } catch (error) {
            console.log(error)
            alert(error)
            setHasClickedLike(false)
        }
    }

    const unlike = async (id: string) => {
        try {
            setHasClickedLike(true)
            await useDeleteLike(id)
            setLikesByPost(params.postId)
            setHasClickedLike(false)
        } catch (error) {
            console.log(error)
            alert(error)
            setHasClickedLike(false)
        }
    }

    const likeOrUnlike = () => {
        if (!user?.id) {
            return;
        } 

        let res = useIsLiked(user.id, params.postId, likesByPost)
        if (!res) {
            like()
        } else {
            likesByPost.forEach((like: { accountId: string; reel_id: any; id: string; }) => {
                console.log(like)
                if (user?.id && user.id == like.accountId && like.reel_id == params.postId) {
                    unlike(like.id) 
                }
            })
        }
    }

    const deletePost = async () => {
        let res = confirm('Are you sure you want to delete this post?')
        if (!res) return

        setIsDeleteing(true)

        try {
            // await useDeletePostById(params?.postId, post?.video_url)
            router.push(`/profile/${params.userId}`)
            setIsDeleteing(false)
        } catch (error) {
            console.log(error)
            setIsDeleteing(false)
            alert(error)
        }
    }


    return (

        <>
        <div className="flex items-center justify-between px-8">
                <div className="flex items-center">
                    <Link href={`/profile/${post?.accountId}`}>
                        {post?.profile.image ? (
                            <img className="rounded-full lg:mx-0 mx-auto" width="40" src={post?.profile.image} />
                        ) : (
                            <div className="w-[40px] h-[40px] bg-gray-200 rounded-full"></div>
                        )}
                    </Link>
                    <div className="ml-3 pt-0.5">

                        <Link 
                            href={`/profile/${post?.accountId}`} 
                            className="relative z-10 text-[17px] font-semibold hover:underline"
                        >
                            {post?.profile.name}
                        </Link>

                        <div className="relative z-0 text-[13px] -mt-5 font-light">
                            {post?.profile.name}
                            <span className="relative -top-[2px] text-[30px] pl-1 pr-0.5 ">.</span>
                            <span className="font-medium">{moment(post?.created_at).calendar()}</span>
                        </div>
                    </div>
                </div>

                {user?.id == post?.accountId ? (
                    <div>
                        {isDeleteing ? (
                            <BiLoaderCircle className="animate-spin" size="25"/>
                        ) : (
                            <button disabled={isDeleteing} onClick={() => deletePost()}>
                                <Trash className="cursor-pointer" size="25"/>
                            </button>
                        )}
                    </div>
                ) : null}
            </div>

            <p className="px-8 mt-4 text-sm">{post?.text}</p>

            <p className="flex item-center gap-2 px-8 mt-4 text-sm font-bold">
                <ImMusic size="17"/>
                original sound - {post?.profile.name}
            </p>

            <div className="flex items-center px-8 mt-8">
                
                    <div className="pb-4 text-center flex items-center">
                        <button 
                            disabled={hasClickedLike}
                            onClick={() => likeOrUnlike()} 
                            className="rounded-full bg-gray-200 p-2 cursor-pointer"
                        >
                            {!hasClickedLike ? (
                                <AiFillHeart color={likesByPost.length > 0 && userLiked ? '#ff2626' : ''} size="25"/>
                            ) : (
                                <BiLoaderCircle className="animate-spin" size="25"/>
                            )}
                        </button>
                        <span className="text-xs pl-2 pr-4 text-gray-800 font-semibold">
                            {likesByPost.length}
                        </span>
                    </div>
                

                <div className="pb-4 text-center flex items-center">
                    <div className="rounded-full bg-gray-200 p-2 cursor-pointer">
                        <BiSolidChat size={25} />
                    </div>
                    <span className="text-xs pl-2 text-gray-800 font-semibold">{commentsByPost?.length}</span>
                </div>
            </div>
        </>
    )
}