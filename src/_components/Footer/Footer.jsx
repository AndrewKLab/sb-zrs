import React from 'react';
import { Container, Grid, Typography } from '../../_components';
import config from 'config';

export class Footer extends React.Component {
    render() {
        return (
            <footer>
                <Container>
                    <Grid container>
                        <Grid item md={12} sm={12}>
                            <div className="d-flex gap-5">
                                <div >
                                    <p><b>Контакты</b></p>
                                    <div>
                                        <p className="m-0"><strong>Адрес: </strong>г. Тула, ул. Станиславского, д. 48</p>
                                        <p className="m-0"><strong>Горячая линия: </strong><a href="tel:8(800)1001844" className="text-link">8 (800) 100 18 44</a></p>
                                        <p className="m-0"><strong>E-mail: </strong> <a href="mailto:contact@kniga-knig.info" className="text-link">contact@kniga-knig.info</a></p>
                                    </div>
                                </div>
                                <div className="social-plane">
                                    <a href="/">
                                        <img src={`${config.url}/assets/icons/youtube.png`} />
                                    </a>
                                    <a href="/">
                                        <img src={`${config.url}/assets/icons/vk.png`} />
                                    </a>
                                    {/* <a href="/">
                                <img src={`${config.url}/assets/icons/facebook.png`} />
                            </a>
                            <a href="/">
                                <img src={`${config.url}/assets/icons/instagram.png`} />
                            </a> */}
                                </div>
                            </div>
                        </Grid>
                        <Grid item md={12} sm={12}>
                            <div className='text-center'>© РТЦ «Голос надежды» 2022</div>
                        </Grid>
                    </Grid>
                </Container>
            </footer>
        )
    }
}
