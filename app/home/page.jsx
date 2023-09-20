import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Home from "../home/home";

export default async function Index() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: followList } = await supabase
    .from("follows")
    .select("followed")
    .eq("follower", user.id);

    for(let i=0;i<followList.length;i++){
        followList[i]=followList[i].followed;
    }

    const { data: postList } = await supabase
    .from("posts")
    .select("post_id,user_id,created_at,post_text,post_file, user_profiles(user_name,avatar_url,unique_name)")
    .in("user_id", followList);

    console.log();

  return <Home posts={postList} user={user} ></Home>;
}
