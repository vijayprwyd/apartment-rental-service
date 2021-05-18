import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import "./upsertApartment.css";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import { Alert, AlertTitle } from "@material-ui/lab";
import { useMutation } from "react-query";
import CircularProgress from "@material-ui/core/CircularProgress";
import { addApartment, editApartment } from '../../../../services/apartmentServices';

const validationSchema = yup.object({
  name: yup.string("Enter your email").required("Apartment name is required"),
  description: yup
    .string("Enter apartment description")
    .required("Apartment description is required"),
  floorAreaSize: yup
    .number("Enter floor area size")
    .required("Floor area size is required"),
  noOfRooms: yup
    .number("Enter no of rooms")
    .required("No of rooms is required"),
  pricePerMonth: yup
    .number("Enter price per month")
    .required("Price per month is required"),
  realtorEmail: yup
    .string()
    .email("Enter a valid email")
    .required("Email id is required"),
  latitude: yup.number("Enter latitude").required("Latitude is required"),
  longitude: yup.number("Enter longitude").required("Longitude is required"),
});

const useStyles = makeStyles((themes) => ({
  apartmentField: {
    margin: " 0 20px 20px 0",
  },
  noInput: {
    width: "calc(50% - 20px)",
  },
  selectInput: {
    margin: " 0 20px 10px 0",
    width: "calc(50% - 20px)",
    height: "48px",
  },
  alertBox: {
    marginBottom: "20px",
  },
  loader: {
    color: "white",
  },
  error: {
    marginBottom: "20px",
  },
}));

export function UpsertApartment(props) {
  const classes = useStyles();
  const apartment = props.apartment || {};

  const formik = useFormik({
    initialValues: {
      name: apartment.name || "",
      description: apartment.name || "",
      floorAreaSize: apartment.floorAreaSize || "",
      noOfRooms: apartment.noOfRooms || "",
      latitude: apartment.location?.cordinates[0] || "",
      longitude: apartment.location?.cordinates?.[1] || "",
      pricePerMonth: apartment.pricePerMonth || "",
      realtorEmail: apartment.realtorEmail || "",
      status: apartment.status || "Rented",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const data = {
        name: values.name,
        description: values.description,
        floorAreaSize: values.floorAreaSize,
        pricePerMonth: values.pricePerMonth,
        noOfRooms: values.noOfRooms,
        location: {
          description: values.name,
          cordinates: [values.latitude, values.longitude],
        },
        realtorEmail: values.realtorEmail,
        status: values.status,
      };

      mutate(data);
    },
  });

  const { isLoading, isSuccess, isError, mutate } = useMutation(
    (newApartment) => {
      if (apartment.name) {
        newApartment._id =apartment._id;
        return editApartment(newApartment);
      }
      return addApartment(newApartment);
    }
  );

  useEffect(() => {
    if (isSuccess) props.onSuccess();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  return (
    <>
      <div className="apartmentContainerForm">
        <div className="apartmentForm">
          {isError && (
            <Alert severity="error" className={classes.error}>
              <AlertTitle>Submit Failed</AlertTitle>
              Please try again later
            </Alert>
          )}

          <form onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              id="name"
              name="name"
              label="Name"
              className={classes.apartmentField}
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
            <TextField
              fullWidth
              multiline
              id="description"
              name="description"
              label="Description"
              className={classes.apartmentField}
              value={formik.values.description}
              onChange={formik.handleChange}
              error={
                formik.touched.description && Boolean(formik.errors.description)
              }
              helperText={
                formik.touched.description && formik.errors.description
              }
            />
            <TextField
              type="number"
              id="floorAreaSize"
              name="floorAreaSize"
              label="Floor Area sq.ft"
              className={`${classes.apartmentField} ${classes.noInput}`}
              value={formik.values.floorAreaSize}
              onChange={formik.handleChange}
              error={
                formik.touched.floorAreaSize &&
                Boolean(formik.errors.floorAreaSize)
              }
              helperText={
                formik.touched.floorAreaSize && formik.errors.floorAreaSize
              }
            />
            <TextField
              type="number"
              id="noOfRooms"
              name="noOfRooms"
              label="No Of rooms"
              className={`${classes.apartmentField} ${classes.noInput}`}
              value={formik.values.noOfRooms}
              onChange={formik.handleChange}
              error={
                formik.touched.noOfRooms && Boolean(formik.errors.noOfRooms)
              }
              helperText={formik.touched.noOfRooms && formik.errors.noOfRooms}
            />

            <TextField
              type="number"
              id="latitude"
              name="latitude"
              label="Latitude"
              className={`${classes.apartmentField} ${classes.noInput}`}
              value={formik.values.latitude}
              onChange={formik.handleChange}
              error={formik.touched.latitude && Boolean(formik.errors.latitude)}
              helperText={formik.touched.latitude && formik.errors.latitude}
            />

            <TextField
              type="number"
              id="longitude"
              name="longitude"
              label="Longitude"
              className={`${classes.apartmentField} ${classes.noInput}`}
              value={formik.values.longitude}
              onChange={formik.handleChange}
              error={
                formik.touched.longitude && Boolean(formik.errors.longitude)
              }
              helperText={formik.touched.longitude && formik.errors.longitude}
            />
            <TextField
              id="status"
              select
              label="Status"
              value={formik.values.status}
              onChange={formik.handleChange("status")}
              className={`${classes.apartmentField} ${classes.selectInput}`}
            >
              <MenuItem value={"Availiable"}>Availiable</MenuItem>
              <MenuItem value={"Rented"}>Rented</MenuItem>
            </TextField>

            <TextField
              type="number"
              id="pricePerMonth"
              name="pricePerMonth"
              label="Price per month"
              className={`${classes.apartmentField} ${classes.noInput}`}
              value={formik.values.pricePerMonth}
              onChange={formik.handleChange}
              error={
                formik.touched.pricePerMonth &&
                Boolean(formik.errors.pricePerMonth)
              }
              helperText={
                formik.touched.pricePerMonth && formik.errors.pricePerMonth
              }
            />

            <TextField
              type="email"
              id="realtorEmail"
              name="realtorEmail"
              label="Realtor email id"
              fullWidth
              className={`${classes.apartmentField}`}
              value={formik.values.realtorEmail}
              onChange={formik.handleChange}
              error={
                formik.touched.realtorEmail &&
                Boolean(formik.errors.realtorEmail)
              }
              helperText={
                formik.touched.realtorEmail && formik.errors.realtorEmail
              }
            />
            <Button
              color="primary"
              style={{ height: "46px" }}
              variant="contained"
              fullWidth
              type="submit"
              className="submitButton"
              disabled={isLoading}
            >
              {isLoading ? (
                <CircularProgress className={classes.loader} />
              ) : (
                "Submit"
              )}
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
