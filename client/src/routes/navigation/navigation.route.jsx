import React, { useState,  useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { AppBar, Avatar, Button, Toolbar, Typography } from "@material-ui/core";
import { useDispatch } from "react-redux";
import decode from 'jwt-decode';

import AUTH_ACTION_TYPES from "../../store/authentication/authentication.types";

import memoriesLogo from '../../assets/images/memoriesLogo.png';
import memoriesText from '../../assets/images/memoriesText.png';
import useStyles from './navigation.styles';

const Navbar = () => {
    const classes = useStyles();
    const [ user, setUser ] = useState(JSON.parse(localStorage.getItem('profile')));
    const history = useHistory();
    const location = useLocation();
    const dispatch = useDispatch();

    const logout = () => {
        dispatch({ type: AUTH_ACTION_TYPES.LOGOUT });
        history.push('/auth');
        setUser(null);
    };
    
    
    useEffect(() => {
        const token = user?.token;

        if(token) {
            const decodedToken = decode(token);

            if(decodedToken.exp * 1000 < new Date().getTime()) logout()
        }

        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]); // eslint-disable-line react-hooks/exhaustive-deps

    return(
        <AppBar className={classes.appBar} position="static" color="inherit">
            <Link to="/" className={classes.brandContainer}>
                <img component={Link} to="/" src={memoriesText} alt="icon" height="45px" />
                <img className={classes.image} src={memoriesLogo} alt="icon" height="40px" />
            </Link>
            <Toolbar className={classes.toolbar}>
                {user ? (
                        <div className={classes.profile}>
                            <Avatar className={classes.purple} src={user.photoURL} alt={user.displayName}>
                                {user?.result ? user?.result.name[0] : user?.displayName[0]}
                            </Avatar>
                            <Typography className={classes.userName}>
                                {user?.result ? user?.result.name : user?.displayName}
                            </Typography>
                            <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
                        </div>
                ) : (<Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;