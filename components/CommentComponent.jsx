"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import "../app/styles/CommentComponent.scss";
import Tooltip from "@mui/material/Tooltip";
import { Dialog } from "@radix-ui/themes";
import * as HoverCard from "@radix-ui/react-hover-card";
export default function CommentComponent({
  deleteComment,
  comment_id,
  commentor,
  commentText,
  date,
  userid,
  commentorProfile
}) {
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
  const commentDate = new Date(date);

  const currentDate = new Date();

  var month = months[commentDate.getMonth()];
  var day = commentDate.getDate();
  var year = commentDate.getFullYear();
  var minute =
    (commentDate.getMinutes() < 10 ? "0" : "") + commentDate.getMinutes();

  var hour = commentDate.getHours();

  var dateDiff = (currentDate - commentDate) / 1000;

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

  const [user, setUser] = useState();

  const supabase = createClientComponentClient();

  useEffect(() => {
    const fetchUser = async () => {
     

      setUser(commentorProfile);
      console.log(commentorProfile);
    };

    fetchUser();
  }, []);

  async function removeComment() {
    if (userid == commentor) {
      deleteComment(comment_id);
    }
  }
  return (
    <div className="comment-wrap">
      <div className="flex comment-profile-and-delete">
        <div className="comment-profile">
          <HoverCard.Root>
            <HoverCard.Trigger asChild>
              <Link
                className="link-hover"
                href={"/profile/" + user?.unique_name}
              >
                <div className="post-avatar-div">
                  <Image
                    width={35}
                    height={35}
                    src={process.env.NEXT_PUBLIC_IMG_URL + user?.avatar_url}
                    alt="Avatar"
                    className="avatar avatar-link image"
                    style={{ height: 35, width: 35, borderRadius: 50 }}
                  ></Image>
                </div>
              </Link>
            </HoverCard.Trigger>
            <HoverCard.Portal>
              <HoverCard.Content className="HoverCardContent" sideOffset={5}>
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 7 }}
                >
                  <Link className="link-hover"
                href={"/profile/" + user?.unique_name}>
                    <Image
                      className="Image avatar-link large"
                      width={45}
                      height={45}
                      src={process.env.NEXT_PUBLIC_IMG_URL + user?.avatar_url}
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
                      href={"/profile/" + user?.unique_name}
                    >
                      <div>
                        <div className="Text hover-avatar-text bold">
                          {user?.user_name}
                        </div>
                        <div className="Text hover-avatar-text faded">
                          @{user?.unique_name}
                        </div>
                      </div>
                    </Link>
                    <div className="hover-card-bio Text">{user?.user_bio}</div>
                    <div style={{ display: "flex", gap: 15 }}>
                      <div style={{ display: "flex", gap: 5 }}>
                        <div className="Text bold">{user?.followed_count}</div>{" "}
                        <div className="Text faded">Following</div>
                      </div>
                      <div style={{ display: "flex", gap: 5 }}>
                        <div className="Text bold">{user?.follower_count}</div>{" "}
                        <div className="Text faded">Followers</div>
                      </div>
                    </div>
                  </div>
                </div>

                <HoverCard.Arrow className="HoverCardArrow" />
              </HoverCard.Content>
            </HoverCard.Portal>
          </HoverCard.Root>

          <div className="flex flex-col">
            <Link className="link-hover" href={"/profile/" + user?.unique_name}>
              <div className="flex comment-name">
                <h1 className="font-bold">{user?.user_name}</h1>
                <h1 className="text-gray-400">@{user?.unique_name}</h1>
              </div>
            </Link>
            <Tooltip
              title={day + " " + month + " " + year + " " + hour + ":" + minute}
              placement="bottom"
            >
              <h1 className="date-text text-gray-400">{displayDate}</h1>
            </Tooltip>{" "}
          </div>
        </div>
        {userid == commentor && (
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
                  <button className="send-btn">Cancel</button>
                </Dialog.Close>
                <Dialog.Close>
                  <button onClick={removeComment} className="send-btn">
                    Delete
                  </button>
                </Dialog.Close>
              </div>
            </Dialog.Content>
          </Dialog.Root>
        )}
      </div>

      <div className="comment-context">
        <p>{commentText}</p>
      </div>
    </div>
  );
}
