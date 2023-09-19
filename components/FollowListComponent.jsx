import Follower from "@/components/FollowerComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import "@/app/styles/followlist.scss"

import Link from "next/link";

export default function FollowListComponent({targetProfile, listType, followerList }) {
  return (
    <div className="follow-list-div">
      <h1>{listType}</h1>
      <Link href={"/profile/"+targetProfile}>
        <FontAwesomeIcon  icon={faArrowLeft} />
      </Link>

      <div>
        {followerList.map((follower) => (
          <Follower follower={follower}></Follower>
        ))}
      </div>
    </div>
  );
}
