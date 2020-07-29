import React, { useContext } from 'react';
import "./ContentStyle.css";
import Grid from '@material-ui/core/Grid';
import Item from "./CardItem";
import CardPreload from "./CardPreload";
import {AppContext,} from '../../services/AppContext';

const filtrator = (card, filter) => {
    if (Object.keys(filter).length > 0) {
        let condition = true;

        if (filter.grade) {
            condition = condition && card.grade.split(';').indexOf(filter.grade) !== -1;
        }

        if (filter.genre) {
            condition = condition && filter.genre === card.genre;
        }

        if (filter.subject) {
            condition = condition && filter.subject === card.subject;
        }

        if (filter.search) {
            let query = filter.search.toLowerCase();

            condition = condition
                && (card.grade.toLowerCase().indexOf(query) !== -1
                    || card.subject.toLowerCase().indexOf(query) !== -1
                    || card.grade.toLowerCase().indexOf(query) !== -1
                    || card.title.toLowerCase().indexOf(query) !== -1);
        }

        return condition;
    } else {
        return true;
    }
};

export default ({load}) => {
    const {data, filter, isRub} = useContext(AppContext);

    return (
        <div className={'content__container'}>
            <Grid container className={'content__root'}>
                <Grid item xs={12}>
                    <Grid container justify="center">
                        {
                            load &&
                            <Grid item>
                                <CardPreload />
                            </Grid>
                        }

                        {
                            !load && data.items && data.items.filter(card => filtrator(card, filter)).map((value) => (
                                <Grid key={value.courseId} item>
                                    <Item item={value} isRub={isRub} />
                                </Grid>
                            ))
                        }
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}