
import Link from 'next/link'
import Image from 'next/image';
import "@/app/styles/postcomponent.scss"

export default function PostComponent({postContext, userPosted}) {
  
  var postText =postContext.post_text;
  var postImage = postContext.post_file;
  var userName = userPosted.user_name;
  var userAvatar = userPosted.avatar_url;

  if(postImage != null){

    return (<div className='post-container  flex flex-row w-full'>
         <div className='post-avatar-div'>
            <Image width={45}
            height={45}
            src={ process.env.NEXT_PUBLIC_IMG_URL+userAvatar}
            alt="Avatar"
             className="avatar image"
         
            style={{ height: 45, width: 45, borderRadius:50}}></Image>
         </div>
         <div>
            <h1 className='font-bold'>{userName}</h1>

            <p>{postText}</p>
            <Image width={600}
               
               height={337}
                src={ process.env.NEXT_PUBLIC_POST_URL+postImage}
                alt="Post"
                className="post-image border"
                style={{ height: 337, width: 600}}>

            </Image>
         </div>

    </div>)

  }

  else {
    return (<div className='flex flex-col items-center'>
        <Image width={45}
          height={45}
          src={ process.env.NEXT_PUBLIC_IMG_URL+userAvatar}
          alt="Avatar"
          className="avatar image"
         
          style={{ height: 45, width: 45, borderRadius:50}}></Image>
         <h1>{userName}</h1>

         <p>{postText}</p>
         

    </div>)
    
  }
  
   
  
}