import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import { Icon } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import { isLogin } from "../../_helpers/auth"
import { NavbarProfile } from '../../_components/NavbarProfile';
import { Link, Route, Switch } from "react-router-dom"
import DashboardView from './DashboardView';
import Ratings from './Ratings/Ratings';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function Dashboard(props) {
    document.title = "Rating Dashboard"
    const { container } = props;
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);

    
    function handleDrawerToggle() {
        if (window.matchMedia(`(max-width: 600px)`).matches) {
            setMobileOpen(!mobileOpen);
        }
    }

    const drawer = (
        <div>
            <div className={classes.toolbar + " d-flex px-2"} >
                <img className="img-fluid" alt="yallacompare" src="http://static.compareit4me.com/banking/yallacompare/FULL+-+color%401.5x.svg"/>
            </div>
            <Divider />
            <List>
                {[
                    {label:'Dashboard', icon: 'dashboard', slug:'dashboard', link:''},
                    {label:'Ratings', icon: 'line_weight', slug:'ratings', link:'/ratings'}
                    
                ].map((obj, index) => (
                    <Link to={props.match.url+obj.link} key={obj.slug}>
                            <ListItem button onClick={handleDrawerToggle}>
                                <ListItemIcon><Icon>{obj.icon}</Icon></ListItemIcon>
                                <ListItemText primary={obj.label} />
                            </ListItem>
                    </Link>
                ))}
            </List>
            <Divider />
            {/* <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>{index % 2 === 0 ? <Icon>move_to_inbox</Icon> : <Icon>mail</Icon>}</ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List> */}
        </div>
    );
    return (
        
        <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
            <IconButton
                color="inherit"
                aria-label="Open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                className={classes.menuButton}
            >
                <Icon>menu</Icon>
            </IconButton>
            <Typography className="flex-grow-1" variant="h6" noWrap>
                CMS Rating Engine
            </Typography>

            {
                isLogin() && (
                    <NavbarProfile/>
                )
            }



        </Toolbar>
        </AppBar>
        <nav className={classes.drawer} aria-label="Mailbox folders">
            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
            <Hidden smUp implementation="css">
                <Drawer
                    container={container}
                    variant="temporary"
                    anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                >
                {drawer}
                </Drawer>
            </Hidden>
            <Hidden xsDown implementation="css">
            <Drawer
                classes={{
                    paper: classes.drawerPaper,
                }}
                variant="permanent"
                open
            >
                {drawer}
            </Drawer>
        </Hidden>
        </nav>
        <main className="mt-1 w-100">
            <div className={classes.toolbar} />
            <div className="dashboardChildView">
                <Switch>
                    <Route path={props.match.path+'/ratings'} component={Ratings}></Route>
                    <Route path={props.match.path} component={DashboardView}></Route>
                </Switch>
            </div>
        </main>
    </div>
    );
}

export default Dashboard
// ResponsiveDrawer.propTypes = {
//   // Injected by the documentation to work in an iframe.
//   // You won't need it on your project.
//   container: PropTypes.object,
// };
