import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getTweetsAsync,
  deleteTweetAsync,
  openDialog,
} from "@/store/reducers/tweetSlice";
import { makeStyles } from "@mui/styles";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import IconButton from "@mui/material/IconButton";
import Pagination from "@mui/material/Pagination";
import { HiOutlinePencil, HiOutlineTrash } from "react-icons/hi";
import { FaRegUser } from "react-icons/fa";
import { CircularProgress } from "@mui/material";
import TweetDialog from "./dialogs/TweetDialog";
import NewTweet from "./NewTweet";

const useStyles = makeStyles((theme) => ({
  avatar: {
    "&.MuiAvatar-root": {
      backgroundColor: theme.palette.primary.main,
    },
  },
}));

const TweetsPage = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const classes = useStyles();
  const { tweets, loading } = useSelector(({ tweet }) => tweet);

  const handlePageChange = (event, value) => {
    console.log(value, "page");
    setPage(value);
  };

  useEffect(() => {
    dispatch(getTweetsAsync(page));
  }, [dispatch, page]);

  console.log(tweets, "tweets");

  return (
    <div className="max-w-6xl mr-auto p-8">
      <h2 className="text-4xl font-bold pb-8">Tweets</h2>

      <div className="grid grid-cols-12 gap-16">
        <div className="col-span-12 md:col-span-7">
          <h2 className="text-2xl font-medium text-gray-800 pb-6">
            Your tweets
          </h2>

          {loading ? (
            <CircularProgress />
          ) : (
            <List dense className="border-l-4 border-gray-400">
              {tweets.map((a) => (
                <ListItem key={a.id} alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar className={classes.avatar}>
                      <FaRegUser size="24" />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={a.name}
                    secondary={
                      <>
                        <span>{a.body}</span>
                        <span className="block space-x-6">
                          <IconButton
                            edge="end"
                            aria-label="edit"
                            onClick={() => dispatch(openDialog(a))}
                          >
                            <HiOutlinePencil size={16} />
                          </IconButton>
                          <IconButton
                            edge="end"
                            aria-label="delete"
                            onClick={() => dispatch(deleteTweetAsync(a.id))}
                          >
                            <HiOutlineTrash size={16} />
                          </IconButton>
                        </span>
                      </>
                    }
                  />
                </ListItem>
              ))}
            </List>
          )}
          <Box mt={4}>
            <Pagination
              count={10}
              page={page}
              onChange={handlePageChange}
              variant="outlined"
              shape="rounded"
            />
          </Box>
        </div>

        <div className="col-span-12 md:col-span-5">
          <h2 className="text-2xl font-medium text-gray-800 pb-6">
            Create a new <span className="text-gray-500">tweet</span>
          </h2>

          <NewTweet />
        </div>
      </div>

      <TweetDialog />
    </div>
  );
};

export default TweetsPage;
