import Image from "next/image";
import Link from "next/link";
import "@/app/styles/followlist.scss"

export default function Follower({ follower }) {
  return (
    <div className="follower">
      <Link className="follower" href={"/profile/" + follower.unique_name}>
        <Image
          width={45}
          height={45}
          src={process.env.NEXT_PUBLIC_IMG_URL + follower.avatar_url}
          alt="Avatar"
          className="avatar image"
          style={{ height: 45, width: 45, borderRadius: 50 }}
        ></Image>
        <h1>{follower.user_name}</h1>
      </Link>
    </div>
  );
}
