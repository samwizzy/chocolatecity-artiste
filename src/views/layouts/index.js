import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { HiOutlineUser, HiOutlineChatAlt2 } from "react-icons/hi";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  list: {
    flexGrow: 1,
  },
}));

function Layout({ children }) {
  const classes = useStyles();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [selectedPath, setSelectedPath] = React.useState(pathname);

  const handleListItemClick = (path) => {
    setSelectedPath(path);
    navigate(path, { replace: true });
  };

  return (
    <div className="w-full block md:flex">
      <div className="md:min-h-screen md:w-64 md:max-w-lg w-full bg-gray-700">
        <Box sx={{ width: "100%", maxWidth: "100%", color: "#ccc" }}>
          <List component="nav" aria-label="main nav" className={classes.list}>
            <ListItemButton
              selected={selectedPath === "/artistes"}
              onClick={(event) => handleListItemClick("/artistes")}
            >
              <ListItemIcon>
                <HiOutlineUser color="#ccc" />
              </ListItemIcon>
              <ListItemText primary="Artistes" />
            </ListItemButton>
            <ListItemButton
              selected={selectedPath === "/tweets"}
              onClick={(event) => handleListItemClick("/tweets")}
            >
              <ListItemIcon>
                <HiOutlineChatAlt2 color="#ccc" />
              </ListItemIcon>
              <ListItemText primary="Tweets" />
            </ListItemButton>
          </List>
          <Divider />
        </Box>
      </div>
      <div className="flex-1 w-full border">{children}</div>
    </div>
  );
}

export default Layout;
