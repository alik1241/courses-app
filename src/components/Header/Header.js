import React, {useState, useContext} from 'react';
import "./HeaderStyle.css";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import { CloudDownload, Help, Store, Announcement, QuestionAnswer, LockOpen } from "@material-ui/icons";
import ListItemText from "@material-ui/core/ListItemText";
import Paper from '@material-ui/core/Paper';
import Drawer from "@material-ui/core/Drawer";
import logo from '../../logo.svg';
import {AppContext} from "../../services/AppContext";
import {fade, makeStyles, withStyles} from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import Divider from '@material-ui/core/Divider';

const PurpleSwitch = withStyles({
    switchBase: {
        color: 'gray',
        '&$checked': {
            color: '#00c1ff',
        },
        '&$checked + $track': {
            backgroundColor: '#9cb9c3',
        },
    },
    checked: {},
    track: {},
})(Switch);

const headerStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
        color: '#00c1ff'
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        margin: `0 ${theme.spacing(2)}px`,
        width: 600,
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    }
}));

export default () => {
    const anchor = 'left';
    const {filter, setRub, setFilter} = useContext(AppContext);

    const [state, setState] = useState({
        checked: false,
        left: false,
        mobileMoreAnchorEl: null
    });

    const isMobileMenuOpen = Boolean(state.mobileMoreAnchorEl);

    const handleMobileMenuClose = () => {
        setState({
            ...state,
            mobileMoreAnchorEl: null
        })
    };

    const handleMobileMenuOpen = (event) => {
        setState({
            ...state,
            mobileMoreAnchorEl: event.currentTarget
        })
    };

    const handleChange = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.checked
        });
        setRub(!event.target.checked);
    };

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const handSearch = (event) => {
        if (event.key === 'Enter') {
            setFilter({
                ...filter,
                search: event.target.value
            });

            event.preventDefault();
        }

        return false;
    };

    const classes = headerStyles();

    const menuId = 'primary-search-account-menu';
    const mobileMenuId = 'primary-search-account-menu-mobile';

    const renderMobileMenu = (
        <Menu
            anchorEl={state.mobileMoreAnchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <IconButton color="inherit">
                    <LockOpen/>
                </IconButton>
                <p>Активация</p>
            </MenuItem>

            <MenuItem>
                <IconButton
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <p>Вход</p>
            </MenuItem>
            <MenuItem>
                <div className={'switcher__wrap'}>
                    <PurpleSwitch checked={state.checked} onChange={handleChange} name="checked" />
                </div>
            </MenuItem>
        </Menu>
    );

    const getIcon = (i) => {
        switch (i) {
            case 0: return <Store/>;
            case 1: return <Help/>;
            case 2: return <QuestionAnswer/>;
            case 3: return <Announcement/>;
            case 4: return <CloudDownload/>;
            default: return ;
        }
    };

    const list = (anchor) => (
        <div
            className={'header__list'}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                {['Витрина', 'О проекте', 'Новости', 'Помощь', 'Скачать'].map((text, index) => (
                    <ListItem button key={text} selected={index === 0}>
                        <ListItemIcon>{getIcon(index)}</ListItemIcon>
                        <ListItemText primary={text}/>
                    </ListItem>
                ))}
            </List>
        </div>
    );

    return (
        <div className={classes.grow}>
            <AppBar position="fixed" color='#fff'>
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        aria-label="open drawer"
                        onClick={toggleDrawer(anchor, true)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography className={classes.title} variant="h6">
                        <img src={logo} className="App-logo" alt="logo" />
                    </Typography>
                    <div className={classes.search}>
                        <Paper component="form" className={'header__root'} variant="outlined">
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                            <InputBase placeholder="Поиск…" inputProps={{ 'aria-label': 'search' }} fullWidth={true}
                                       classes={{root: classes.inputRoot, input: classes.inputInput}}
                                       onKeyPress={handSearch}
                            />
                        </Paper>
                    </div>
                    <div className={classes.grow} />
                    <div className={classes.sectionDesktop}>
                        <Divider orientation="vertical" flexItem />
                        <div className={'switcher__wrap'}>
                            <PurpleSwitch checked={state.checked} onChange={handleChange} name="checked" />
                        </div>
                        <Divider orientation="vertical" flexItem />
                        <IconButton aria-label="Активация" color="inherit" aria-haspopup="true">
                            <LockOpen/>
                        </IconButton>
                        <IconButton
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                    </div>
                    <div className={classes.sectionMobile}>
                        <IconButton
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
                {
                    list(anchor)
                }
            </Drawer>
        </div>
    );
}