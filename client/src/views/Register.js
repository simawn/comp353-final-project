//Adapted from https://material-ui.com/getting-started/templates/

import React, { Component } from 'react'
import axios from 'axios';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class Register extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            password: '',
            firstName: '',
            lastName: '',
            email: '',
            loading: false,
            role: 'employee',
            displaySnackbar: false,
            alertSeverity: "info",
            alertMessage: null,
        }
    }

    displaySnackbar = (message, severity) => {
        this.setState({
            displaySnackbar: true,
            alertSeverity: severity,
            alertMessage: message,
        })
    };

    hideSnackbar = () => {
        this.setState({
            displaySnackbar: false,
        })
    };

    register = async () => {
        this.setState({ loading: true });
        try {
            const re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
            const userName = this.state.username.trim();
            const password = this.state.password;
            const firstName = this.state.firstName.trim();
            const lastName = this.state.lastName.trim();
            const email = this.state.email.trim();
            const role = this.state.role;
            const subscription = 1;

            if (userName.length <= 0) throw new Error("Username cannot be empty");
            if (password.length <= 5) throw new Error("Password must have at least 6 characters");
            if (firstName.length <= 0) throw new Error("First name cannot be empty");
            if (lastName.length <= 0) throw new Error("Last name cannot be empty");
            if (email.length <= 0) throw new Error("Email cannot be empty");
            if (!re.test(email)) throw new Error("Invalid email");

            await axios.post('/register', { 
                userName, 
                password, 
                firstName,
                lastName,
                email,
                role,
                subscription,
            }, { withCredentials: true });

            this.displaySnackbar("Account created. You may now log in.", "success");
            this.setState({
                username: '',
                password: ''
            });
        } catch (error) {
            this.displaySnackbar(error.message, "error");
        } finally {
            this.setState({ loading: false });
        }
    };

    render() {
        const { classes } = this.props;

        return (
            <Container component="main" maxWidth="xs">
                <Snackbar open={this.state.displaySnackbar} autoHideDuration={6000} onClose={this.hideSnackbar} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                    <Alert onClose={this.hideSnackbar} severity={this.state.alertSeverity}>
                        {this.state.alertMessage}
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
                                    onChange={(e) => this.setState({ username: e.target.value })}
                                    value={this.state.username}
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
                                    onChange={(e) => this.setState({ firstName: e.target.value })}
                                    value={this.state.firstName}
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
                                    onChange={(e) => this.setState({ lastName: e.target.value })}
                                    value={this.state.lastName}
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
                                    onChange={(e) => this.setState({ email: e.target.value })}
                                    value={this.state.email}
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
                                    onChange={(e) => this.setState({ password: e.target.value })}
                                    value={this.state.password}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl component="fieldset" required>
                                    <FormLabel component="legend">I'm a(n)</FormLabel>
                                    <RadioGroup aria-label="role" name="role" onChange={(e) => this.setState({ role: e.target.value })} value={this.state.role} row>
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
                            onClick={this.register}
                            disabled={this.state.loading}
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
        )
    }
}

const styles = (theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
});

export default withStyles(styles, { withTheme: true })(Register);
