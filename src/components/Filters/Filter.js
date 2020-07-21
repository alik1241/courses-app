import React, {useState, useContext} from 'react';
import "./FilterStyle.css";
import { makeStyles, withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputBase from '@material-ui/core/InputBase';
import {AppContext} from "../../services/AppContext";

const BootstrapInput = withStyles((theme) => ({
    root: {
        'label + &': {
            marginTop: theme.spacing(3),
        },
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 314,
        [theme.breakpoints.down('sm')]: {
            minWidth: 370,
        },
        // maxWidth: 350,
    },
    input: {
        borderRadius: 4,
        position: 'relative',
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #ced4da',
        fontSize: 16,
        padding: '10px 26px 10px 12px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:focus': {
            borderRadius: 4,
            borderColor: '#80bdff',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
    },
}))(InputBase);

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
    }
}));

const compare = (a, b) => {
    if (a * 1 < b * 1) return -1;
    if (a * 1 > b * 1) return 1;
    return 0;
};

const makeFilters = (data) => {
    let genreList = [];
    let subjectList = [];
    let gradeList = [];

    for (let i = 0; i < data.items.length; i++) {
        let item = data.items[i];

        if (genreList.indexOf(item.genre) === -1) {
            genreList.push(item.genre);
        }

        if (subjectList.indexOf(item.subject) === -1) {
            subjectList.push(item.subject);
        }

        if (gradeList.indexOf(item.grade) === -1 && item.grade.indexOf(';') === -1) {
            gradeList.push(item.grade);
        } else if(item.grade.indexOf(';') !== -1) {
            let list = item.grade.split(';');
            list.map(elem => gradeList.indexOf(elem) === -1 ? gradeList.push(elem) : null);
        }
    }

    return {
        subjectList: subjectList.sort(compare),
        gradeList: gradeList.sort(compare),
        genreList: genreList.sort(compare)
    }
};

export default () => {
    const classes = useStyles();

    const [state, setState] = useState({
        subject: 0,
        grade: 0,
        genre: 0
    });

    const {data, filter, setFilter} = useContext(AppContext);

    const handleChange = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.value
        });

        setFilter({
            ...filter,
            [event.target.name]: event.target.value
        });
    };

    let filters = {};

    if (data.items) {
        filters = makeFilters(data);
    }

    return (
        <div className={'filter__wrap'}>
            <FormControl className={classes.formControl}>
                <Select
                    labelId="demo-customized-select-label"
                    id="subject-select"
                    name="subject"
                    value={state.subject}
                    onChange={handleChange}
                    input={<BootstrapInput />}
                >
                    <MenuItem value={0}>
                        <em>Все предметы</em>
                    </MenuItem>
                    {
                        filters.subjectList && filters.subjectList.map(item =>
                            <MenuItem value={item}>{item}</MenuItem>
                        )
                    }
                </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
                <Select
                    labelId="demo-customized-select-label"
                    id="genre-select"
                    name="genre"
                    value={state.genre}
                    onChange={handleChange}
                    input={<BootstrapInput />}
                >
                    <MenuItem value={0}>
                        <em>Все жанры</em>
                    </MenuItem>
                    {
                        filters.genreList && filters.genreList.map(item =>
                            <MenuItem value={item}>{item}</MenuItem>
                        )
                    }
                </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
                <Select
                    labelId="demo-customized-select-label"
                    id="grade-select"
                    name="grade"
                    value={state.grade}
                    onChange={handleChange}
                    input={<BootstrapInput />}
                >
                    <MenuItem value={0}>
                        <em>Все классы</em>
                    </MenuItem>
                    {
                        filters.gradeList && filters.gradeList.map(item =>
                            <MenuItem value={item}>{item}</MenuItem>
                        )
                    }
                </Select>
            </FormControl>

        </div>
    );
}