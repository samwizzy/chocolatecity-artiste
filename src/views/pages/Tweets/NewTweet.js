import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTweetAsync } from "@/store/reducers/tweetSlice";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormHelperText from "@mui/material/FormHelperText";
import Stack from "@mui/material/Stack";
import { useForm, Controller } from "react-hook-form";

const defaultValues = {
  name: "",
  body: "",
};

function NewTweet() {
  const dispatch = useDispatch();
  const isSubmitting = useSelector(({ tweet }) => tweet.isSubmitting);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues });

  const onSubmit = (data) => {
    dispatch(addTweetAsync(data));
    reset(null);
  };

  return (
    <div className="w-full">
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2} mb={4}>
          <FormControl fullWidth>
            <FormLabel>Name</FormLabel>
            <Controller
              name="name"
              rules={{ required: "Name is required" }}
              control={control}
              render={({ field }) => <OutlinedInput {...field} />}
            />
            <FormHelperText>
              <span className="text-red-900">
                {errors.name && errors.name.message}
              </span>
            </FormHelperText>
          </FormControl>

          <FormControl fullWidth>
            <FormLabel>Body</FormLabel>
            <Controller
              name="body"
              rules={{ required: "Body is required" }}
              control={control}
              render={({ field }) => (
                <OutlinedInput {...field} multiline rows={3} />
              )}
            />
            <FormHelperText>
              <span className="text-red-900">
                {errors.body && errors.body.message}
              </span>
            </FormHelperText>
          </FormControl>
        </Stack>

        <Button
          type="submit"
          autoFocus
          variant="outlined"
          endIcon={isSubmitting && <CircularProgress size={16} />}
        >
          Save tweet
        </Button>
      </form>
    </div>
  );
}

export default NewTweet;
