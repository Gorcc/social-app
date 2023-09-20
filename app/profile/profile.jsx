import Image from "next/image";
import "../styles/profile.scss";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { faBuildingColumns } from "@fortawesome/free-solid-svg-icons";
import { faTree } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PostComponent from "@/components/PostComponent";
import CreatePostComponent from "@/components/CreatePostComponent";
import FollowButton from "@/components/FollowButton";
import Link from "next/link";

export default async function ProfileComponent({
  profileContent,
  posts,
  user,
  followStatus,
}) {
  const showPost = profileContent.id == user.id;

  return (
    <div className="profile-container flex flex-col items-center">
      <div className="profile-header w-full">
        <div className="header-left flex items-center justify-center ml-48">
          <Image
            src={
              "https://hdjhrldjrgswbwvseahy.supabase.co/storage/v1/object/public/avatarimages/" +
              profileContent.avatar_url
            }
            className="profile-img"
            style={{ height: 200, width: 200 }}
            width={200}
            height={200}
          ></Image>
          <div className="name-bio">
            <div className="name-follow">
              
              <div className="name-username">
              <h1>{profileContent.user_name}</h1>
              <h2 className="text-gray-400 mb-4">@{profileContent.unique_name}</h2>
              </div>
             
             <div className="follow-btn">
             {!showPost && (
                <FollowButton
                
                  posts={posts}
                  profileContent={profileContent}
                  user={user}
                  followStatus={followStatus}
                ></FollowButton>
              )}
             </div>
              
            </div>
           
            <h2 className="text-black">{profileContent.user_bio}</h2>

            <div className="more-info">
              <ul>
                <li>
                  {" "}
                  <FontAwesomeIcon
                    className="info-icon"
                    icon={faMapMarkerAlt}
                  />
                  Cali
                </li>
                <li>
                  <FontAwesomeIcon
                    className="info-icon"
                    icon={faBuildingColumns}
                  />
                  MIT{" "}
                </li>
                <li>
                  {" "}
                  <FontAwesomeIcon className="info-icon" icon={faTree} />
                  23
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="header-right flex w-1/2 justify-end items-center">
          <div className="followers">
            <ul>
              <li>
                <Link href={"/followers/"+profileContent.unique_name}>
                  <div className="followers-comp">
                    <p>
                      <strong>{profileContent.follower_count}</strong>
                    </p>
                    
                    <p>Followers</p>
                  </div>
                </Link>
              </li>
              <li>
                <Link href={"/following/"+profileContent.unique_name}>
                  <div className="followers-comp">
                    <p>
                      <strong>{profileContent.followed_count}</strong>
                    </p>
                    
                    <p>Following</p>
                  </div>
                </Link>
              </li>
              <li>
                <div className="followers-comp">
                  <p>
                    <strong>{profileContent.post_count}</strong>
                  </p>
                  
                  <p>Posts</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <hr />

      <div className="posts-container flex flex-col items-center justify-center">
        {showPost && <CreatePostComponent user={user} />}

        <div className="profile-posts  w-full flex flex-col items-center">
          {posts.reverse().map((post) => (
            <PostComponent
              userPosted={profileContent}
              postContext={post}
            ></PostComponent>
          ))}
        </div>
      </div>
    </div>
  );
}
