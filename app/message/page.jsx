import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import ChatServer from "@/components/Chat/ChatServer";
import LeftMenu from "@/components/LeftMenuComponent";


export default async function Index() {


  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: userInfo } = await supabase
    .from("user_profiles")
    .select()
    .eq("id", user.id);

  return (
    <div className=" message-page-cover flex justify-center align-center items-center">
      <LeftMenu userProfile={userInfo[0]} currentPage="messages"></LeftMenu>
      <ChatServer authUser = {user} chatType={"full-page"}></ChatServer>
    </div>
  );
}
