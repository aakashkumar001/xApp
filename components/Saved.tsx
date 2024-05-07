"use client"

import { useGetCurrentUser } from "@/lib/react-query/queries"


export default function Saved() {

    const {data:currentUser} = useGetCurrentUser();


    const savePosts = currentUser?.save ? currentUser.save.map((savePost: { post: any; }) => ({
        ...savePost.post, creator:{imageUrl:currentUser.imageUrl,}
    })).reverse()  : [];


    return (
        <>
         <div>Saved</div>
        </>
    )
}