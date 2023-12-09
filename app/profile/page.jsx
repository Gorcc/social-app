import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import ProfileComponent from "./profile";
import ChatServer from "@/components/Chat/ChatServer";
export default async function Profile({ targetProfile }) {
  const supabase = createServerComponentClient({ cookies });

  const { data: profile, error } = await supabase
    .from("user_profiles")
    .select()
    .eq("unique_name", targetProfile);

  
    if(profile[0]){
   
  
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const {data: userProfile} = await supabase.from("user_profiles").select().eq("id",user.id);
  const { data: postList } = await supabase
  .from("posts")
  .select(
    "post_id,user_id,created_at,post_text,post_file, user_profiles(id,user_name,avatar_url,unique_name,follower_count,followed_count,user_bio, post_count), post_comments(id,created_at,commentor_id,post_id,comment_text, user_profiles(id,user_name,avatar_url,unique_name,follower_count,followed_count,user_bio)), likes(like_id, post_id, created_at, user_id)"
    )
  .eq("user_id", profile[0].id);


  const {data:followStatus} =await supabase.from("follows").select().eq("follower",user.id).eq("followed",profile[0].id)

  return (
    <div>
      <ProfileComponent
        posts={postList}
        profileContent={postList[0].user_profiles}
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
