"use client";

import Image from "next/image";

import "@/app/styles/header.scss";

export default function NotificationComponent({ userId, comment, userObj }) {
 

  return (
    <div className="notification-container">
      {comment.map((comment) => (
        <div className="wrapper">
          <div className="notification-left">
            <Image
              width={50}
              height={50}
              src={process.env.NEXT_PUBLIC_IMG_URL + comment.commentorImg}
              alt="Avatar"
              className="notification-avatar"
              style={{
                height: 35,
                width: 35,
                borderRadius: 50,
              }}
            ></Image>
          </div>
          <div className="notification-middle">
            <h4>
              New comment from <strong>{comment.commentorName};</strong>
            </h4>
            <h1 key={comment.id}>
              <strong>"{comment.comment_text}"</strong>
            </h1>
          </div>
        </div>
      ))}
    </div>
  );
}
