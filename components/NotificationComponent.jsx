"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import PofileImg from "@/app/styles/profile-user-svgrepo-com.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import "@/app/styles/header.scss";
import supabase from "@/utils/supabase";

export default function NotificationComponent({ userId, comment, userObj }) {

  console.log(comment)
  
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
