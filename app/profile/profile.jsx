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
import LeftMenu from "@/components/LeftMenuComponent";

export default async function ProfileComponent({
  profileContent,
  posts,
  user,
  followStatus,
}) {
  const showPost = profileContent.id == user.id;

  return (
    <div>
      <LeftMenu userProfile={user} currentPage="profile"></LeftMenu>

      <div className="profile-container flex flex-col items-center mt-12">
        <div className="profile-header w-full">
          <div className="flex flex-row mb-4">
            <Image
              src={
                "https://hdjhrldjrgswbwvseahy.supabase.co/storage/v1/object/public/avatarimages/" +
                profileContent.avatar_url
              }
              className="profile-img mr-8 mt-4"
              style={{ height: 150, width: 150 }}
              width={200}
              height={200}
            ></Image>
            <div className="header-left mt-4 flex">
              <div className="name-bio">
                <div className="name-follow">
                  <div className="name-username">
                    <h1>{profileContent.user_name}</h1>
                    <h2 className="text-gray-400">
                      @{profileContent.unique_name}
                    </h2>
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
                   {profileContent.location &&  <li>
                      {" "}
                      <FontAwesomeIcon
                        className="info-icon"
                        icon={faMapMarkerAlt}
                      />
                      {profileContent.location}
                    </li>}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="header-right flex w-1/2 justify-center items-center">
            <div className="followers">
              <ul>
                <li>
                  <Link
                    className="link-hover"
                    href={"/followers/" + profileContent.unique_name}
                    shallow
                  >
                    <div className="followers-comp">
                      <p>
                        <strong>{profileContent.follower_count}</strong>
                      </p>

                      <p>Followers</p>
                    </div>
                  </Link>
                </li>
                <li>
                  <Link
                   
                    className="link-hover"
                    href={"/following/" + profileContent.unique_name}
                    shallow
                  >
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

        <div className="posts-container flex flex-col items-center justify-center">
          {showPost && (
            <CreatePostComponent userInfo={profileContent} user={user} />
          )}

          <div className="profile-posts  w-full flex flex-col items-center">
            {posts.reverse().map((post) => (
              <PostComponent
                userPosted={profileContent}
                postContext={post}
                user={user.id}
                likes={post.likes}
                comments={post.post_comments}
              ></PostComponent>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
