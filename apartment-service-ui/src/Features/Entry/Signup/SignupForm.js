import React, { useContext, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import "../entry.css";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import { USER_ROLES } from "../../../constants/userRoleConstants";
import * as yup from "yup";
import { useFormik } from "formik";
import { addUser, editUser, signup } from "../../../services/userServices";
import { useMutation } from "react-query";
import { Alert, AlertTitle } from "@material-ui/lab";
import CircularProgress from "@material-ui/core/CircularProgress";
import { AuthContext } from "../../../Context/context";

const useStyles = makeStyles(() => ({
  login: {
    display: "block",
    marginBottom: "20px",
    minHeight: "56px",
  },
  error: {
    marginBottom: "20px",
  },
  loader: {
    color: "white",
  },
}));

const validationSchema = yup.object({
  isCreateAction: yup.boolean(),
  firstName: yup
    .string("Enter your first name")
    .required("First name is required"),
  lastName: yup
    .string("Enter your last name")
    .required("Last name is required"),
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .when("isCreateAction", {
      is: true,
      then: yup.string().required("Password is required"),
    }),
});

export function SignupForm({
  adminUser,
  userToUpdate,
  onSuccess,
  isUpsertFlow = false,
}) {
  const classes = useStyles();
  const { storeAuthInfo } = useContext(AuthContext);

  const { isLoading, isSuccess, isError, mutate, data, error } = useMutation(
    (newUser) => {
      if (userToUpdate?.firstName) {
        newUser._id = userToUpdate._id;
        return editUser(newUser);
      } else if (isUpsertFlow) {
        return addUser(newUser);
      }
      return signup(newUser);
    }
  );

  const formik = useFormik({
    initialValues: {
      isCreateAction: !userToUpdate,
      firstName: userToUpdate?.firstName || "",
      lastName: userToUpdate?.lastName || "",
      role: userToUpdate?.role || USER_ROLES.CLIENT,
      email: userToUpdate?.email || "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      mutate(values);
    },
  });

  useEffect(() => {
    if (isSuccess) isUpsertFlow ? onSuccess() : storeAuthInfo(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  return (
    <form className="loginForm" onSubmit={formik.handleSubmit}>
      {isError && (
        <Alert severity="error" className={classes.error}>
          <AlertTitle>Signup Failed</AlertTitle>
          {error.message || "Please try again later"}
        </Alert>
      )}

      <div style={{ display: "flex" }}>
        <TextField
          variant="outlined"
          placeholder="First Name"
          style={{ marginRight: "5px" }}
          fullWidth
          id="firstName"
          name="firstName"
          label="First Name"
          type="text"
          className={classes.login}
          value={formik.values.firstName}
          onChange={formik.handleChange}
          error={formik.touched.firstName && Boolean(formik.errors.firstName)}
          helperText={formik.touched.firstName && formik.errors.firstName}
        />
        <TextField
          variant="outlined"
          placeholder="Last Name"
          style={{ marginRight: "5px" }}
          fullWidth
          id="lastName"
          name="lastName"
          label="Last Name"
          type="text"
          className={classes.login}
          value={formik.values.lastName}
          onChange={formik.handleChange}
          error={formik.touched.lastName && Boolean(formik.errors.lastName)}
          helperText={formik.touched.lastName && formik.errors.lastName}
        />
      </div>

      <TextField
        variant="outlined"
        placeholder="Last Name"
        style={{ marginRight: "5px" }}
        fullWidth
        id="email"
        name="email"
        label="Email"
        type="text"
        className={classes.login}
        value={formik.values.email}
        onChange={formik.handleChange}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
      />
      {!userToUpdate && (
        <TextField
          variant="outlined"
          placeholder="Password"
          style={{ marginRight: "5px" }}
          fullWidth
          type="password"
          id="password"
          name="password"
          label="Password"
          className={classes.login}
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
      )}
      {adminUser && (
        <TextField
          id="role"
          select
          fullWidth
          variant="outlined"
          label="Role"
          value={formik.values.role}
          onChange={formik.handleChange("role")}
          className={`${classes.login}`}
        >
          <MenuItem value={USER_ROLES.CLIENT}>Client</MenuItem>
          <MenuItem value={USER_ROLES.REALTOR}>Realtor</MenuItem>
          <MenuItem value={USER_ROLES.ADMIN}>Admin</MenuItem>
        </TextField>
      )}
      <Button color="primary" variant="contained" fullWidth type="submit">
        {isLoading ? <CircularProgress className={classes.loader} /> : "Submit"}
      </Button>
    </form>
  );
}
