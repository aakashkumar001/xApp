import Image from "next/image";
import Image3 from "../../../public/images/image3.jpg"

export default function () {

    return (
         <>
         <div className=" flex flex-col h-screen gap-2">
            <div className=" w-full h-64 flex gap-2 ">
             <div className="w-48 ml-56 mt-8 rounded-full overflow-hidden">
               <Image src={Image3} height={180} width={180} alt={"image1"} style={{objectFit:"contain", borderRadius:"100px",padding:"10px",marginLeft:"20px"}} />
             </div>
             <div className="w-[500px] ml-24 mt-10 flex flex-col gap-2">
                 <div className="h-12 mt-2">
                   <span className="ml-10">willJacks123</span>
                    <span className="ml-24"><button>Edit Profile</button></span>
                 </div>
                 <div className="h-12">
                  <span className="ml-10">10 Posts</span>
                  <span className="ml-10">120 followers</span>
                  <span className="ml-10">
                    15 following
                  </span>
                 </div>
                 <div className="h-12 ml-10">
                    <span>Will Jacks</span>
                 </div>
             </div>
            </div>
            
            <ul className="w-full flex items-center pt-4 ml-96">
                        <li className="w-60 text-center py-2 text-[17px] font-semibold border-b-2 border-b-black">Videos</li>
                        <li className="w-60 text-gray-500 text-center py-2 text-[17px] font-semibold">Liked</li>
                    </ul>
                    <hr className="ml-48 mr-40"/>
            <div className="mt-2 grid lg:grid-cols-3 gap-2 pl-8 pr-8">
               <div className="">
               <Image src={Image3} alt="images"/>
               </div>
               <div>
               <Image src={Image3} alt="images"/>
               </div>
               <div>
               <Image src={Image3} alt="images"/>
               </div>
               <div>
               <Image src={Image3} alt="images"/>
               </div>
               <div>
               <Image src={Image3} alt="images"/>
               </div>
            </div>
        </div>
         </>
    )
}