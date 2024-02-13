import { useContext } from "react";
import {
  Box,
  IconButton,
  useTheme
} from "@mui/material";
import {
  DarkModeOutlined,
  LightModeOutlined,
  Logout
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import {
  ColorModeContext,
  tokens
} from "theme";
import { removeUserSession } from "libs/Helpers";

const Header = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      removeUserSession();

      navigate("/sign-in");
    } catch (error) {
      //
    }
  };

  return (
    <Box display="flex" justifyContent="end" p={2} borderBottom="1px solid grey">
      <Box display="flex">
        {/* <IconButton onClick={colorMode.toggleColorMode} size="large">
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlined fontSize="large" />
          ) : (
            <LightModeOutlined fontSize="large" />
          )}
        </IconButton> */}
        <IconButton size="large" onClick={handleLogout}>
          <Logout fontSize="large" />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Header;
