import Link from "next/link";
import LogoutButton from "../components/LogoutButton";
import Image from "next/image";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import BellComponent from "./BellComponent";
export const dynamic = "force-dynamic";
import "@/app/styles/header.scss";
export default async function HeaderComponent() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("user_profiles")
    .select()
    .eq("id", user?.id);

  const { data: post } = await supabase
    .from("posts")
    .select("post_id")
    .eq("user_id", data?.id);

  const { data: comment } = await supabase
    .from("post_comments")
    .select()
    .eq("postUser_id", user?.id)
    .neq("commentor_id", user?.id);

  const commentorIds = comment
    ? comment.map((comment) => comment.commentor_id)
    : [];

  const { data: userProfiles } = await supabase
    .from("user_profiles")
    .select()
    .in("id", commentorIds);

  return (
    <nav className="w-full global-nav flex justify-center border-b border-b-foreground/10 h-16 z-50">
      <div className="header-nav w-full max-w-4xl flex justify-between items-center p-3 text-sm text-foreground z-50 ">
        <Link className="link-hover" href="/" shallow>
          <strong style={{ color: "var(--primary-green)" }}>
            Social App by Sadbois
          </strong>
        </Link>
        <div />
        <div>
          {user ? (
            <div className="header-gap flex items-center gap-4">
              {data.length != 0 && (
                <div className="flex flex-row items-center">
                  <h1>
                    Hey,{" "}
                    <span className="font-bold">
                      {data.length != 0 ? data[0].user_name : ""}
                    </span>
                    !
                  </h1>{" "}
                  <Link shallow
                    className="link-hover"
                    href={
                      data.length != 0 ? "/profile/" + data[0].unique_name : ""
                    }
                   
                  >
                    <Image
                      width={45}
                      height={45}
                      src={
                        data.length != 0
                          ? process.env.NEXT_PUBLIC_IMG_URL + data[0].avatar_url
                          : ""
                      }
                      alt="Avatar"
                      className="avatar image"
                      style={{ height: 45, width: 45, borderRadius: 50 }}
                    ></Image>
                  </Link>{" "}
                </div>
              )}

              <BellComponent
                userObj={userProfiles}
                userId={data[0] && data[0].id}
                post={post}
                comment={comment.reverse()}
              />
              <Link
                href="/createprofile"
                className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover link-hover"
                shallow
              >
                Edit Profile
              </Link>
              <LogoutButton />
            </div>
          ) : (
            <Link
              href="/login"
              className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover link-hover"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
