"use client";
import React, { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faImage } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import "../app/styles/createpost.scss";
import Link from "next/link";

export default function CreatePost({ user, userInfo }) {
  const supabase = createClientComponentClient();
  const [uplodedFile, setUploadedFile] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [textInput, setTextInput] = useState("");
  const [uploading, setUploading] = useState(false);
  const [imageName, setImageName] = useState("");

  const uploadFile = async (event) => {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("You must select an image to upload.");
      }

      const file = event.target.files[0];
      setUploadedFile(file);
      setImageName(file.name);
      const fileExt = file.name.split(".").pop();
      const filePath = user?.id + "/" + Math.random() + "." + fileExt;
      setFileUrl(filePath);
      

      let { error: uploadError } = await supabase.storage
        .from("postfiles")
        .upload(filePath, file);
    } catch (error) {
      alert("Error uploading image");
    } finally {
      setUploading(false);
    }
  };

  async function submitPost() {
    let postId = uuidv4();

    try {
      setLoading(true);

      const { error } = await supabase.from("posts").insert({
        user_id: user?.id,
        post_id: postId,
        post_text: textInput,
        post_file: fileUrl,
      });

      if (error) throw error;
      const { data: posts } = await supabase
        .from("posts")
        .select()
        .eq("user_id", user.id);
      const { error: updatePostCountError } = await supabase
        .from("user_profiles")
        .update({
          post_count: posts.length,
        })
        .eq("id", user.id);

      location.reload();
      
    } catch (error) {
      alert("Error occured!");
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    const textarea = document.querySelector("textarea");
    textarea.addEventListener("keyup", (e) => {
      textarea.style.height = "63px";
      let scHeight = e.target.scrollHeight;
      textarea.style.height = `${scHeight}px`;
    });

    return () => {};
  }, []);

  return (
    <div className="create-post-container">
     <div className="flex flex-row avatar-and-textarea">
     <Link  className="link-hover"href={"/profile/" + userInfo.unique_name} shallow><Image
        width={45}
        height={45}
        alt="Avatar"
        className="avatar image"
        style={{ margin:4, height: 45, width: 45, borderRadius: 50 }}
        src={process.env.NEXT_PUBLIC_IMG_URL + userInfo.avatar_url}
      >
        
      </Image></Link>
     
      <textarea
        id="post-message"
        placeholder="Write anything..."
        value={textInput}
        onChange={(event) => setTextInput(event.target.value)}
      ></textarea>
     </div>
      <div className="create-post-uploads flex justify-between w-full">
        <label className="button primary block" htmlFor="single">
          {uploading ? (
           
            "Uploading ..."
          ) : (
           <>
            {fileUrl? <>{imageName} <br /></>:
            ""}
            
            <FontAwesomeIcon
              className="info-icon font-bold py-2"
              icon={faImage}
            />
            </>
          )}
        </label>

        <input
          style={{
            visibility: "hidden",
            position: "absolute",
          }}
          type="file"
          id="single"
          accept="image/*"
          onChange={uploadFile}
          disabled={uploading}
        />
        <button
          className="post-btn items-center"
          disabled={loading || !textInput}
          onClick={submitPost}
        >
          Post
        </button>
      </div>
    </div>
  );
}
