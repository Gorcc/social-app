import Link from "next/link";
import LogoutButton from "../components/LogoutButton";
import Image from "next/image";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
export const dynamic = "force-dynamic";

export default async function HeaderComponent() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();



 const { data, error } = await supabase
  .from("user-profiles")
  .select()
  .eq("id", user?.id);

  return (
    <nav className="w-full global-nav flex justify-center border-b border-b-foreground/10 h-16">
      <div className="header-nav w-full max-w-4xl flex justify-between items-center p-3 text-sm text-foreground">
        <Link href="/">
          <strong>Social App by Sadbois</strong>
        </Link>
        <div />
        <div>
          {user ? (
            <div className="header-gap flex items-center gap-4">
              {data.length!=0 && <div className="flex flex-row items-center"><h1>Hey, {data.length!=0? data[0].user_name : ""}!</h1> <Link href={data.length!=0? "/profile/" + data[0].id : ""}>
                <Image
                  width={45}
                  height={45}
                  src={
                    data.length!=0
                      ? process.env.NEXT_PUBLIC_IMG_URL + data[0].avatar_url
                      : ""
                  }
                  alt="Avatar"
                  className="avatar image"
                  style={{ height: 45, width: 45, borderRadius: 50 }}
                ></Image>
              </Link> </div>}
              

              
              <Link
                href="/createprofile"
                className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
              >
                Edit Profile
              </Link>
              <LogoutButton />
            </div>
          ) : (
            <Link
              href="/login"
              className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
