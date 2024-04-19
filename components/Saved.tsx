"use client"

import { useGetCurrentUser } from "@/lib/react-query/queries"


export default function Saved() {

    const {data:currentUser} = useGetCurrentUser();

    console.log("currentUSersave+"+ currentUser?.$id);

    const savePosts = currentUser?.save ? currentUser.save.map((savePost: { post: any; }) => ({
        ...savePost.post, creator:{imageUrl:currentUser.imageUrl,}
    })).reverse()  : [];

    console.log("savePost"+ savePosts);

    return (
        <>
         <div>Saved</div>
        </>
    )
}