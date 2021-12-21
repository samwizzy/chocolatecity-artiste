import React, { useEffect, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getArtistesAsync } from "@/store/reducers/artistSlice";
import {
  getAlbumsAsync,
  getAlbumPhotosAsync,
} from "@/store/reducers/albumSlice";
import { makeStyles } from "@mui/styles";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { RiDiscLine } from "react-icons/ri";
import { CircularProgress } from "@mui/material";
import _ from "lodash";

const useStyles = makeStyles((theme) => ({
  avatar: {
    "&.MuiAvatar-root": {
      backgroundColor: theme.palette.primary.main,
    },
  },
}));

const AlbumsPage = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const params = useParams();
  const { artistes } = useSelector(({ artist }) => artist);
  const { albums, photos, loading, photoLoading } = useSelector(
    ({ album }) => album
  );

  useEffect(() => {
    dispatch(getArtistesAsync());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAlbumsAsync(params.userId));
  }, [dispatch, params]);

  console.log("albums mounted");

  return (
    <div className="md:max-w-6xl w-full mr-auto p-8">
      <h2 className="text-4xl font-bold pb-8">Chocolate city artistes</h2>

      <div className="grid grid-cols-12 md:gap-x-16 gap-y-16">
        <div className="col-span-12 md:col-span-7">
          <h2 className="text-2xl font-medium text-gray-800 pb-6">
            Albums list
          </h2>

          {loading ? (
            <CircularProgress size={16} />
          ) : (
            <List dense className="border-l-4 border-gray-400">
              {albums.map((a) => (
                <ListItem
                  key={a.id}
                  onClick={() => dispatch(getAlbumPhotosAsync(a.id))}
                >
                  <ListItemButton>
                    <ListItemAvatar>
                      <Avatar className={classes.avatar}>
                        <RiDiscLine />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={a.title}
                      secondary={
                        <span>
                          owned by {_.find(artistes, { id: a.userId })?.name}
                        </span>
                      }
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          )}
        </div>

        <div className="col-span-12 md:col-span-5">
          <h2 className="text-2xl font-medium text-gray-800 pb-6">
            Album's Photos
          </h2>

          {photoLoading ? (
            <CircularProgress size={16} />
          ) : (
            <ImageList
              sx={{ width: 500, height: 450 }}
              cols={3}
              rowHeight={164}
            >
              {photos.map((item) => (
                <ImageListItem key={item.url}>
                  <img
                    src={`${item.url}?w=164&h=164&fit=crop&auto=format`}
                    srcSet={`${item.url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                    alt={item.title}
                    loading="lazy"
                  />
                </ImageListItem>
              ))}
            </ImageList>
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(AlbumsPage);
