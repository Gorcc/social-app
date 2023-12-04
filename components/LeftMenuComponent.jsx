import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faMagnifyingGlass, faUser,faUserPen, faEnvelope } from "@fortawesome/free-solid-svg-icons";


import Link from "next/link";

import SearchComponent from "./SearchComponent";

import Image from "next/image";

import "@/app/styles/LeftMenu.scss";

export default function LeftMenu({ currentPage, userProfile }) {
  if (!userProfile) {
    return null;
  }
  return (
    <div className="left-menu">
      <div>
        <SearchComponent></SearchComponent>
        <Link href={"/home"}>
          <div
            className={
              currentPage == "home"
                ? "left-menu-item flex flex-row left-menu-item-selected"
                : "left-menu-item flex flex-row"
            }
          >
            <FontAwesomeIcon
              icon={faHouse}
              style={{ color: "var(--primary-green)" }}
            />
            <h1>Home Page</h1>
          </div>
        </Link>

        <Link href={"/search"}>
          <div
            className={
              currentPage == "search"
                ? "left-menu-item flex flex-row left-menu-item-selected"
                : "left-menu-item flex flex-row"
            }
          >
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              style={{ color: "var(--primary-green)" }}
            />
            <h1>Explore</h1>
          </div>
        </Link>

        <Link href={"/message"}>
          <div
            className={
              currentPage == "messages"
                ? "left-menu-item flex flex-row left-menu-item-selected"
                : "left-menu-item flex flex-row"
            }
          >
            <FontAwesomeIcon
              icon={faEnvelope}
              style={{ color: "var(--primary-green)" }}
            />
            <h1>Messages</h1>
          </div>
        </Link>

        <Link href={"/profile/" + userProfile.unique_name}>
          <div
            className={
              currentPage == "profile"
                ? "left-menu-item flex flex-row left-menu-item-selected"
                : "left-menu-item flex flex-row"
            }
          >
            <FontAwesomeIcon
              icon={faUser}
              style={{ color: "var(--primary-green)" }}
            />
            <h1>Profile</h1>
          </div>
        </Link>
        <Link href={"/createprofile"}>
          <div
            className={
              currentPage == "editprofile"
                ? "left-menu-item flex flex-row left-menu-item-selected"
                : "left-menu-item flex flex-row"
            }
          >
            <FontAwesomeIcon
              icon={faUserPen}
              style={{ color: "var(--primary-green)" }}
            />
            <h1>Edit Profile</h1>
          </div>
        </Link>
      </div>
      <div className="flex left-menu-avatar-div flex-row">
        <Image
          width={45}
          height={45}
          src={process.env.NEXT_PUBLIC_IMG_URL + userProfile.avatar_url}
          alt="Avatar"
          className="avatar image"
          style={{ height: 45, width: 45, borderRadius: 50 }}
        ></Image>
        <div>
          <h2 className="user-name">{userProfile.user_name}</h2>
          <h2 className="unique-name">@{userProfile.unique_name}</h2>
        </div>
      </div>
    </div>
  );
}
