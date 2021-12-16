import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getProjectsAsync,
  addProjectAsync,
  removeProjectAsync,
} from "@/store/reducers/portfolioSlice";
import { getIndustriesAsync } from "@/store/reducers/industrySlice";
import { getLanguagesAsync } from "@/store/reducers/languageSlice";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListSubheader from "@mui/material/ListSubheader";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import moment from "moment";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import { HiFolder, HiTrash } from "react-icons/hi";
import { useForm, Controller } from "react-hook-form";

const defaultValues = {
  title: "",
  slug: "",
  industry: "",
  framework: "",
  startDate: null,
  endDate: null,
};

const Project = () => {
  const dispatch = useDispatch();
  const { projects, loading } = useSelector(({ portfolio }) => portfolio);
  const { languages } = useSelector(({ language }) => language);
  const { industries } = useSelector(({ industry }) => industry);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues });

  useEffect(() => {
    dispatch(getProjectsAsync());
    dispatch(getIndustriesAsync());
    dispatch(getLanguagesAsync());
  }, [dispatch]);

  const resetForm = () => {
    reset(null, { keepValues: false });
  };

  const removePortfolio = (id) => {
    dispatch(removeProjectAsync(id));
  };

  const onSubmit = (data) => {
    dispatch(addProjectAsync(data));
    resetForm();
  };

  function makeItems(data) {
    const items = [];
    for (let lang of data) {
      items.push(<ListSubheader key={lang._id}>{lang.title}</ListSubheader>);
      for (let framework of lang.frameworks) {
        items.push(
          <MenuItem key={framework} value={framework}>
            {framework}
          </MenuItem>
        );
      }
    }
    return items;
  }

  console.log(projects, "projects");

  return (
    <div className=" max-w-6xl mx-auto p-8">
      <h2 className="text-4xl font-bold pb-8">My Projects</h2>

      <div className="grid grid-cols-12 gap-16">
        <div className="col-span-12 md:col-span-5">
          <div className="flex flex-col">
            <h2 className="text-2xl font-medium text-gray-800 pb-6">
              Add Project
            </h2>

            <form
              noValidate
              onSubmit={handleSubmit(onSubmit)}
              className="w-full"
            >
              <Stack spacing={1}>
                <FormControl variant="outlined" fullWidth>
                  <label className="mb-2">Project name</label>
                  <Controller
                    rules={{ required: true }}
                    render={({ field }) => <OutlinedInput {...field} />}
                    name="title"
                    control={control}
                  />
                  <FormHelperText>
                    {errors.title && "Project title is required"}
                  </FormHelperText>
                </FormControl>

                <FormControl variant="outlined" fullWidth>
                  <label className="mb-2">Slug</label>
                  <Controller
                    rules={{ required: true }}
                    render={({ field }) => <OutlinedInput {...field} />}
                    name="slug"
                    control={control}
                  />
                  <FormHelperText>
                    {errors.slug && "Slug is required"}
                  </FormHelperText>
                </FormControl>

                <FormControl variant="outlined" fullWidth>
                  <label className="mb-2">Industry</label>
                  <Controller
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Select {...field} labelId="select-industry">
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        {industries.map((ind) => (
                          <MenuItem key={ind._id} value={ind.title}>
                            {ind.title}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                    name="industry"
                    control={control}
                  />
                  <FormHelperText>
                    {errors.industry && "Industry is required"}
                  </FormHelperText>
                </FormControl>

                <FormControl variant="outlined" fullWidth>
                  <label className="mb-2">Language / Framework</label>
                  <Controller
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Select {...field} labelId="select-language-framework">
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>

                        {makeItems(languages)}
                      </Select>
                    )}
                    name="framework"
                    control={control}
                  />
                  <FormHelperText>
                    {errors.framework && "Language framework is required"}
                  </FormHelperText>
                </FormControl>

                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <Stack direction="row" spacing={2}>
                    <FormControl variant="outlined" fullWidth>
                      <label className="mb-2">Date started</label>
                      <Controller
                        rules={{ required: true }}
                        render={({ field }) => (
                          <DesktopDatePicker
                            {...field}
                            renderInput={(params) => (
                              <TextField {...params} fullWidth />
                            )}
                          />
                        )}
                        name="startDate"
                        control={control}
                      />

                      <FormHelperText>
                        {errors.startDate && "Start date is required"}
                      </FormHelperText>
                    </FormControl>
                    <FormControl variant="outlined" fullWidth>
                      <label className="mb-2">Date ended</label>
                      <Controller
                        rules={{ required: true }}
                        render={({ field }) => (
                          <DesktopDatePicker
                            {...field}
                            renderInput={(params) => (
                              <TextField {...params} fullWidth />
                            )}
                          />
                        )}
                        name="endDate"
                        control={control}
                      />

                      <FormHelperText>
                        {errors.endDate && "End date is required"}
                      </FormHelperText>
                    </FormControl>
                  </Stack>
                </LocalizationProvider>
              </Stack>

              <div className="mt-8">
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  startIcon={loading && <CircularProgress size={16} />}
                >
                  Save
                </Button>
              </div>
            </form>
          </div>
        </div>

        <div className="col-span-12 md:col-span-7">
          <h2 className="text-2xl font-medium text-gray-800 pb-6">
            Portfolio list
          </h2>
          <List dense className="border-l-4 border-green-200">
            {projects.map((p) => (
              <ListItem key={p._id}>
                <ListItemAvatar>
                  <Avatar>
                    <HiFolder />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={`${p.title} — ${p.slug}`}
                  secondary={
                    <>
                      <span>
                        {`${moment(p.startDate).format(
                          "DD MMM, yyyy"
                        )} — ${moment(p.endDate).format("DD MMM, yyyy")}`}
                      </span>
                      <br />
                      <span>{p.industry}</span>
                    </>
                  }
                />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => removePortfolio(p._id)}
                  >
                    <HiTrash />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </div>
      </div>
    </div>
  );
};

export default Project;
