import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { AiOutlineEdit, AiOutlineHome } from 'react-icons/ai';
import { BiCommentDetail } from 'react-icons/bi';
import { MdOutlineAdminPanelSettings, MdLogout } from 'react-icons/md';
import { GoCreditCard } from 'react-icons/go';
import { Link, useRouteMatch, Switch, Route } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import Addlaptop from './Addlaptop';
import MakeAdmin from './MakeAdmin';
import AdminRoute from '../restricted-routes/AdminRoute';
import ManageOrders from './ManageOrders';
import ManageLaptops from './ManageLaptop';
import MyOrders from './MyOrders';
import { BsCart2, BsHandbag, BsLaptop } from 'react-icons/bs';
import Pay from './Pay';
import AddReview from './AddReview';

const drawerWidth = 260;

function ResponsiveDrawer(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const { user, admin, SingOut } = useAuth();
    const { path, url } = useRouteMatch();

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (

        <div className="text-gray-800 font-semibold">

            <Toolbar />

            <div className="flex flex-col items-center mb-5">

                <div>
                    <img width="150px" className="rounded-full mb-3" src={user?.photoURL ? user?.photoURL : 'https://image.flaticon.com/icons/png/512/206/206853.png'} alt="user" />
                </div>

                <h1 className="mb-2">{user?.displayName}</h1>
                <h1 className="mb-3 hover:underline">{user?.email}</h1>

            </div>

            <Divider />

            <List sx={{ marginTop: '15px' }}>

                <Link to="/home">
                    <ListItem button sx={{ marginBottom: "10px" }}>
                        <ListItemIcon>
                            <AiOutlineHome className="text-2xl text-blue-700" />
                        </ListItemIcon>
                        <h1>Home</h1>
                    </ListItem>
                </Link>

                {
                    admin ? (

                        <>

                            <Link to={`${url}/addlaptop`}>
                                <ListItem button sx={{ marginBottom: "10px" }}>
                                    <ListItemIcon>
                                        <AiOutlineEdit className="text-2xl text-blue-700" />
                                    </ListItemIcon>
                                    <h1>Add Laptop</h1>
                                </ListItem>
                            </Link>


                            <Link to={`${url}/makeadmin`}>
                                <ListItem button sx={{ marginBottom: "10px" }}>
                                    <ListItemIcon>
                                        <MdOutlineAdminPanelSettings className="text-2xl text-blue-700" />
                                    </ListItemIcon>
                                    <h1>Make Admin</h1>
                                </ListItem>
                            </Link>

                            <Link to={`${url}/manageorders`}>
                                <ListItem button sx={{ marginBottom: "10px" }}>
                                    <ListItemIcon>
                                        <BsHandbag className="text-2xl text-blue-700" />
                                    </ListItemIcon>
                                    <h1>Manage All Orders</h1>
                                </ListItem>
                            </Link>

                            <Link to={`${url}/managelaptops`}>
                                <ListItem button sx={{ marginBottom: "10px" }}>
                                    <ListItemIcon>
                                        <BsLaptop className="text-2xl text-blue-700" />
                                    </ListItemIcon>
                                    <h1>Manage Laptops</h1>
                                </ListItem>
                            </Link>

                        </>

                    ) : (

                        <>

                            <Link to={`${url}/myorders`}>
                                <ListItem button sx={{ marginBottom: "10px" }}>
                                    <ListItemIcon>
                                        <BsCart2 className="text-2xl text-blue-700" />
                                    </ListItemIcon>
                                    <h1>My Orders</h1>
                                </ListItem>
                            </Link>

                            <Link to={`${url}/payment`}>
                                <ListItem button sx={{ marginBottom: "10px" }}>
                                    <ListItemIcon>
                                        <GoCreditCard className="text-2xl text-blue-700" />
                                    </ListItemIcon>
                                    <h1>Payment</h1>
                                </ListItem>
                            </Link>

                            <Link to={`${url}/addreview`}>
                                <ListItem button sx={{ marginBottom: "10px" }}>
                                    <ListItemIcon>
                                        <BiCommentDetail className="text-2xl text-blue-700" />
                                    </ListItemIcon>
                                    <h1>Review</h1>
                                </ListItem>
                            </Link>



                        </>

                    )

                }

                < ListItem ListItem onClick={SingOut} button sx={{ marginBottom: "10px" }}>
                    <ListItemIcon>
                        <MdLogout className="text-2xl text-blue-700" />
                    </ListItemIcon>
                    <h1>Sing Out</h1>
                </ListItem>

            </List>


        </div >
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Dashboard
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                <Toolbar />

                <Switch>

                    {
                        admin ? (
                            <Route exact path={path}>
                                <Addlaptop />
                            </Route>
                        ) : (
                            <Route exact path={path}>
                                <MyOrders />
                            </Route>
                        )
                    }

                    <AdminRoute path={`${path}/addlaptop`}>
                        <Addlaptop />
                    </AdminRoute>

                    <AdminRoute path={`${path}/makeadmin`}>
                        <MakeAdmin />
                    </AdminRoute>

                    <AdminRoute path={`${path}/manageorders`}>
                        <ManageOrders />
                    </AdminRoute>

                    <AdminRoute path={`${path}/managelaptops`}>
                        <ManageLaptops />
                    </AdminRoute>

                    <Route path={`${path}/myorders`}>
                        <MyOrders />
                    </Route>

                    <Route path={`${path}/payment`}>
                        <Pay />
                    </Route>

                    <Route path={`${path}/addreview`}>
                        <AddReview />
                    </Route>

                </Switch>

            </Box>
        </Box>
    );
}

ResponsiveDrawer.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default ResponsiveDrawer;
