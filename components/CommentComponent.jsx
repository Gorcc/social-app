"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

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
          <Link href={"/profile/" + user?.unique_name}>
            <div className="post-avatar-div">
              <Image
                width={45}
                height={45}
                src={process.env.NEXT_PUBLIC_IMG_URL + user?.avatar_url}
                alt="Avatar"
                className="avatar image"
                style={{ height: 45, width: 45, borderRadius: 50 }}
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
          <div className="comment-context">
              <p>{commentText}</p>
              
            </div>
    
            {userid == commentor && <FontAwesomeIcon onClick={removeComment} icon={faTrashCan} />}
    
        </div>
      );
  }

  


