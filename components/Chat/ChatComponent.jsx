"use client";
import { Dialog } from "@radix-ui/themes";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import "../../app/styles/chat.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { useState, useEffect } from "react";
import ChatBox from "@/components/Chat/ChatBox";

export default function ChatComponent({
  followList,
  messages,
  userId,
  previousProfiles,
  chatType,
}) {
  const [messageList, setMessageList] = useState(messages);
  const [messageAnimation, setMessageAnimation] = useState(false);
  const supabase = createClientComponentClient();
  const [targetChat, setTargetChat] = useState("no-target");
  function selectChat(target) {
    setTargetChat(target);
  }

  const messageChannel = supabase
    .channel("room1")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "messages" },
      (payload) => {
        setMessageList((oldArray) => [...oldArray, payload.new]);
      }
    )
    .subscribe();

  function targetDefault() {
    setTargetChat("no-target");
  }

  async function sendMessage(message, targetId) {
    const { data: messages } = await supabase.from("messages").insert({
      receiver_id: targetId,
      sender_id: userId,
      message_text: message,
    });
  }

  if (chatType == "bottom-right") {
    return (
      <div
        className={
          messageAnimation ? "chat-container" : "chat-container low-width"
        }
      >
        {targetChat == "no-target" ? (
          <div>
            <div
              className="flex flex-row chat-container-top"
              onClick={() => setMessageAnimation((prevState) => !prevState)}
            >
              <h1 className="chat-container-h1">Messages</h1>

              <Dialog.Root>
                <Dialog.Trigger>
                  <FontAwesomeIcon
                    className="new-message-icon"
                    icon={faSquarePlus}
                    size="xl"
                  />
                </Dialog.Trigger>

                <Dialog.Content style={{ maxWidth: 450 }}>
                  <Dialog.Title>New Message</Dialog.Title>
                  {followList.map((user) => (
                    <Dialog.Description onClick={() => selectChat(user)}>
                      <div className="flex flex-row popup-chat-user-div">
                        <Image
                          width={55}
                          height={55}
                          src={
                            process.env.NEXT_PUBLIC_IMG_URL + user?.avatar_url
                          }
                          alt="Avatar"
                          className="avatar avatar-link image"
                          style={{ height: 55, width: 55, borderRadius: 50 }}
                        ></Image>
                        <div>
                          <h1 className="popup-chat-h1">{user.user_name}</h1>
                          <h2 className="popup-chat-h2">{user.unique_name}</h2>
                        </div>
                      </div>
                    </Dialog.Description>
                  ))}

                  <div className="flex flex-col">
                    <Dialog.Close>
                      <button className="send-btn">Cancel</button>
                    </Dialog.Close>
                  </div>
                </Dialog.Content>
              </Dialog.Root>
            </div>

            {previousProfiles?.map((user) => (
              <div
                onClick={() => selectChat(user)}
                className="flex flex-row previous-chat-container"
              >
                <Image
                  width={60}
                  height={60}
                  src={process.env.NEXT_PUBLIC_IMG_URL + user.avatar_url}
                  alt="Avatar"
                  className="avatar avatar-link image"
                  style={{ height: 60, width: 60, borderRadius: 50 }}
                ></Image>
                <div className="previous-chat-text">
                  <h1 className="previous-chat-h1">{user.user_name}</h1>
                  <h2 className="previous-chat-h2">{user.unique_name}</h2>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <ChatBox
          chatType={chatType}

            target={targetChat}
            targetDefault={targetDefault}
            messageList={messageList}
            sendMessageServer={sendMessage}
          ></ChatBox>
        )}
      </div>
    );
  } else if (chatType == "full-page") {
    return (
      <div className="chat-page-container">
        <div className="message-page-left">
          <div className="flex flex-row chat-container-top">
            <h1 className="chat-container-h1">Messages</h1>

            <Dialog.Root>
              <Dialog.Trigger>
                <FontAwesomeIcon
                  className="new-message-icon"
                  icon={faSquarePlus}
                  size="xl"
                />
              </Dialog.Trigger>

              <Dialog.Content style={{ maxWidth: 450 }}>
                <Dialog.Title>New Message</Dialog.Title>
                {followList.map((user) => (
                  <Dialog.Description onClick={() => selectChat(user)}>
                    <div className="flex flex-row popup-chat-user-div">
                      <Image
                        width={55}
                        height={55}
                        src={process.env.NEXT_PUBLIC_IMG_URL + user?.avatar_url}
                        alt="Avatar"
                        className="avatar avatar-link image"
                        style={{ height: 55, width: 55, borderRadius: 50 }}
                      ></Image>
                      <div>
                        <h1 className="popup-chat-h1">{user.user_name}</h1>
                        <h2 className="popup-chat-h2">{user.unique_name}</h2>
                      </div>
                    </div>
                  </Dialog.Description>
                ))}

                <div className="flex flex-col">
                  <Dialog.Close>
                    <button className="send-btn">Cancel</button>
                  </Dialog.Close>
                </div>
              </Dialog.Content>
            </Dialog.Root>
          </div>

          {previousProfiles?.map((user) => (
            <div
              onClick={() => selectChat(user)}
              className={targetChat==user?"flex flex-row previous-chat-container selected-previous-chat":"flex flex-row previous-chat-container"}

            >
              <Image
                width={60}
                height={60}
                src={process.env.NEXT_PUBLIC_IMG_URL + user.avatar_url}
                alt="Avatar"
                className="avatar avatar-link image"
                style={{ height: 60, width: 60, borderRadius: 50 }}
              ></Image>
              <div className="previous-chat-text">
                <h1 className="previous-chat-h1">{user.user_name}</h1>
                <h2 className="previous-chat-h2">{user.unique_name}</h2>
              </div>
            </div>
          ))}
        </div>
        <div className={targetChat =="no-target" ? "message-page-right relative flex items-center justify-center":"message-page-right relative"}>
          {targetChat != "no-target" ? (
            <ChatBox
              target={targetChat}
              targetDefault={targetDefault}
              messageList={messageList}
              sendMessageServer={sendMessage}
              chatType={chatType}
            ></ChatBox>
          ) : (
            <div className="no-target-chat-div">
              <h1 className="no-target-chat-h1">Select a message</h1>
              <p className="no-target-chat-p">Choose from your existing conversations, start a new one, or just keep swimming.</p>
              <Dialog.Root>
              <Dialog.Trigger>
                <button className="no-target-chat-button">New message</button>
              </Dialog.Trigger>

              <Dialog.Content style={{ maxWidth: 450 }}>
                <Dialog.Title>New Message</Dialog.Title>
                {followList.map((user) => (
                  <Dialog.Description onClick={() => selectChat(user)}>
                    <div className="flex flex-row popup-chat-user-div">
                      <Image
                        width={55}
                        height={55}
                        src={process.env.NEXT_PUBLIC_IMG_URL + user?.avatar_url}
                        alt="Avatar"
                        className="avatar avatar-link image"
                        style={{ height: 55, width: 55, borderRadius: 50 }}
                      ></Image>
                      <div>
                        <h1 className="popup-chat-h1">{user.user_name}</h1>
                        <h2 className="popup-chat-h2">{user.unique_name}</h2>
                      </div>
                    </div>
                  </Dialog.Description>
                ))}

                <div className="flex flex-col">
                  <Dialog.Close>
                    <button className="send-btn">Cancel</button>
                  </Dialog.Close>
                </div>
              </Dialog.Content>
            </Dialog.Root>
            </div>
          )}
        </div>
      </div>
    );
  }
}
