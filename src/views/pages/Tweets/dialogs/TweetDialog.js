import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { updateTweetsAsync } from "@/store/reducers/tweetSlice";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import Stack from "@mui/material/Stack";
import { MdClose } from "react-icons/md";

import { closeDialog } from "@/store/reducers/tweetSlice";

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <MdClose />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function TweetDialog() {
  const dispatch = useDispatch();
  const [form, setForm] = useState({ id: null, name: "", body: "" });
  const { open, data } = useSelector(({ tweet }) => tweet.dialog);
  const isSubmitting = useSelector(({ tweet }) => tweet.isSubmitting);

  useEffect(() => {
    if (data) {
      setForm((state) => ({
        ...state,
        id: data.id,
        name: data.name,
        body: data.body,
      }));
    }
  }, [data]);

  const canSubmit = () => {
    return form.name && form.body;
  };

  const handleChange = (ev) => {
    setForm({ ...form, [ev.target.name]: ev.target.value });
  };

  const handleClose = () => {
    dispatch(closeDialog());
  };

  const handleSave = () => {
    dispatch(updateTweetsAsync(form));
    handleClose();
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      fullWidth
      maxWidth="xs"
    >
      <BootstrapDialogTitle id="dialog-title" onClose={handleClose}>
        Update tweet
      </BootstrapDialogTitle>
      <DialogContent dividers>
        <Stack spacing={2}>
          <FormControl fullWidth>
            <FormLabel>Name</FormLabel>
            <OutlinedInput
              name="name"
              value={form.name}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl fullWidth>
            <FormLabel>Body</FormLabel>
            <OutlinedInput
              name="body"
              value={form.body}
              onChange={handleChange}
              rows={3}
              multiline
            />
          </FormControl>
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button
          autoFocus
          variant="outlined"
          onClick={handleSave}
          disabled={!canSubmit()}
          endIcon={isSubmitting && <CircularProgress size={16} />}
        >
          Save changes
        </Button>
      </DialogActions>
    </Dialog>
  );
}
