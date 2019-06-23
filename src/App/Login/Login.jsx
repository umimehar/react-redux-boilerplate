import React from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import "./Login.scss"
import { userActions } from '../../_actions/user.action';
import { Redirect } from 'react-router-dom';

import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import { Icon } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';


class Login extends React.Component {
    constructor(props) {
        super(props);

        // reset login status
        this.props.dispatch(userActions.logout());

        this.state = {
            email: '',
            password: '',
            submitted: false
        };
        document.title = "Login"

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { email, password } = this.state;
        const { dispatch } = this.props;
        if (email && password) {
            dispatch(userActions.login(email, password));
        }
        
    }

    render() {
        const { loggingIn, error, errorMessage, user } = this.props;
        const { email, password, submitted } = this.state;
        if (user && user.access_token) return <Redirect to="/dashboard" />
        return (
            <div className="h-100vh bg-primary">
                <div className="container ">
                    <div className="row justify-content-center pt-3">
                        <Paper className="col-11 col-lg-6 mt-5 py-3">
                            <Typography className="d-flex justify-content-center align-items-center text-gray" variant="h3" gutterBottom>
                                <Icon fontSize='large'>account_circle</Icon>
                                Login
                            </Typography>

                            {
                                error && errorMessage &&
                                <Typography variant="body2" className="text-danger line-height-1rem my-2">{errorMessage}</Typography>
                            }

                            <form name="form" onSubmit={this.handleSubmit}>
                                <FormControl className="my-2 w-100 " error={submitted && !email}>
                                    <InputLabel htmlFor="email">Email</InputLabel>
                                    <Input
                                        type="email"
                                        name="email"
                                        id="email"
                                        value={email}
                                        onChange={this.handleChange}
                                        aria-describedby="emailInputComponent"
                                        startAdornment={
                                            <InputAdornment position="start">
                                                <Icon>face</Icon>
                                            </InputAdornment>
                                            }
                                    />
                                    {
                                        submitted && !email &&
                                        <FormHelperText id="emailInputComponent">Email is Required.</FormHelperText>
                                    }
                                </FormControl>

                                <FormControl className="my-2 w-100" error={submitted && !password}>
                                    <InputLabel htmlFor="password">Password</InputLabel>
                                    <Input
                                        type="password"
                                        name="password"
                                        id="password"
                                        value={password}
                                        onChange={this.handleChange}
                                        aria-describedby="passwordInputComponent"
                                        startAdornment={
                                            <InputAdornment position="start">
                                                <Icon>lock</Icon>
                                            </InputAdornment>
                                            }
                                    />
                                    {
                                        submitted && !password && 
                                        <FormHelperText id="passwordInputComponent">Password is Required.</FormHelperText>
                                    }
                                    
                                </FormControl>

                                <div className="button-progress-wrapper">
                                    <Button disabled={loggingIn} type="submit" variant="contained" color="secondary" className='my-2'>
                                        {/* This Button uses a Font Icon, see the installation instructions in the docs. */}
                                        <Icon className="mr-1">send</Icon>
                                        Login
                                    </Button>
                                    {loggingIn && <CircularProgress size={24} className="buttonProgress" />}
                                </div>
                            </form>
                        </Paper>
                    </div>
                   
                </div>
               
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { loggingIn, error, errorMessage, user } = state.authentication;
    return {
        loggingIn,
        error,
        errorMessage,
        user
    };
}

const connectedLoginPage = connect(mapStateToProps)(Login);
export { connectedLoginPage as Login }; 