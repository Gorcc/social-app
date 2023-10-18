"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import Image from "next/image";
import "@/app/styles/postcomponent.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faComment} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { TRUE } from "sass";
import CommentComponent from "@/components/CommentComponent";

export default function PostComponent({ postContext, userPosted, user }) {
  var postText = postContext.post_text;
  var postImage = postContext.post_file;
  var userName = userPosted.user_name;
  var userAvatar = userPosted.avatar_url;
  var uniqueName = userPosted.unique_name;
  var postDate = postContext.created_at;
  var postId = postContext.post_id;

  const [isLiked, setIsLiked] = useState(false);
  const [postLikes, setPostLikes] = useState();
  const [likeCount, setLikeCount] = useState();
  const [commentText, setCommentText] = useState();
  const [comments, setComments] = useState();
  const [likeAnim, setlikeAnim] = useState("");

  const date = new Date();
  
  const supabase = createClientComponentClient();
  useEffect(() => {
    const fetchPost = async () => {
      const { data: postLikes } = await supabase
        .from("likes")
        .select()
        .eq("post_id", postId);

      
      setPostLikes(postLikes);
      setLikeCount(postLikes.length);

      const { data: postComments } = await supabase
        .from("post_comments")
        .select()
        .eq("post_id", postId);


        setComments(postComments);
        
      
        const { data: thisUserLike } = await supabase
        .from("likes")
        .select()
        .eq("post_id", postId).eq("user_id",user);
        if (thisUserLike.length!=0){
          setIsLiked(true);
        }



    };
    
    fetchPost();
    

   
   
  }, []);

  async function handleLike() {
    setlikeAnim("likeAnim");
    
   const { data, error } = await supabase
        .from("likes")
        .select().eq("post_id", postId)
        .eq("user_id", user);
        console.log(data)


    if (data.length==0) {
      const { data, error } = await supabase
        .from("likes")
        .insert({ post_id: postId, user_id: user });
      console.log(error);
      setIsLiked(true);
      const { data: post } = await supabase
      .from("likes")
      .select()
      .eq("post_id", postId);

    setPostLikes(post);
    setLikeCount(post.length);
    } else {
      const { data, error } = await supabase
        .from("likes")
        .delete()
        .eq("post_id", postId)
        .eq("user_id", user);
        const { data: post } = await supabase
      .from("likes")
      .select()
      .eq("post_id", postId);

    setPostLikes(post);
    setLikeCount(post.length);
    setIsLiked(false);
    setlikeAnim("");
    
   
   
    }
    
  }


  async function sendComment(comment){

    const { error } = await supabase
  .from('post_comments')
  .insert({ commentor_id:user, post_id:postId,comment_text:commentText  })

  setCommentText("");

  const { data: postComments } = await supabase
        .from("post_comments")
        .select()
        .eq("post_id", postId);


        setComments(postComments);



  }

  async function deleteComment(commentid){

    const { data } = await supabase
        .from("post_comments")
        .delete()
        .eq("id", commentid);


        const { data: postComments } = await supabase
        .from("post_comments")
        .select()
        .eq("post_id", postId);


        setComments(postComments);



  //to-do: popup çıksın sorsun emin misin diye


  }

  return (
    <div className="post-container flex flex-row w-full p-12">
      <Link href={"/profile/" + uniqueName}>
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

      <div className="w-full">
        <Link href={"/profile/" + uniqueName}>
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
        <div className="likes">
          <FontAwesomeIcon className={likeAnim} id="like" onClick={handleLike} icon={faHeart} style={isLiked?{color: "#ff0000",}:{color: "#000000",}} />
          <span>
          {likeCount}
          </span>
          
        </div>
        <div className="comments">

          {
            comments?.map((comment) => (
              <CommentComponent deleteComment={deleteComment} comment_id={comment.id} userid= {user} commentor={comment.commentor_id} commentText={comment.comment_text} date={comment.created_at} ></CommentComponent>
            ) )

           
          }

        </div>
        
        <input type="text" value={commentText} placeholder="Write a comment!" onChange={event => setCommentText(event.target.value)} className="p-4 comment-input" />
        <button className="send-btn" disabled={!commentText} onClick={sendComment} type="submit"><FontAwesomeIcon icon={faComment} /> Comment</button>
        

      </div>
    </div>
  );
}
