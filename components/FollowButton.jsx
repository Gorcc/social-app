"use client";

import React, { useState } from "react";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";



export default function FollowButton({ profileContent, user, followStatus }) {
    const supabase = createClientComponentClient();
   
    const [isFollowed,setIsFollowed] = useState(followStatus.length);

  
   


    const handleFollow = async () => {
      

      const {error} = await supabase.from("follows").insert({
          follower:user.id,
          followed:profileContent.id
  
      })

      const {data:followerCount} = await supabase.from("follows").select().eq("followed", profileContent.id);
      const {data:followedCount} = await supabase.from("follows").select().eq("follower", user.id);

      


      const {} = await supabase.from("user_profiles").update({
          follower_count: followerCount.length
  
      }).eq("id",profileContent.id)
      
      const {} = await supabase.from("user_profiles").update({
          followed_count: followedCount.length
  
      }).eq("id",user.id)

      setIsFollowed(1);
  
      
    };
    const handleUnfollow = async () => {
      const {error} = await supabase.from("follows").delete().eq("follower",user.id).eq("followed",profileContent.id);

      const {data:followerCount} = await supabase.from("follows").select().eq("followed", profileContent.id);
      const {data:followedCount} = await supabase.from("follows").select().eq("follower", user.id);

      

      const {} = await supabase.from("user_profiles").update({
          follower_count: followerCount.length
  
      }).eq("id",profileContent.id)
      
      const {} = await supabase.from("user_profiles").update({
          followed_count: followedCount.length
  
      }).eq("id",user.id)
      setIsFollowed(0)
  
      
    };
 
  return profileContent.id != user.id && <button className="search-follow-btn" onClick={isFollowed!=0?handleUnfollow:handleFollow}>{isFollowed!=0?"Unfollow":"Follow"}</button> ;
}
