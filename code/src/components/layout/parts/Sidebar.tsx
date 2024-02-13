import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, SvgIcon, SvgIconProps, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../../theme";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { Domain, MenuOpen, Menu as MenuIcon } from "@mui/icons-material";

type ItemProps = {
  title: string;
  to: string;
  icon: React.ReactElement<SvgIconProps>;
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
}

const Item = ({ title, to, icon, selected, setSelected }: ItemProps) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === to}
      style={{
        // color: colors.grey[100],
      }}
      onClick={() => setSelected(to)}
      icon={icon}
    >
      <Typography fontSize={18} fontWeight={600}>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState(window.location.pathname);

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `#233044 !important`,
          color: "#f2f0f0"
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "var(--color-green) !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            // onClick={() => setIsCollapsed(!isCollapsed)}
            // icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              // color: colors.grey[100],
            }}
          >
            {
              !isCollapsed &&
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                ml="15px"
              >
                <MenuOpen fontSize="large" onClick={() => setIsCollapsed(!isCollapsed)} />
              </Box>
            }
            {
              isCollapsed &&
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                ml="15px"
              >
                <MenuIcon fontSize="large" onClick={() => setIsCollapsed(!isCollapsed)} />
              </Box>
            }
          </MenuItem>

          <Box paddingLeft={isCollapsed ? undefined : "5%"}>
            <Item
              title="Services"
              to="/service/list"
              icon={<PeopleOutlinedIcon fontSize="large" />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Domains"
              to="/domain/list"
              icon={<PersonOutlinedIcon fontSize="large" />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Create Domain"
              to="/domain/create"
              icon={<PersonOutlinedIcon fontSize="large" />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
