import {
  AppBar,
  Toolbar,
  Typography,
  Button,
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

        <Button color="inherit">
          Point
        </Button>

        <Button color="inherit">
          Line
        </Button>

        <Button color="inherit">
          Polygon
        </Button>

        <Box sx={{ flexGrow: 1 }} />

        <UserMenu />

      </Toolbar>

    </AppBar>
  );
}

export default Navbar;