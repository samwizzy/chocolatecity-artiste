import React from "react";
import { useNavigate } from "react-router-dom";
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
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (event, index, path) => {
    setSelectedIndex(index);
    navigate(path, { replace: true });
  };

  return (
    <div className="w-full block md:flex">
      <div className="md:min-h-screen md:w-64 md:max-w-lg w-full bg-gray-700">
        <Box sx={{ width: "100%", maxWidth: "100%", color: "#ccc" }}>
          <List component="nav" aria-label="main nav" className={classes.list}>
            <ListItemButton
              selected={selectedIndex === 0}
              onClick={(event) => handleListItemClick(event, 0, "artistes")}
            >
              <ListItemIcon>
                <HiOutlineUser color="#ccc" />
              </ListItemIcon>
              <ListItemText primary="Artistes" />
            </ListItemButton>
            <ListItemButton
              selected={selectedIndex === 1}
              onClick={(event) => handleListItemClick(event, 1, "tweets")}
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
