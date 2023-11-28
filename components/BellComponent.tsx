"use client"
import * as React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NotificationComponent from "./NotificationComponent";
import Comment from "postcss/lib/comment";
import { User } from "@supabase/supabase-js";


export default function BellComponent({ userId, comment, userObj }: { userId: string; comment: Comment; userObj: User }) {
  
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [notification, setNotification] = React.useState(true);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div className="bell-container">
      <div className={notification ? "new-noti" : ""}></div>
      <Button
        className="bell-btn"
        aria-describedby={id}
        onClick={handleClick}
      >
        <FontAwesomeIcon className="bell-icon" icon={faBell} />
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        style={{ position: "absolute", zIndex: 9999 }}
        disableScrollLock
      >
        <Typography className="noti" sx={{ p: 2 }}>
          <div>
            <NotificationComponent
              userId={userId}
              comment={comment}
              userObj={userObj}
            />
          </div>
        </Typography>
      </Popover>
    </div>
  );
}
