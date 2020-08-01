//Adapted from https://material-ui.com/getting-started/templates/

import React, { Component } from 'react'
import axios from 'axios'

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class Login extends Component {

    constructor(props) {
        super(props)

        this.state = {
            username: '',
            password: '',
            displaySnackbar: false,
            alertSeverity: "info",
            alertMessage: null,
            loading: false,
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

    login = async () => {
        this.setState({ loading: true });
        try {
            const username = this.state.username.trim();
            const password = this.state.password;

            if(username === '') throw new Error();
            if(password === '') throw new Error();

            await axios.post('/login', { username, password }, { withCredentials: true });

            this.props.history.push('/dashboard');
            
            this.displaySnackbar("Login success!", "success");
            
        } catch (error) {
            this.displaySnackbar("An error occured.", "error");
            this.setState({
                password: ''
            });
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
                            value={this.state.username}
                            onChange={(e) => this.setState({ username: e.target.value })}
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
                            value={this.state.password}
                            onChange={(e) => this.setState({ password: e.target.value })}
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={this.login}
                            disabled={this.state.loading}
                        >
                            Login
          </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2" onClick={() => this.displaySnackbar("Well that's too bad ¯\\_(ツ)_/¯", "info")}>
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
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
});

export default withStyles(styles, { withTheme: true })(Login);
