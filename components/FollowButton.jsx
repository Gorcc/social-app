"use client";

import React from "react";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function FollowButton({ profileContent, user }) {
    const supabase = createClientComponentClient();
    const previousFollower = profileContent.follower_count;
    const previousFollowed = user.followed_count;
  const handleFollow = async () => {
    console.log("clicked");
    const {error} = await supabase.from("follows").insert({
        follower:user.id,
        followed:profileContent.id

    })
    const {} = await supabase.from("user-profiles").update({
        follower_count: previousFollower +1

    }).eq("id",profileContent.id)
    
    const {} = await supabase.from("user-profiles").update({
        followed_count: previousFollowed +1

    }).eq("id",user.id)

    
  };
  return <button onClick={handleFollow}>Follow</button>;
}
