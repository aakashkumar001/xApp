import { Heart } from "lucide-react";
import { Send } from "lucide-react";
import { MessageCircle } from "lucide-react";
import { Ellipsis } from "lucide-react";

export default function PostInteraction() {
   return (
<>
    <div className="relative mr-[75px]">
    <div className="absolute bottom-0 pl-2">
        <div className="pb-2 text-center">
            <button  
                className="p-2 cursor-pointer"
            >
            <Heart size={24}/>
                
            </button>
            <span className="text-xs text-gray-500 font-semibold">
                4
            </span>
        </div>

        <button 
            className="pb-2 text-center"
        >
            <div className="p-2 cursor-pointer">
                <MessageCircle size={24} />
            </div>
            <span className="text-xs text-gray-500 font-semibold">12</span>
        </button>

        <button className="text-center">
            <div className="p-2 cursor-pointer">
                <Send size={24}/>
            </div>
            <span className="text-xs text-gray-500 font-semibold">55</span>
        </button>
        <button className="text-center">
            <div className="p-2 cursor-pointer">
                <Ellipsis size={24}/>
            </div>
        </button>
    </div>
</div>
</>
   )

}