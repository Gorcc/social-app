import ChatComponent from "./ChatComponent"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";



export default async function ChatServer({chatType}){


    const supabase = createServerComponentClient({ cookies });

    const {
        data: { user },
      } = await supabase.auth.getUser();

      const { data: followList } = await supabase
      .from("follows")
      .select("followed")
      .eq("follower", user.id);
  
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
  .or("sender_id.eq."+user.id+",receiver_id.eq."+user.id);



var previousChats = [];
    for (let i = 0; i < messageList.length; i++) {
      if (
        messageList[i].sender_id != user.id &&
        !previousChats.includes(messageList[i].sender_id)
      ) {
        previousChats.push(messageList[i].sender_id);
      } else if (
        messageList[i].receiver_id != user.id &&
        !previousChats.includes(messageList[i].receiver_id)
      ) {
        previousChats.push(messageList[i].receiver_id);
      }
    }

    const {data: previousProfiles} = await supabase.from("user_profiles").select().in("id", previousChats);


  


 

















    return (<ChatComponent chatType={chatType} userId={user.id} messages={messageList} previousProfiles={previousProfiles} followList={followerInfos}></ChatComponent>)
}