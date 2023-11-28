"use client"

import CreatePostComponent from "@/components/CreatePostComponent";
import PostComponent from "@/components/PostComponent";
import LeftMenu from "@/components/LeftMenuComponent";
import { useState } from "react";

export default function Home({ user, posts, userInfo, filteredPosts }) {

  const[selection, setSelection] = useState("explore");

  
  return (
    <div>
      <LeftMenu userProfile={userInfo} currentPage="home"></LeftMenu>
      <div className="posts-container flex flex-col items-center justify-center mt-8">
        <div>
          <button onClick={() => setSelection("explore")} className={selection=="explore" ? " font-bold text-xl mt-12 mb-4 selected-home-page bg-active ": " font-bold text-xl mt-12 mb-4 selected-home-page "}>Explore</button>
          <button onClick={() => setSelection("following")} className={selection=="following" ? " font-bold text-xl mt-12 mb-4 selected-home-page bg-active ": " font-bold text-xl mt-12 mb-4 selected-home-page "}>Following</button>
        </div>
        <CreatePostComponent user={user} userInfo={userInfo} />

        <div className="profile-posts  w-full flex flex-col items-center">
          {selection=="explore" ? posts.map((post) => (
            <PostComponent
              userPosted={post.user_profiles}
              postContext={post}
              user={user.id}
              fullUser={userInfo}
            ></PostComponent>
          )):filteredPosts.length == 0? <div className="post-container"><h1>You don't follow anyone, start exploring SocialApp!</h1> </div>:filteredPosts.map((post) => (
            <PostComponent
              userPosted={post.user_profiles}
              postContext={post}
              user={user.id}
              fullUser={userInfo}
            ></PostComponent>
          ))}
        </div>
      </div>
    </div>
  );
}
