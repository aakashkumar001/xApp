import {redirect} from "next/navigation";

import { PostsSkeleton } from "@/components/Skeletons";
import { Suspense } from "react";

function Home() {
  return (
    <main className="flex w-full flex-grow">
      <div className="flex flex-col flex-1 gap-y-8 max-w-lg mx-auto pb-20">
        <Suspense fallback={<PostsSkeleton />}>
         
        </Suspense>
      </div>
    </main>
  );
}

export default Home;

// export default function Home() {


//   return (
//       <div className="ml-64 bg-zinc-600 h-screen flex">
//        <div className="w-580px">
//    hello
//        </div>
//        <div>
// nextjs
//        </div>
//       </div>
//     )
// }