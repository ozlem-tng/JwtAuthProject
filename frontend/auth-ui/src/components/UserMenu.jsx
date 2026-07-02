import {
  Avatar,
  Menu,
  MenuItem,
  IconButton,
  Typography
} from "@mui/material";

import { useState } from "react";

function UserMenu() {

  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  // localStorage'dan kullanıcı bilgilerini al
  const user = JSON.parse(localStorage.getItem("user"));

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "/login";
  };

  return (
    <>
      <IconButton
        color="inherit"
        onClick={handleOpen}
      >
        <Avatar>
          {user?.fullName
            ? user.fullName.charAt(0).toUpperCase()
            : "?"}
        </Avatar>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <Typography
          sx={{
            px: 2,
            py: 1,
            fontWeight: "bold"
          }}
        >
          {user?.fullName || "Kullanıcı"}
        </Typography>

        <Typography
          sx={{
            px: 2,
            pb: 1,
            fontSize: 13
          }}
        >
          {user?.email || ""}
        </Typography>

        <MenuItem onClick={handleClose}>
          Profil
        </MenuItem>

        <MenuItem onClick={handleClose}>
          Çizimlerim
        </MenuItem>

        <MenuItem onClick={handleLogout}>
          Çıkış Yap
        </MenuItem>
      </Menu>
    </>
  );
}

export default UserMenu;