import { Box, IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import { Logout } from "@mui/icons-material";
import { removeUserSession } from "libs/Helpers";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      removeUserSession();

      navigate("/login");
    } catch (error) {
      //
    }
  };

  return (
    <Box display="flex" justifyContent="end" p={2} borderBottom="1px solid grey">
      <Box display="flex">
        {/* <IconButton onClick={colorMode.toggleColorMode} size="large">
            {theme.palette.mode === "dark" ? (
              <DarkModeOutlinedIcon size="large" />
            ) : (
              <LightModeOutlinedIcon size="large" />
            )}
          </IconButton> */}
        <IconButton size="large">
          <Logout size="large" onClick={handleLogout} />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Header;
