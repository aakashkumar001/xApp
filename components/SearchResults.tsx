import { Loader } from "lucide-react";
import GridPostList from "./GridPostList";


export type SearchResultProps = {
    isSearchFetching: boolean;
    searchedPosts: any;
  };

export const SearchResults = ({ isSearchFetching, searchedPosts }: SearchResultProps) => {
    if (isSearchFetching) {
      return <Loader />;
    } else if (searchedPosts && searchedPosts.documents.length > 0) {
      return <GridPostList posts={searchedPosts.documents} />;
    } else {
      return (
        <p className="text-light-4 mt-10 text-center w-full">No results found</p>
      );
    }
  };