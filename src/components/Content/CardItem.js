import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

const getGrade = (grade) => {
    if (grade.indexOf(';') !== -1) {
        let list = grade.split(';');

        return `${list[0]}-${list[1]} класс`
    } else {
        return `${grade} класс`;
    }
};

export default ({item, isRub}) => {
    return (
        <Card className={'content__card-item-root'}>
            <CardMedia
                className={'content__card-media'}
                image={`https://www.imumk.ru/svc/coursecover/${item.courseId}`}
                title="Contemplative Reptile"
            />
            <CardContent>
                <Typography gutterBottom variant="body2" component="p">{item.subject}</Typography>
                <Typography variant="body2" color="textSecondary" component="p">{getGrade(item.grade)}</Typography>
                <Typography variant="body2" color="textSecondary" component="p">{item.genre}</Typography>
                <div>
                    <Button size="small" color="primary" style={{margin: '5px 0'}}>
                        <Link href={`https://www.imumk.ru/offer/${item.courseId}`}>Подробнее</Link>
                    </Button>
                    <Button variant="contained" color="primary" fullWidth={true}>{isRub ? `${item.price} р` : `${item.priceBonus} б`}</Button>
                </div>
            </CardContent>
        </Card>
    );
}