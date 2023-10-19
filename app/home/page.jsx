import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Home from "../home/home";

export default async function Index() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: userInfo } = await supabase
  .from("user_profiles")
  .select()
  .eq("id", user.id);


  const { data: followList } = await supabase
    .from("follows")
    .select("followed")
    .eq("follower", user.id);

    for(let i=0;i<followList.length;i++){
        followList[i]=followList[i].followed;
    }
    followList.push(user.id);

    const { data: postList } = await supabase
    .from("posts")
    .select("post_id,user_id,created_at,post_text,post_file, user_profiles(id,user_name,avatar_url,unique_name,follower_count,followed_count,user_bio)")
    .in("user_id", followList);

    console.log();

  return <Home posts={postList} user={user} userInfo={userInfo[0]}  ></Home>;
}
