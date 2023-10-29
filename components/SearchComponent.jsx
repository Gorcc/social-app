"use client";
import { useRouter } from 'next/navigation'
import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
export default function SearchComponent() {
  const [search, setSearch] = useState("");
  const router = useRouter()

  function goSearch(search) {
    router.push("/search/"+search);
}

  return (
    <div>
     
      <form action={"/search/"+search} onSubmit={() => goSearch(search)}>
      <input className='search-input'
      
      type="text"   
        
        onChange={(event) => setSearch(event.target.value)}
        value={search}
        placeholder="Search Users"
      ></input>
      </form>
      
      

    </div>
    
  );
}
