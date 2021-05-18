import React, { useContext, useState } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import "../entry.css";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import * as yup from "yup";
import { useFormik } from "formik";
import { AuthContext } from "../../../Context/context";
import { login } from "../../../services/authenticationService";
import { Alert, AlertTitle } from "@material-ui/lab";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles(() => ({
  login: {
    display: "block",
    marginBottom: "20px",
  },
  error: {
    marginBottom: "20px",
  },
  loader: {
    color: "white",
  },
  submitButton: {
    height: "50px",
  },
}));

const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup.string("Enter your password").required("Password is required"),
});

export function Login() {
  const classes = useStyles();
  const { storeAuthInfo } = useContext(AuthContext);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (loginData) => {
      setLoading(true);
      const response = await login(loginData).catch((err) => {
        setLoading(false);
        setError(err);
      });
      if (response) storeAuthInfo(response);
    },
  });
  return (
    <div className="entryContainer">
      <div className="loginContainer">
        <form className="loginForm" onSubmit={formik.handleSubmit}>
          {error && (
            <Alert severity="error" className={classes.error}>
              <AlertTitle>Login Failed</AlertTitle>
              {error.message || "Please try again later"}
            </Alert>
          )}

          <TextField
            variant="outlined"
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
          <TextField
            variant="outlined"
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
          <Button
            color="primary"
            variant="contained"
            fullWidth
            className={classes.submitButton}
            type = "submit"
          >
            {loading ? (
              <CircularProgress className={classes.loader} />
            ) : (
              "Login"
            )}
          </Button>
        </form>
        <div>
          <Link href="signup">Don't have an account? Sign Up</Link>
        </div>
      </div>
    </div>
  );
}
