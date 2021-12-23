import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import Skeleton from "@mui/material/Skeleton";

function ArtistesSkeleton() {
  return (
    <div>
      <List dense className="border-l-4 border-gray-400">
        {[...Array(10).keys()].map((a) => (
          <ListItem key={a.id} alignItems="flex-start">
            <ListItemAvatar>
              <Skeleton
                animation="wave"
                variant="circular"
                width={40}
                height={40}
              />
            </ListItemAvatar>
            <ListItemText
              primary={<Skeleton animation="wave" width="80%" />}
              secondary={
                <>
                  <Skeleton
                    animation="wave"
                    height={15}
                    width="60%"
                    style={{ marginBottom: 6 }}
                  />
                  <Skeleton
                    animation="wave"
                    variant="rectangular"
                    sx={{ height: 30, width: 100, borderRadius: 2 }}
                  />
                </>
              }
            />
            <ListItemSecondaryAction>
              <Skeleton
                animation="wave"
                variant="circular"
                width={40}
                height={40}
              />
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default ArtistesSkeleton;
