"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function SearchComponent() {
  const [search, setSearch] = useState("");
  const router = useRouter();

  function goSearch(search) {
    router.push("/search/" + search);
  }

  return (
    <div>
      <form action={"/search/" + search} onSubmit={() => goSearch(search)}>
        <input
          className="search-input"
          type="text"
          onChange={(event) => setSearch(event.target.value)}
          value={search}
          placeholder="Search Users"
        ></input>
      </form>
    </div>
  );
}
