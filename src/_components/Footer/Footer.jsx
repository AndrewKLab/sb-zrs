import React from 'react';
import { Container } from '../../_components';

export class Footer extends React.Component {
    render() {
        return (
            <footer>
                <Container>
                    <div className="row">
                        <div className="col-md-4">
                            <p><b>Контакты</b></p>
                            <div>
                                <p className="m-0"><strong>Адрес:</strong> Подольский район, д. Сергеевка, д.1А</p>
                                <p className="m-0"><strong>Телефоны:</strong>(495) 996-78-41; 996-78-42; 996-56-92</p>
                                <p className="m-0"><strong>E-mail:</strong> <a href="mailto:zrsasd@gmail.com" class="text-light">zrsasd@gmail.com</a></p>
                            </div>
                        </div>
                    </div>
                </Container>
            </footer>
        )
    }
}
