import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import ProfileComponent from "./profile";
import FollowButton from "@/components/FollowButton";

export default async function Profile({ targetProfile }) {
  const supabase = createServerComponentClient({ cookies });

  const { data: profile, error } = await supabase
    .from("user-profiles")
    .select()
    .eq("unique_name", targetProfile);

  
    if(profile[0]){
      const { data: posts } = await supabase
    .from("posts")
    .select()
    .eq("user_id", profile[0].id);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const {data: userProfile} = await supabase.from("user-profiles").select().eq("id",user.id);

  const {data:followStatus} =await supabase.from("follows").select().eq("follower",user.id).eq("followed",profile[0].id)

  return (
    <div>
      <ProfileComponent
        posts={posts}
        profileContent={profile[0]}
        user={userProfile[0]}
        followStatus={followStatus}
      ></ProfileComponent>
      
    </div>
  );

    }

    else {

      return(<h1 className="mt-96">User doesn't exists.</h1>)
    }
    

  

 
  

  
}
