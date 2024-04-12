import Post from "@/components/Post";
import SideNav from "@/components/SideNav";
import SuggestedBar from "@/components/SuggestedBar";
import image1 from "../public/images/image1.jpg"
import image2 from "../public/images/image2.jpg"
import image3 from "../public/images/image3.jpg"
import image4 from "../public/images/image4.jpg"


export default function () {
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
         <Post imagess={image4}/>
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
