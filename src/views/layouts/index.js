import React from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { HiOutlineInboxIn, HiOutlineMailOpen } from "react-icons/hi";

function Layout({ children }) {
  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (event, index, path) => {
    setSelectedIndex(index);
    navigate(path, { replace: true });
  };

  return (
    <div className="w-full flex">
      <div className="min-h-screen w-64 max-w-lg bg-gray-700">
        <Box sx={{ width: "100%", maxWidth: 360, color: "#ccc" }}>
          <List component="nav" aria-label="main nav">
            <ListItemButton
              selected={selectedIndex === 0}
              onClick={(event) => handleListItemClick(event, 0, "artistes")}
            >
              <ListItemIcon>
                <HiOutlineInboxIn />
              </ListItemIcon>
              <ListItemText primary="Artistes" />
            </ListItemButton>
            <ListItemButton
              selected={selectedIndex === 1}
              onClick={(event) => handleListItemClick(event, 1, "tweets")}
            >
              <ListItemIcon>
                <HiOutlineMailOpen />
              </ListItemIcon>
              <ListItemText primary="Tweets" />
            </ListItemButton>
          </List>
          <Divider />
        </Box>
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
}

export default Layout;
