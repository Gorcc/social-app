"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import "../app/styles/CommentComponent.scss";

export default function CommentComponent({
  deleteComment,
  comment_id,
  commentor,
  commentText,
  date,
  userid,
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
  var minute = commentDate.getMinutes();
  var hour = commentDate.getHours();

  var dateDiff = (currentDate - commentDate) / 1000;
  
  if (dateDiff < 3600) {
    if (dateDiff<60){
      var displayDate="now";
    }
    else {
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
          console.log(year);
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
      const { data } = await supabase
        .from("user_profiles")
        .select()
        .eq("id", commentor);

      setUser(data[0]);
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
          <Link href={"/profile/" + user?.unique_name}>
            <div className="post-avatar-div">
              <Image
                width={35}
                height={35}
                src={process.env.NEXT_PUBLIC_IMG_URL + user?.avatar_url}
                alt="Avatar"
                className="avatar image"
                style={{ height: 35, width: 35, borderRadius: 50 }}
              ></Image>
            </div>
          </Link>
          <div className="flex flex-col">
          <Link href={"/profile/" + user?.unique_name}>
            <div className="flex comment-name">
              <h1 className="font-bold">{user?.user_name}</h1>
              <h1 className="text-gray-400">@{user?.unique_name}</h1>
              
            </div>
          </Link>
          <h1 className="text-gray-400">{displayDate}</h1>
          </div>
        </div>
        {userid == commentor && (
          <FontAwesomeIcon
            onClick={removeComment}
            icon={faTrashCan}
            className="trash-icon"
          />
        )}
      </div>

      <div className="comment-context">
        <p>{commentText}</p>
      </div>
    </div>
  );
}
