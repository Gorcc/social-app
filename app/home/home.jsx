import CreatePostComponent from "@/components/CreatePostComponent";
import PostComponent from "@/components/PostComponent";


export default function Home({ user,posts }) {
  return (


    <div className="posts-container flex flex-col items-center justify-center mt-8">
      <CreatePostComponent user={user} />

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
