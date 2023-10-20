import CreatePostComponent from "@/components/CreatePostComponent";
import PostComponent from "@/components/PostComponent";


export default function Home({ user,posts, userInfo}) {

  console.log(posts[0].user_profiles);
  return (
    

    <div className="posts-container flex flex-col items-center justify-center mt-8">
      <h1 className="p-8 font-bold text-xl mt-12"> Homepage</h1>
      <CreatePostComponent user={user} userInfo={userInfo} />

      <div className="profile-posts  w-full flex flex-col items-center">
        {posts.reverse().map((post) => (
          <PostComponent
            userPosted={post.user_profiles}
            postContext={post}
            user={user.id}
           
          ></PostComponent>
        ))}
      </div>
    </div>
  );
}
