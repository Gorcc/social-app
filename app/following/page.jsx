import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import FollowButton from "@/components/FollowButton";
import FollowListComponent from "@/components/FollowListComponent";
import LeftMenu from "@/components/LeftMenuComponent";

export default async function Followings({ targetProfile }) {
  const supabase = createServerComponentClient({ cookies });

  const { data: target } = await supabase
    .from("user_profiles")
    .select()
    .eq("unique_name", targetProfile);


    if(target[0]){

      const { data: followerList } = await supabase
      .from("follows")
      .select("followed")
      .eq("follower", target[0].id);
  
    for (let i = 0; i < followerList.length; i++) {
      followerList[i] = followerList[i].followed;
    }
  
    const { data: followerInfos } = await supabase
      .from("user_profiles")
      .select()
      .in("id", followerList);
  
    (followerInfos);
  
    return (
      <div>
        <LeftMenu currentPage={"profile"} userProfile={target[0]}></LeftMenu>
        <FollowListComponent
          targetProfile={targetProfile}
          listType="Following"
          followerList={followerInfos}
        ></FollowListComponent>
      </div>
    );
  }
  
  else {
    return (<h1 className="mt-96">Page doesn't exists.</h1>)
  }

    }



 