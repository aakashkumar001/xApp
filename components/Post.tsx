import { Heart } from "lucide-react";
import { Send } from "lucide-react";
import { MessageCircle } from "lucide-react";
import { Bookmark } from "lucide-react";
import Image from "next/image";
// import image1 from "../public/images/image1.jpg"
// import image2 from "../public/images/image2.jpg"
// import image3 from "../public/images/image3.jpg"
// import image4 from "../public/images/image4.jpg"

export default function Post({imagess}:any) {
  return (
    <>
      <div className="w-1/2 h-3/4 lg:ml-32 lg:mt-6">
        <div className="h-3/4 w-full m-2 overflow-hidden">
        <div className="flex mb-4 gap-x-4">
          {/* <div className="rounded-full overflow-hidden"><Image src={imagess} alt="image1" width={40} height={20} style={{objectFit:"cover"}} /></div> */}
        <div className="text-gray-500">Username</div>
        <div className="text-gray-500"><button>Follow</button></div>
        </div>
            <Image src={imagess} alt="image1" width={400} height={400} style={{objectFit:"cover"}} />
        </div>
        <div className="flex justify-between">
          <div className="flex gap-2 ml-3">
            <Heart fill="red" strokeWidth={0} size={26} />
            <MessageCircle size={24} />
            <Send size={24} />
          </div>

          <div className="mr-12">
            <Bookmark fill="black" size={24} />
          </div>
        </div>
        <div className="ml-3">
          <div className="">120 likes</div>
          <span className="">saracatic_us</span>
          <span className="p-2">
            My acting skills deserve anything Oscar for real.
          </span>
          <div className="text-gray">view all 23 comments</div>
          <div>Add a comment...</div>
          
        </div>
        <hr className="ml-2 mr-2 mt-2 border-gray-400 w-full overflow-hidden color-gray"></hr>
      </div>
    </>
  );
}
