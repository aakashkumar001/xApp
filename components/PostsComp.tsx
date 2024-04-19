"use client"
import { useGetRecentPosts, useGetUsers } from "@/lib/react-query/queries";




export default function PostsComp() {
    
    const {data:posts, isLoading:isPostLoading,isError:isErrorPosts} = useGetRecentPosts();
    const {data:creator,isLoading:isCreatorLoading,isError:isCreatorError} = useGetUsers();
  
    console.log(posts)
    console.log(creator)
    

    return (
    <>
<div>postComp</div>
    </>
    )
}