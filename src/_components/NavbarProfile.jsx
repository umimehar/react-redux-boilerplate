import React from 'react';
import { connect } from 'react-redux';
import { userActions } from '../_actions/user.action';

import { Icon } from '@material-ui/core';
import Menu from "@material-ui/core/Menu"
import MenuItem from '@material-ui/core/MenuItem';
import Button from "@material-ui/core/Button"

class NavbarProfile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            anchorEl : null
        }
        
        this.handleLogout = this.handleLogout.bind(this);
        this.handleAccountMenu = this.handleAccountMenu.bind(this)
        this.handleAccountMenuClose = this.handleAccountMenuClose.bind(this)
    }

    handleLogout() {
        this.props.dispatch(userActions.logout())
    }
    handleAccountMenuClose(){
        this.setState({
            anchorEl: null
        })
    }
    handleAccountMenu(ev){
        this.setState({
            anchorEl: ev.currentTarget
        })
    }

    render() {
        const { user} = this.props;
        return (
            <div>
                <Button 
                    aria-label="Account of current user" 
                    color="inherit"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={this.handleAccountMenu}
                    size="small"
                    className="text-transform-inherit"
                    >
                    <Icon className="mr-1">account_circled</Icon>
                    {user && user.username.split("@")[0]}
                    
                </Button>
                <Menu
                    id="menu-appbar"
                    anchorEl={this.state.anchorEl}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={Boolean(this.state.anchorEl)}
                    onClose={this.handleAccountMenuClose}
                >
                    {/* <MenuItem disabled onClick={this.handleAccountMenuClose}>
                        <Icon className="mr-2">person</Icon>
                        Profile
                    </MenuItem> */}
                    <MenuItem onClick={this.handleLogout}>
                        <Icon className="mr-2">exit_to_app</Icon>
                        Logout
                    </MenuItem>
                </Menu>
            </div>
        );
    }
}


function mapStateToProps(state) {
    const { loggedIn, user } = state.authentication;
    return {
        loggedIn,
        user
    };
}

const connectedNavbarProfile = connect(mapStateToProps)(NavbarProfile);
export { connectedNavbarProfile as NavbarProfile }; 