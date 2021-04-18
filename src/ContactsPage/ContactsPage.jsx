import React from 'react';

export class ContactsPage extends React.Component {
    render() {
        return (
            <div className="pb-3">
                <div className="row">
                    <div className="col-md-4">
                        <h1>Контакты</h1>
                        <div>
                            <p className="m-0"><strong>Адрес:</strong> Подольский район, д. Сергеевка, д.1А</p>
                            <p className="m-0"><strong>Телефоны:</strong>(495) 996-78-41; 996-78-42; 996-56-92</p>
                            <p className="m-0"><strong>E-mail:</strong> <a href="mailto:zrsasd@gmail.com">zrsasd@gmail.com</a></p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
