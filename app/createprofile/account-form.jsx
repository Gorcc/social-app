"use client";
import { useCallback, useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import LeftMenu from "@/components/LeftMenuComponent.jsx";
import Link from "next/link";
import Avatar from "./avatar.jsx";
import "../styles/createprofile.scss";
import { Alert, AlertTitle } from "@mui/material";

export default function AccountForm({ session, cuser }) {
  const supabase = createClientComponentClient();

  const [loading, setLoading] = useState(true);
  const [fullname, setFullname] = useState("");
  const [uniquename, setUniquename] = useState("");
  const [bio, setBio] = useState(null);
  const [userLocation, setuserLocation] = useState("");

  const [avatar_url, setAvatarUrl] = useState(null);
  const user = session?.user;

  const getProfile = useCallback(async () => {
    try {
      setLoading(true);

      let { data, error, status } = await supabase
        .from("user_profiles")
        .select(`user_name, unique_name, avatar_url, user_bio, location`)
        .eq("id", user?.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setFullname(data.user_name);
        setUniquename(data.unique_name);
        setAvatarUrl(data.avatar_url);
        setBio(data.user_bio);
        setuserLocation(data.location);
      }
    } catch (error) {
      alert("Error loading user data!");
    } finally {
      setLoading(false);
    }
  }, [user, supabase]);

  useEffect(() => {
    getProfile();
  }, [user, getProfile]);

  async function updateProfile({
    fullname,
    avatar_url,
    bio,
    uniquename,
    userLocation,
  }) {
    if (avatar_url != null) {
      try {
        setLoading(true);

        const { error, status } = await supabase
          .from("user_profiles")
          .upsert({
            id: user?.id,
            user_name: fullname,
            avatar_url,
            user_bio: bio,
            unique_name: uniquename,
            location: userLocation,
          })
          .eq("id", user?.id);

        const statusCode = status;

        if (error) throw error;
        location.reload();
      } catch (error) {
        if (
          error.code == 
          "23514"
        ) {
          alert("Username must be at least 4 character!");
        } else if (
          error.code ==
          "23505"
        ) {
          alert("Username already exists!");
        } else {
          alert("Error updating the data!");
          console.log(error);
        }
      } finally {
        setLoading(false);
      }
    } else if (avatar_url == null) {
      try {
        setLoading(true);

        const { error, status } = await supabase
          .from("user_profiles")
          .upsert({
            id: user?.id,
            user_name: fullname,
            user_bio: bio,
            unique_name: uniquename,
            location: userLocation,
          })
          .eq("id", user?.id);

        if (error) throw error;
        location.reload();

        alert("Profile updated!");
      } catch (error) {
        if (
          error.code == 
          "23514"
        ) {
          alert("Username must be at least 4 character!");
        } else if (
          error.code ==
          "23505"
        ) {
          alert("Username already exists!");
        } else {
          alert("Error updating the data!");
          console.log(error);
        }
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  }

  async function removeAvatar() {
    const { error } = await supabase
      .from("user_profiles")
      .update({ avatar_url: "no-avatar/avatar-no-image.png" })
      .eq("id", user?.id);
    location.reload();
    alert("Avatar removed!");
  }

  function setUniqueName(value) {
    var loweredValue = value.toLowerCase();
    setUniquename(loweredValue.replace(/\s/g, ""));
  }

  return (
   <div className="mt-12">
     <LeftMenu userProfile={cuser[0]} currentPage="editprofile"></LeftMenu>

<div className="form-widget">
  {/* <Alert className="absolute alert" severity="error">
    <AlertTitle>Error</AlertTitle>
    This is an error alert — <strong>check it out!</strong>
  </Alert> */}
  <div className="form-left">
    <div>
      <Avatar
        removeAvatar={removeAvatar}
        uid={user.id}
        url={avatar_url}
        size={300}
        onUpload={(url) => {
          setAvatarUrl(url);
          updateProfile({
            fullname,
            avatar_url: url,
            bio,
            uniquename,
            userLocation,
          });
        }}
      />
    </div>
  </div>
  <div className="form-right">
    <div className="form-right-content">
      <div className="form-elements">
        <div className="form-element">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="text"
            value={session?.user.email}
            disabled
          />
        </div>
        <div className="form-element">
          <label htmlFor="uniqueName">Username</label>
          <input
            id="uniqueName"
            type="text"
            value={uniquename || ""}
            onChange={(e) => setUniqueName(e.target.value)}
          />
        </div>
        <div className="form-element">
          <label htmlFor="fullName">Full Name</label>
          <input
            id="fullName"
            type="text"
            value={fullname || ""}
            onChange={(e) => setFullname(e.target.value)}
          />
        </div>

        <div className="form-element">
          <label htmlFor="bio">Bio</label>
          <input
            id="bio"
            type="text"
            value={bio || ""}
            onChange={(e) => setBio(e.target.value)}
          />
        </div>
      </div>
      <div className="profile-elements">
        <div className="form-element">
          <label htmlFor="bio">Location</label>
          <input
            id="location"
            type="text"
            value={userLocation || ""}
            onChange={(e) => setuserLocation(e.target.value)}
          />
        </div>
        <div className="form-buttons">
          <button
            className="button primary block green-btn"
            onClick={() =>
              updateProfile({
                fullname,
                avatar_url,
                bio,
                uniquename,
                userLocation,
              })
            }
            disabled={
              loading || fullname.length == 0 || uniquename.length == 0
            }
          >
            {loading ? "Loading ..." : "Update"}
          </button>
          <form action="/auth/signout" method="post">
            <button className="button block green-btn" type="submit">
              Sign out
            </button>
          </form>
        </div>
        <Link className="link-hover" href="/">Return to Home Page</Link>
      </div>
    </div>
  </div>
</div>
   </div>
  );
}
