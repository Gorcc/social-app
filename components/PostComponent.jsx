import Link from "next/link";
import Image from "next/image";
import "@/app/styles/postcomponent.scss";

export default function PostComponent({ postContext, userPosted }) {
  var postText = postContext.post_text;
  var postImage = postContext.post_file;
  var userName = userPosted.user_name;
  var userAvatar = userPosted.avatar_url;
  var uniqueName = userPosted.unique_name;
  var postDate = postContext.created_at;

  const date = new Date();
  console.log(date);

  return (
    <div className="post-container flex flex-row w-full p-12">
      <Link href={"/profile/"+uniqueName}>
        <div className="post-avatar-div">
          <Image
            width={45}
            height={45}
            src={process.env.NEXT_PUBLIC_IMG_URL + userAvatar}
            alt="Avatar"
            className="avatar image"
            style={{ height: 45, width: 45, borderRadius: 50 }}
          ></Image>
        </div>
      </Link>

      <div>
        <Link href={"/profile/"+uniqueName}>
          <div className="flex">
            <h1 className="font-bold">{userName}</h1>
            <h1 className="text-gray-400">@{uniqueName}</h1>
            {/* <h2>{postDate}</h2> */}
          </div>
        </Link>

        <div className="post">
          <p>{postText}</p>
          {postImage != null && (
            <Image
              src={process.env.NEXT_PUBLIC_POST_URL + postImage}
              alt="Post"
              className="post-image"
              fill={true}
            ></Image>
          )}
        </div>
      </div>
    </div>
  );
}
