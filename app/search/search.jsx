import Image from "next/image";
import Link from "next/link";
import "@/app/styles/followlist.scss";
import SearchItem from "@/components/SearchItemComponent";
import LeftMenu from "@/components/LeftMenuComponent";
import SearchComponent from "@/components/SearchComponent"

export default async function Search({ searchResults, user }) {
  return (
    <div>
      <LeftMenu currentPage={"search"} userProfile={user}></LeftMenu>
      <div className="follow-list-div flex flex-col justify-center items-center">
        <h1 className="font-bold">Search Results</h1>
        <div>
          {searchResults.map((result) => (
            <SearchItem profileContent={result} user={user}></SearchItem>
          ))}
        </div>
      </div>
    </div>
  );
}
