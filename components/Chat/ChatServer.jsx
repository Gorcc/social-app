import ChatComponent from "./ChatComponent"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";



export default async function ChatServer({chatType,authUser}){


    const supabase = createServerComponentClient({ cookies });

    

      const { data: followList } = await supabase
      .from("follows")
      .select("followed")
      .eq("follower", authUser.id);
  
      for(let i=0;i<followList.length;i++){
          followList[i]=followList[i].followed;
      }
      
    

    const { data: followerInfos } = await supabase
    .from("user_profiles")
    .select()
    .in("id", followList);
    

    const { data: messageList } = await supabase
    .from("messages")
    .select()
  .or("sender_id.eq."+authUser.id+",receiver_id.eq."+authUser.id);



var previousChats = [];
    for (let i = 0; i < messageList.length; i++) {
      if (
        messageList[i].sender_id != authUser.id &&
        !previousChats.includes(messageList[i].sender_id)
      ) {
        previousChats.push(messageList[i].sender_id);
      } else if (
        messageList[i].receiver_id != authUser.id &&
        !previousChats.includes(messageList[i].receiver_id)
      ) {
        previousChats.push(messageList[i].receiver_id);
      }
    }

    const {data: previousProfiles} = await supabase.from("user_profiles").select().in("id", previousChats);


  


 

















    return (<ChatComponent chatType={chatType} userId={authUser.id} messages={messageList} previousProfiles={previousProfiles} followList={followerInfos}></ChatComponent>)
}