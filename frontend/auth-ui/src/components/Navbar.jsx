import {
  AppBar,
  Toolbar,
  Typography,

  Box,
} from "@mui/material";

import UserMenu from "./UserMenu";

function Navbar() {
  return (
    <AppBar position="static">

      <Toolbar>

        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            mr: 5
          }}
        >
          🗺️ GeoDraw
        </Typography>

        <Box sx={{ flexGrow: 1 }} />

        <Box sx={{ flexGrow: 1 }} />

        <UserMenu />

      </Toolbar>

    </AppBar>
  );
}

export default Navbar;