
import Image from "next/image";

export default async function ProfileComponent({profileContent}) {
    

   
    return ( 

        <div className="profile-container">
            <Image src={"https://hdjhrldjrgswbwvseahy.supabase.co/storage/v1/object/public/avatarimages/"+profileContent.avatar_url}

            
            style={{ height: 150, width: 150 }}
            width={150}
            height={150}>
               
            </Image>
            <h1>{profileContent.user_name}</h1>
            <h2>{profileContent.user_bio}</h2>
        </div>
      
  )
   
   
  }