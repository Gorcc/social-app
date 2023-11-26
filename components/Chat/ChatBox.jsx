"use client";
import { useState } from "react";

import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faShare } from "@fortawesome/free-solid-svg-icons";

export default function ChatBox({ target, targetDefault, messageList,sendMessageServer }) {
  const [messageText, setMessageText] = useState();
  var filteredMessages = messageList.filter(
    (message) =>
      message.receiver_id == target.id || message.sender_id == target.id
  );

  function sendMessage() {
   
    sendMessageServer(messageText, target.id)
    setMessageText("");

  }
  return (
    <div>
      <div className="flex flex-row chat-top-div">
        <FontAwesomeIcon
        className="chat-back-icon"
          onClick={targetDefault}
          icon={faArrowLeft}
          size="xl"
          
        />
        <div>
          <h1 className="messages-div-h1">{target.user_name}</h1>
          <h2 className="messages-div-h2">{"@" + target.unique_name}</h2>
        </div>
      </div>
      
      <div className="messages-text-container">
      <div className="messages-avatar-div">
        <Image
          width={70}
          height={70}
          src={process.env.NEXT_PUBLIC_IMG_URL + target.avatar_url}
          alt="Avatar"
          className="avatar avatar-link image"
          style={{ height: 70, width: 70, borderRadius: 50 }}
        ></Image>
        <h1 className="messages-div-h1">{target.user_name}</h1>
        <h2 className="messages-div-h2">{"@" + target.unique_name}</h2>
        <p className="messages-div-p">{target.user_bio}</p>
      </div>
        {filteredMessages.map((message) => (
          <div className={
            message.sender_id == target.id
              ? "message-box-cover message-box-cover-received"
              : "message-box-cover message-box-cover-sent"
          }>
            <div
              className={
                message.sender_id == target.id
                  ? "message-box message-box-received"
                  : "message-box message-box-sent"
              }
            >
              <h1>{message.message_text}</h1>
            </div>
          </div>
        ))}{" "}
      </div>
      <div className="send-message-div">
        <input
          type="text"
          value={messageText}
          placeholder="Start a new message"
          onChange={(event) => setMessageText(event.target.value)}
          className="message-input"
        />
        <button
          className="message-send-btn"
          disabled={!messageText}
          onClick={sendMessage}
          type="submit"
        >
          <FontAwesomeIcon
            icon={faShare}
            style={{ color: "var(--primary-green)" }}
          />
        </button>
      </div>
    </div>
  );
}
