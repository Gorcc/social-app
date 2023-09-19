import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import FollowListComponent from "@/components/FollowListComponent";

export default async function Followers({ targetProfile }) {
  const supabase = createServerComponentClient({ cookies });

  const { data:followerList} = await supabase
  .from('follows')
  .select("follower").eq("followed", targetProfile)
  

  for (let i=0; i<followerList.length;i++){

    followerList[i]=followerList[i].follower;


  }

 



  const { data:followerInfos} = await supabase
  .from('user-profiles')
  .select().in('id', followerList)

  console.log(followerInfos);




  
  return (
    <div>
      <FollowListComponent targetProfile={targetProfile} listType="Followers" followerList={followerInfos}></FollowListComponent>
      
    </div>
  );
}
