import FollowButton from "@/components/FollowButton";
import Link from "next/link";
import Image from "next/image";
import "@/app/styles/follower.scss"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
    import { cookies } from "next/headers";

    

export default async function SearchItem({profileContent, user})


{


    const supabase = createServerComponentClient({cookies});

    const {data:followStatus} =await supabase.from("follows").select().eq("follower",user.id).eq("followed",profileContent.id)





    return (
        <div className="follower-container flex ">
          <Link className="follower link-hover" href={"/profile/" + profileContent.unique_name} shallow>
            <Image
              width={45}
              height={45}
              src={process.env.NEXT_PUBLIC_IMG_URL + profileContent.avatar_url}
              alt="Avatar"
              className="avatar image"
              style={{ height: 45, width: 45, borderRadius: 50 }}
            ></Image>
            <div className="search-item flex flex-col">
            <h1 >{profileContent.user_name}</h1>
            <h2>@{profileContent.unique_name}</h2>
            <p>{profileContent.user_bio}</p>
            </div>
          
          </Link>


            <FollowButton profileContent={profileContent} user={user} followStatus={followStatus}></FollowButton>

        </div>
      );
}