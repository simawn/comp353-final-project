// React & Redux
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form } from "react-final-form";

// Actions
import { postUserRequest } from "../state/user/userActions";

// Selector
import { userIsSubmittingSelector, userSnackBarInformationSelector } from "../state/user/userSelectors";

// Material UI
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Typography,
  FormControl,
  FormControlLabel,
  RadioGroup,
  FormLabel,
  Radio,
  Container,
  Snackbar,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MuiAlert from "@material-ui/lab/Alert";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Register() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const snackBarSettings = useSelector(userSnackBarInformationSelector);
  const isSubmitting = useSelector(userIsSubmittingSelector);

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("employee");
  const [pageInitialized, setPageInitialized] = useState(false);
  const [displaySnackbar, setDisplaySnackbar] = useState(false);

  const register = () => {
    // Clean up data
    try {
      const re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

      // I can replace this with a library called JOI for validation, makes it really clean
      if (userName.length <= 0) throw new Error("Username cannot be empty");
      if (password.length <= 5) throw new Error("Password must have at least 6 characters");
      if (firstName.length <= 0) throw new Error("First name cannot be empty");
      if (lastName.length <= 0) throw new Error("Last name cannot be empty");
      if (email.length <= 0) throw new Error("Email cannot be empty");
      if (!re.test(email)) throw new Error("Invalid email");

      dispatch(
        postUserRequest(
          {
            userName: userName,
            password: password,
            firstName: firstName,
            lastName: lastName,
            email: email,
            role: role,
            subscription: 1,
          },
          true
        )
      );

      setPageInitialized(true);
      setUserName("");
      setPassword("");
      setFirstName("");
      setLastName("");
      setEmail("");
    } catch (error) {
      snackBarSettings.alertSeverity = "warning";
      snackBarSettings.message = error.message;
      setDisplaySnackbar(true);
    }
  };

  useEffect(() => {
    if (!isSubmitting && pageInitialized) {
      setDisplaySnackbar(true);
    }
  }, [isSubmitting]);

  return (
    <Container component="main" maxWidth="xs">
      <Snackbar
        open={displaySnackbar}
        autoHideDuration={6000}
        onClose={() => setDisplaySnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={() => setDisplaySnackbar(false)} severity={snackBarSettings.alertSeverity}>
          {snackBarSettings.message}
        </Alert>
      </Snackbar>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                onChange={(e) => setUserName(e.target.value.trim())}
                value={userName}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                onChange={(e) => setFirstName(e.target.value.trim())}
                value={firstName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                onChange={(e) => setLastName(e.target.value.trim())}
                value={lastName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl component="fieldset" required>
                <FormLabel component="legend">I'm a(n)</FormLabel>
                <RadioGroup aria-label="role" name="role" onChange={(e) => setRole(e.target.value)} value={role} row>
                  <FormControlLabel value="employee" control={<Radio />} label="Employee" />
                  <FormControlLabel value="employer" control={<Radio />} label="Employer" />
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={() => register()}
            disabled={isSubmitting}
          >
            Register
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Login
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

export default Register;
