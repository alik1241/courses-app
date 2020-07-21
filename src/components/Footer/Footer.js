import React from "react";
import "./FooterStyle.css";
import Grid from "@material-ui/core/Grid";
import { Instagram, Twitter, Facebook } from "@material-ui/icons";

export default () => {
    return (
        <footer className={'footer'}>
            <div className={'footer__container'}>
            <Grid container>
                <Grid item xs={12}>
                    <Grid container justify="center">
                        <Grid item className={'footer__item left'}>
                            <div>© ООО «Физикон Лаб», 2013—2020</div>
                            <div>Пользовательское соглашение</div>
                        </Grid>
                        <Grid item className={'footer__item'}>
                            <div>+7 (499) 322-07-57, info@imumk.ru</div>
                            <div>Правила пользования сайтом</div>
                        </Grid>
                        <Grid item className={'footer__item right'}>
                            <Instagram className={'footer__social'}/>
                            <Twitter className={'footer__social'}/>
                            <Facebook className={'footer__social'}/>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            </div>
        </footer>
    )
}