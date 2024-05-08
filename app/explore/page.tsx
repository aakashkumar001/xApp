"use client";

import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useInView } from "react-intersection-observer";
import Image3 from "../../public/images/image3.jpg";
import { useGetPosts, useSearchPosts } from "@/lib/react-query/queries";
import { useEffect, useState } from "react";
import useDebounce from "../hooks/useDebounce";
import { Loader } from "lucide-react";
import { BiSearch } from "react-icons/bi";
import { SearchResults } from "@/components/SearchResults";
import GridPostList from "@/components/GridPostList";

export default function Explore () {
  const [searchValue, setSearchValue] = useState("");

  const { ref, inView } = useInView();
  const { data: posts, fetchNextPage, hasNextPage } = useGetPosts();

  const debouncedSearch = useDebounce(searchValue, 500);
  const { data: searchedPosts, isFetching: isSearchFetching } =
    useSearchPosts(debouncedSearch);

  useEffect(() => {
    if (inView && !searchValue) {
      fetchNextPage();
    }
  }, [inView, searchValue]);

  if (!posts)
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );

  const shouldShowSearchResults = searchValue !== "";
  const shouldShowPosts =
    !shouldShowSearchResults &&
    posts.pages.every((item) => item.documents.length === 0);

  return (
    <>
      <div className="">
        <div className="">
          <h2 className="h3-bold md:h2-bold w-full">Search Posts</h2>
          <div className="flex gap-1 px-4 w-full rounded-lg">
            <BiSearch size={24} />
            <Input
              type="text"
              placeholder="Search"
              className=""
              value={searchValue}
              onChange={(e) => {
                setSearchValue(e.currentTarget.value);
              }}
            />
          </div>
        </div>

        <div className="flex-between w-full max-w-5xl mt-16 mb-7">
          <h3 className="body-bold md:h3-bold">Popular Today</h3>

          <div className="flex-center gap-3 rounded-xl px-4 py-2 cursor-pointer">
          <div className="flex flex-wrap gap-9 w-full max-w-5xl">
        {shouldShowSearchResults ? (
          <SearchResults
            isSearchFetching={isSearchFetching}
            searchedPosts={searchedPosts}
          />
        ) : shouldShowPosts ? (
          <p className="text-light-4 mt-10 text-center w-full">End of posts</p>
        ) : (
          posts.pages.map((item, index) => (
            <GridPostList key={`page-${index}`} posts={item.documents} />
          ))
        )}

{hasNextPage && !searchValue && (
        <div ref={ref} className="mt-10">
          <Loader />
        </div>
      )}
      </div>
          </div>
        </div>
        <div className="bg-blue-500 ml-18 grid grid-rows-3 gap-3 grid-cols-3 w-full justify-center h-auto"></div>
      </div>
    </>
  );
}
