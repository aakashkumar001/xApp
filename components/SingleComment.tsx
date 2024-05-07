import useCreateBucketUrl from "@/app/hooks/useCreateBucketUrl";
import useDeleteComment from "@/app/hooks/useDeleteComment";
import { useCommentStore } from "@/app/store/comment";
import { useUserContext } from "@/context/AuthContext"
import moment from "moment";
import Link from "next/link";
import { useState } from "react";
import { BiLoaderCircle, BiSolidTrash } from "react-icons/bi";


export default function SingleComment ({comment,params}:any) {
    console.log(comment)

    const {user} = useUserContext();
    let { setCommentsByPost }:any = useCommentStore()
    const [isDeleting, setIsDeleting] = useState(false)

    const deleteThisComment = async () => {
        let res = confirm("Are you sure you weant to delete this comment?")
        if (!res) return

        try {
            setIsDeleting(true)
            await useDeleteComment(comment?.id)
            setCommentsByPost(params?.postId)
            setIsDeleting(false)
        } catch (error) {
            console.log(error)
            alert(error)
        }
    }

    return (
        <>
         <div id="SingleComment" className="flex items-center justify-between px-8 mt-4">
                <div className="flex items-center relative w-full">
                    <Link href={`/profile/${comment.profile.accountId}`}>
                        <img 
                            className="absolute top-0 rounded-full lg:mx-0 mx-auto" 
                            width="40" 
                            src={comment.profile.image}
                        />
                    </Link>
                    <div className="ml-14 pt-0.5 w-full">

                        <div className="text-[18px] font-semibold flex items-center justify-between">
                            <span className="flex items-center">
                                {comment?.profile?.name} - 
                                <span className="text-[12px] text-gray-600 font-light ml-1">
                                    {moment(comment?.created_at).calendar()}
                                </span>
                            </span>

                            {user?.id == comment.profile.accountId ? (
                                <button 
                                    // disabled={isDeleting} 
                                    onClick={() => deleteThisComment()}
                                >
                                    {isDeleting 
                                        ? <BiLoaderCircle className="animate-spin" color="#E91E62" size="20"/>
                                        : <BiSolidTrash className="cursor-pointer" size="25"/>
                                    }
                                </button>
                            ) : null}
                        </div>
                        
                        <p className="text-[15px] font-light">{comment.text}</p>

                    </div>
                </div>
            </div>
        </>
    )
}