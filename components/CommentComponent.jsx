"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import "../app/styles/CommentComponent.scss";

export default function CommentComponent({ deleteComment, comment_id, commentor, commentText, date, userid}) {
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

  console.log(date);

  async function removeComment(){
    if ( userid == commentor){
        deleteComment(comment_id)
    }

      
    };
    return (
        <div className="comment-wrap">
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
          <Link href={"/profile/" + user?.unique_name}>
              <div className="flex">
                <h1 className="font-bold">{user?.user_name}</h1>
                <h1 className="text-gray-400">@{user?.unique_name}</h1>
                {/* <h2>{postDate}</h2> */}
              </div>
            </Link>
          </div>
          
          <div className="comment-context">
              <p>{commentText}</p>
              {userid == commentor && <FontAwesomeIcon onClick={removeComment} icon={faTrashCan} className="trash-icon"/>}
            </div>
    
            
    
        </div>
      );
  }

  


