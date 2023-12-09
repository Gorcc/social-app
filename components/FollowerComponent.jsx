import Image from "next/image";
import Link from "next/link";
import "@/app/styles/followlist.scss"


export default function Follower({ follower }) {
  return (
    <div className="follower-container">
      <Link className="follower link-hover" href={"/profile/" + follower.unique_name} shallow>
        <Image
          width={45}
          height={45}
          src={process.env.NEXT_PUBLIC_IMG_URL + follower.avatar_url}
          alt="Avatar"
          className="avatar image"
          style={{ height: 45, width: 45, borderRadius: 50 }}
        ></Image>
        <h1 className="mr-8">{follower.user_name}</h1>
        <h2>@{follower.unique_name}</h2>
      </Link>
    </div>
  );
}
