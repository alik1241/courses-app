import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
// import { makeStyles } from '@material-ui/core/styles';
// import Skeleton from '@material-ui/lab/Skeleton';
// import Card from "@material-ui/core/Card";
// import CardContent from "@material-ui/core/CardContent";

// const useStyles = makeStyles({
//     root: {
//         // maxWidth: 345,
//         minHeight: 260,
//         width: 170,
//         margin: '0 15px 55px'
//     },
//     media: {
//         height: 140,
//     },
// });

export default ({item}) => {
    // const classes = useStyles();

    // return (
    //     <Card className={classes.root}>
    //         <Skeleton variant="rect" className={classes.media} />
    //         <CardContent>
    //             <Skeleton variant="text"  />
    //             <Skeleton variant="text" />
    //             <Skeleton variant="text" />
    //             <div>
    //                 <Skeleton variant="rect" style={{margin: '5px 0', width: 100}} />
    //                 <Skeleton variant="rect" style={{height: 30}} />
    //             </div>
    //         </CardContent>
    //     </Card>
    // );

    return (
        <div className={'card__progress-wrap'}>
            <LinearProgress className={'card__progress'} />
        </div>
    );
}