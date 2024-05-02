

import Post from "@/components/Post";
import SideNav from "@/components/SideNav";
import SuggestedBar from "@/components/SuggestedBar";
import image1 from "../public/images/image1.jpg"
import image2 from "../public/images/image2.jpg"
import image3 from "../public/images/image3.jpg"
import image4 from "../public/images/image4.jpg"
import PostsComp from "@/components/PostsComp";
import Saved from "@/components/Saved";
import { useUserContext } from "@/context/AuthContext";





export default function () {



  // const {data:posts, isLoading:isPostLoading,isError:isErrorPosts} = useGetRecentPosts();
  // const {data:creator,isLoading:isCreatorLoading,isError:isCreatorError} = useGetUsers();

  // console.log(posts)
  // console.log(creator)
  

  return (
    <>
      <div className="w-full h-full flex gap-2 ">
        <div className="flex-none lg:w-64 h-full border-r-2 border-r-gray-200 lg:fixed">
          <SideNav />
        </div>
        <div className="grow h-full border-r-2 border-r-gray-200 lg:ml-64 p-6">
          <div className="m-4">
          <div>
          <Post imagess={image1}/>
          </div>
          <div>
          <Post imagess={image2}/>
          </div>
          <div>
          <Post imagess={image3}/>
          </div>
         <div>
        <PostsComp/>
        <Saved/>
         </div>
          </div>
         
          
        </div>
        <div className="flex-none h-full lg:w-64">
          <SuggestedBar />
        </div>
      </div>
    </>
  );
}
