import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import ProfileComponent from "./profile";
import ChatServer from "@/components/Chat/ChatServer";
export default async function Profile({ targetProfile }) {
  const supabase = createServerComponentClient({ cookies });

  const { data: profile, error } = await supabase
    .from("user_profiles")
    .select("id,user_name, avatar_url, user_bio, follower_count, followed_count, post_count, unique_name, location, posts(post_id, user_id, created_at, post_text, post_file)")
    .eq("unique_name", targetProfile);

  
    if(profile[0]){
   
  
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const {data: userProfile} = await supabase.from("user_profiles").select().eq("id",user.id);

  const {data:followStatus} =await supabase.from("follows").select().eq("follower",user.id).eq("followed",profile[0].id)

  return (
    <div>
      <ProfileComponent
        posts={profile[0].posts}
        profileContent={profile[0]}
        user={userProfile[0]}
        followStatus={followStatus}
      ></ProfileComponent>

      <ChatServer authUser={user} chatType={"bottom-right"}></ChatServer>
    </div>
  );

    }

    else {

      return(<h1 className="mt-96">User doesn't exists.</h1>)
    }
    

  

 
  

  
}
