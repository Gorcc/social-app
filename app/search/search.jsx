import Image from "next/image";
import Link from "next/link";
import "@/app/styles/followlist.scss";
import SearchItem from "@/components/SearchItemComponent";
import LeftMenu from "@/components/LeftMenuComponent";
import SearchComponent from "@/components/SearchComponent";
import "../styles/search.scss";

export default async function Search({ searchResults, user, searchQuery }) {
  return (
    <div className="w-full flex justify-center">
      <LeftMenu currentPage={"search"} userProfile={user}></LeftMenu>
      <div className="follow-list-div flex flex-col justify-center items-center">
        <SearchComponent></SearchComponent>
        {!searchQuery ? (
          <>
          <h1 className="comically-large-h1">Start searching people!</h1>
          </>
        ) : (
          <>
            <h1 className="font-bold">Search Results</h1>
            <div>
              {searchResults.length != 0 ? (
                searchResults.map((result) => (
                  <SearchItem profileContent={result} user={user}></SearchItem>
                ))
              ) : (
                <h1 className="mt-12">
                  Nothing found from the search <strong>"{searchQuery}"</strong>
                  .
                </h1>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
