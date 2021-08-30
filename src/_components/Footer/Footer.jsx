import React from 'react';
import { Container } from '../../_components';
import config from 'config';

export class Footer extends React.Component {
    render() {
        return (
            <footer>
                <Container>

                    <div className="d-flex gap-5">
                        <div >
                            <p><b>Контакты</b></p>
                            <div>
                                <p className="m-0"><strong>Адрес:</strong> Подольский район, д. Сергеевка, д.1А</p>
                                <p className="m-0"><strong>Телефоны:</strong>(495) 996-78-41; 996-78-42; 996-56-92</p>
                                <p className="m-0"><strong>E-mail:</strong> <a href="mailto:zrsasd@gmail.com" className="text-light">zrsasd@gmail.com</a></p>
                            </div>
                        </div>
                        <div className="social-plane">
                            <a href="/">
                                <img src={`${config.url}/assets/icons/youtube.png`} />
                            </a>
                            <a href="/">
                                <img src={`${config.url}/assets/icons/vk.png`} />
                            </a>
                            <a href="/">
                                <img src={`${config.url}/assets/icons/facebook.png`} />
                            </a>
                            <a href="/">
                                <img src={`${config.url}/assets/icons/instagram.png`} />
                            </a>
                        </div>
                    </div>
                </Container>
            </footer>
        )
    }
}
