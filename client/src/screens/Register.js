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
            loading: false,
            userType: 'seeker',
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
            const username = this.state.username.trim();
            const password = this.state.password;

            if (username.length < 3) throw new Error("Invalid username length");
            if (password.length < 5) throw new Error("Invalid password length");

            await axios.post('/register', { username, password, userType: this.state.userType }, { withCredentials: true });
            this.displaySnackbar("Account created. You may now log in.", "success");
            this.setState({
                username: '',
                password: ''
            });
        } catch (error) {
            this.displaySnackbar("An error occured.", "error");
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
                        Sign up
              </Typography>
                    <form className={classes.form} noValidate>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="username"
                                    label="Usernme"
                                    name="username"
                                    autoComplete="username"
                                    onChange={(e) => this.setState({ username: e.target.value })}
                                    value={this.state.username}
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
                                    <RadioGroup aria-label="userType" name="userType" onChange={(e) => this.setState({ userType: e.target.value })} value={this.state.userType} row>
                                        <FormControlLabel value="seeker" control={<Radio />} label="Job Seeker" />
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
                            Sign Up
                </Button>
                        <Grid container justify="flex-end">
                            <Grid item>
                                <Link href="/login" variant="body2">
                                    Already have an account? Sign in
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
