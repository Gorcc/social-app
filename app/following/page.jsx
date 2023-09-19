import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import FollowButton from "@/components/FollowButton";
import FollowListComponent from "@/components/FollowListComponent";

export default async function Followings({ targetProfile }) {
  const supabase = createServerComponentClient({ cookies });

  const { data:followerList} = await supabase
  .from('follows')
  .select("followed").eq("follower", targetProfile)
  

  for (let i=0; i<followerList.length;i++){

    followerList[i]=followerList[i].followed;


  }
 
 



  const { data:followerInfos} = await supabase
  .from('user-profiles')
  .select().in('id', followerList)

  console.log(followerInfos);




  
  return (
    <div>
      <FollowListComponent targetProfile={targetProfile} listType="Following" followerList={followerInfos}></FollowListComponent>
      
    </div>
  );
}
