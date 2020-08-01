//Adapted from https://material-ui.com/getting-started/templates/

// React & Redux
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Actions
import { postLoginRequest } from "../state/user/userActions";

// Selectors
import { userIsSubmittingSelector, userSuccessfulLoginSelector } from "../state/user/userSelectors";

// Material UI
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Typography,
  Container,
  Snackbar,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { makeStyles } from "@material-ui/core/styles";
import MuiAlert from "@material-ui/lab/Alert";

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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Login() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const isSubmitting = useSelector(userIsSubmittingSelector);
  const loginSuccess = useSelector(userSuccessfulLoginSelector);

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [displaySnackbar, setDisplaySnackbar] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const [snackBarSeverity, setSnackBarSeverity] = useState("");

  const login = () => {
    setUserName(userName.trim());

    // Should be replaced with a library called JOI for easy validation, i dont mind doing this
    if (userName === "") throw new Error();
    if (password === "") throw new Error();

    dispatch(postLoginRequest({ username: userName, password: password }, true));

    setPassword("");
  };

  useEffect(() => {
    if (loginSuccess) {
      history.push("/jobboard");
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
        <Alert onClose={() => setDisplaySnackbar(false)} severity={snackBarSeverity}>
          {snackBarMessage}
        </Alert>
      </Snackbar>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={() => login()}
            disabled={isSubmitting}
          >
            Login
          </Button>
          <Grid container>
            <Grid item xs>
              <Link
                href="#"
                variant="body2"
                onClick={() => {
                  setSnackBarMessage("Well that's too bad ¯\\_(ツ)_/¯");
                  setSnackBarSeverity("info");
                  setDisplaySnackbar(true);
                }}
              >
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/register" variant="body2">
                {"Don't have an account? Register"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

export default Login;
