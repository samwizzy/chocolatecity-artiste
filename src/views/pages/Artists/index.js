import React, { useEffect, memo } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getArtistesAsync } from "@/store/reducers/artistSlice";
import { getAlbumsAsync } from "@/store/reducers/albumSlice";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import { HiOutlineEye } from "react-icons/hi";
import { FaRegUser } from "react-icons/fa";
import { RiDiscLine } from "react-icons/ri";
import { CircularProgress } from "@mui/material";
import _ from "lodash";

const ArtistesPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { artistes, loading: artistLoading } = useSelector(
    ({ artist }) => artist
  );
  const { albums, loading: albumLoading } = useSelector(({ album }) => album);

  useEffect(() => {
    dispatch(getArtistesAsync());
  }, [dispatch]);

  return (
    <div className="md:max-w-6xl w-full md:mr-auto p-8">
      <h2 className="text-4xl font-bold pb-8">Chocolate city artistes</h2>

      <div className="grid grid-cols-12 md:gap-x-16 gap-y-16">
        <div className="col-span-12 md:col-span-7">
          <h2 className="text-2xl font-medium text-gray-800 pb-6">
            Artistes list
          </h2>

          {artistLoading ? (
            <CircularProgress size={16} />
          ) : (
            <List dense className="border-l-4 border-gray-400">
              {artistes.map((a) => (
                <ListItem key={a.id} alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar>
                      <FaRegUser />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={`${a.name} — ${a.email}`}
                    secondary={
                      <>
                        <span>
                          {a.phone} — {a.website}
                        </span>
                        <br />
                        <span>{a.website}</span>
                      </>
                    }
                  />
                  <ListItemSecondaryAction className="space-x-2">
                    <Button
                      edge="start"
                      size="small"
                      aria-label="delete"
                      onClick={() => dispatch(getAlbumsAsync(a.id))}
                    >
                      view album
                    </Button>
                    <IconButton
                      edge="end"
                      aria-label="view"
                      onClick={() => navigate(`/artistes/${a.id}/albums`)}
                    >
                      <HiOutlineEye size={20} />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          )}
        </div>

        <div className="col-span-12 md:col-span-5">
          <h2 className="text-2xl font-medium text-gray-800 pb-6">
            {_.find(artistes, { id: albums?.[0]?.userId })?.name} Artiste's
            Album
          </h2>

          {albumLoading ? (
            <CircularProgress size={16} />
          ) : albums.length ? (
            <List dense className="border-l-4 border-green-600">
              {albums.map((a) => (
                <ListItem key={a.id}>
                  <ListItemAvatar>
                    <Avatar sx={{ backgroundColor: "primary.main" }}>
                      <RiDiscLine />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={`${a.title}`}
                    secondary={
                      <span>
                        owned by {_.find(artistes, { id: a.userId })?.name}
                      </span>
                    }
                  />
                </ListItem>
              ))}
            </List>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default memo(ArtistesPage);
