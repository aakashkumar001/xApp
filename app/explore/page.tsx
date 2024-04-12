import { Input } from "@/components/ui/input";
import Image from "next/image";
import Image3 from "../../public/images/image3.jpg";

export default function () {
  return (
    <>
      <div className="">
        <div className="">
          <h2 className="h3-bold md:h2-bold w-full">Search Posts</h2>
          <div className="flex gap-1 px-4 w-full rounded-lg">
            <img
              src="/assets/icons/search.svg"
              width={24}
              height={24}
              alt="search"
            />
            <Input
              type="text"
              placeholder="Search"
              className=""
              value=""
            />
          </div>
        </div>

        <div className="flex-between w-full max-w-5xl mt-16 mb-7">
          <h3 className="body-bold md:h3-bold">Popular Today</h3>

          <div className="flex-center gap-3 rounded-xl px-4 py-2 cursor-pointer">
            <p className="small-medium md:base-medium text-light-2">All</p>
            <img
              src="/assets/icons/filter.svg"
              width={20}
              height={20}
              alt="filter"
            />
          </div>
        </div>
        <div className="bg-blue-500 ml-18 grid grid-rows-3 gap-3 grid-cols-3 w-full justify-center h-auto"></div>
      </div>
    </>
  );
}
