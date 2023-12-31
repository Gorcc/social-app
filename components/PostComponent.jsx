"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import Image from "next/image";
import "@/app/styles/postcomponent.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import CommentComponent from "@/components/CommentComponent";
import { Dialog } from "@radix-ui/themes";
import * as HoverCard from "@radix-ui/react-hover-card";

import Tooltip from "@mui/material/Tooltip";

export default function PostComponent({
  postContext,
  userPosted,
  user,
  fullUser,
  comments,
  likes
}) {
  var postText = postContext.post_text;
  var postImage = postContext.post_file;
  var userName = userPosted.user_name;
  var userAvatar = userPosted.avatar_url;
  var uniqueName = userPosted.unique_name;
  var userID = userPosted.id;
  var postDate = postContext.created_at;
  var postId = postContext.post_id;
  var postUserId = postContext.user_id;
  var commentorImg = fullUser?.avatar_url;
  var commentorName = fullUser?.user_name;

  const [isLiked, setIsLiked] = useState(false);
  const [postLikes, setPostLikes] = useState();
  const [likeCount, setLikeCount] = useState("0");
  const [commentText, setCommentText] = useState();
  const [commentsState, setComments] = useState();
  const [likeAnim, setlikeAnim] = useState("");
  const [showComments, setShowComments] = useState(false);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const date = new Date(postDate);

  const currentDate = new Date();

  var month = months[date.getMonth()];
  var day = date.getDate();
  var year = date.getFullYear();
  var minute = (date.getMinutes() < 10 ? "0" : "") + date.getMinutes();
  var hour = date.getHours();

  var dateDiff = (currentDate - date) / 1000;

  if (dateDiff < 3600) {
    if (dateDiff < 60) {
      var displayDate = "now";
    } else {
      var displayDate = Math.round(dateDiff / 60).toString() + "m";
    }
  } else {
    if (dateDiff < 86400) {
      var displayDate = Math.floor(dateDiff / 3600).toString() + "h";
    } else {
      if (dateDiff < 604800) {
        var displayDate = Math.floor(dateDiff / 86400).toString() + "d";
      } else {
        if (year == currentDate.getFullYear()) {
          var displayDate = day + " " + month + " " + hour + ":" + minute;
        } else {
          var displayDate = day + " " + month + " " + year;
        }
      }
    }
  }

  const supabase = createClientComponentClient();
  
  
  useEffect(() => {
    const fetchPost = async () => {
      setPostLikes(likes);
      setLikeCount(likes.length);
     
      var likeFilter = likes.filter(like => (like.post_id == postId && like.user_id==user));
      if(likeFilter.length != 0){
        setIsLiked(true);
      }
    };

    fetchPost();
  }, []);
 

  async function handleLike() {
    setlikeAnim("likeAnim");

    const { data, error } = await supabase
      .from("likes")
      .select()
      .eq("post_id", postId)
      .eq("user_id", user);

    if (data.length == 0) {
      const { data, error } = await supabase
        .from("likes")
        .insert({ post_id: postId, user_id: user });

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

  async function sendComment(comment) {
    const { error } = await supabase.from("post_comments").insert({
      commentor_id: user,
      post_id: postId,
      comment_text: commentText,
      postUser_id: postUserId,
      commentorImg: commentorImg,
      commentorName: commentorName,
    });

    setCommentText("");

    const { data: postComments } = await supabase
      .from("post_comments")
      .select()
      .eq("post_id", postId);

    setComments(postComments);
    setShowComments(true);
  }

  async function deleteComment(commentid) {
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

  async function deletePost(commentid) {
    const { data } = await supabase
      .from("posts")
      .delete()
      .eq("post_id", postId);

    location.reload();
    //to-do: popup çıksın sorsun emin misin diye
  }

  function commentStatus() {
    setShowComments(!showComments);
  }

  return (
    <div className="post-container flex flex-col w-full p-12">
      <div className="flex post-avatar-div-and-delete-post-icon">
        <div className="post-avatar-div flex flex-row">
          <HoverCard.Root>
            <HoverCard.Trigger asChild>
              <Link href={"/profile/" + uniqueName} className="link-hover" shallow>
                <Image
                  width={45}
                  height={45}
                  src={process.env.NEXT_PUBLIC_IMG_URL + userAvatar}
                  alt="Avatar"
                  className="avatar avatar-link image"
                  style={{ height: 45, width: 45, borderRadius: 50 }}
                ></Image>
              </Link>
            </HoverCard.Trigger>
            <HoverCard.Portal>
              <HoverCard.Content className="HoverCardContent" sideOffset={5}>
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 7 }}
                >
                  <Link href={"/profile/" + uniqueName} className="link-hover" shallow>
                    <Image
                      className="Image avatar-link large"
                      width={45}
                      height={45}
                      src={process.env.NEXT_PUBLIC_IMG_URL + userAvatar}
                      alt="hover avatar"
                      style={{ height: 45, width: 45, borderRadius: 50 }}
                    />
                  </Link>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 15,
                    }}
                  >
                    <Link
                      className="link-hover"
                      href={"/profile/" + uniqueName}
                      shallow
                    >
                      <div>
                        <div className="Text hover-avatar-text bold">
                          {userName}
                        </div>
                        <div className="Text  hover-avatar-text faded">
                          @{uniqueName}
                        </div>
                      </div>
                    </Link>
                    <p className="Text hover-card-bio">{userPosted.user_bio}</p>
                    <div style={{ display: "flex", gap: 15 }}>
                      <div style={{ display: "flex", gap: 5 }}>
                        <div className="Text bold">
                          {userPosted.followed_count}
                        </div>{" "}
                        <div className="Text faded">Following</div>
                      </div>
                      <div style={{ display: "flex", gap: 5 }}>
                        <div className="Text bold">
                          {userPosted.follower_count}
                        </div>{" "}
                        <div className="Text faded">Followers</div>
                      </div>
                    </div>
                  </div>
                </div>

                <HoverCard.Arrow className="HoverCardArrow" />
              </HoverCard.Content>
            </HoverCard.Portal>
          </HoverCard.Root>

          <Link className="link-hover" href={"/profile/" + uniqueName} shallow>
            <div className="flex comment-name">
              <h1 className="font-bold">{userName}</h1>
              <h1 className="text-gray-400">@{uniqueName}</h1>
            </div>

            <Tooltip
              title={day + " " + month + " " + year + " " + hour + ":" + minute}
              placement="bottom"
            >
              <h1 className="date-text text-gray-400">{displayDate}</h1>
            </Tooltip>
          </Link>
        </div>
        {user == userID && (
          <Dialog.Root>
            <Dialog.Trigger>
              <FontAwesomeIcon icon={faTrashCan} className="trash-icon" />
            </Dialog.Trigger>

            <Dialog.Content style={{ maxWidth: 450 }}>
              <Dialog.Title>Delete Post</Dialog.Title>
              <Dialog.Description size="2" mb="6">
                Do you wish to delete this post?
              </Dialog.Description>

              <div className="flex flex-col">
                <Dialog.Close>
                  <button className="send-btn mb-2">Cancel</button>
                </Dialog.Close>
                <Dialog.Close>
                  <button onClick={deletePost} className="send-btn">
                    Delete
                  </button>
                </Dialog.Close>
              </div>
            </Dialog.Content>
          </Dialog.Root>
        )}
      </div>

      <div className="w-full">
        <div className="post">
          <p className="post-text">{postText}</p>
          {postImage != null && (
            <Image
              src={process.env.NEXT_PUBLIC_POST_URL + postImage}
              alt="Post"
              className="post-image"
              fill={true}
            ></Image>
          )}
        </div>
        <div className="likes flex flex-row">
          <div className="like-button-and-count">
            <FontAwesomeIcon
              className={likeAnim}
              id="like"
              onClick={handleLike}
              icon={faHeart}
              style={isLiked ? { color: "#ff0000" } : { color: "#000000" }}
            />
            <span>{likeCount}</span>
          </div>
          <div className="comments-button-and-count">
            <FontAwesomeIcon
              icon={faComment}
              onClick={commentStatus}
              style={
                showComments
                  ? { color: "var(--primary-green)" }
                  : { color: "#000000" }
              }
            />
            <span onClick={commentStatus}>{comments?.length}</span>
          </div>
        </div>
        <hr></hr>
        <div className={showComments ? "comments" : "comments comments-hidden"}>
          {comments?.map((comment) => (
            <CommentComponent
              deleteComment={deleteComment}
              comment_id={comment.id}
              userid={user}
              commentor={comment.commentor_id}
              commentText={comment.comment_text}
              date={comment.created_at}
              postUserId={postUserId}
              commentorProfile={comment.user_profiles}
            ></CommentComponent>
          ))}
        </div>

        <input
          type="text"
          value={commentText}
          placeholder="Write a comment!"
          onChange={(event) => setCommentText(event.target.value)}
          className="p-4 comment-input"
        />
        <button
          className="send-btn"
          disabled={!commentText}
          onClick={sendComment}
          type="submit"
        >
          <FontAwesomeIcon icon={faComment} /> <h1>Comment</h1>
        </button>
      </div>
    </div>
  );
}
