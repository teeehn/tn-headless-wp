import React from 'react';

import './main-header.scss';

export const MainHeader = props => {

    const {
        description,
        name
    } = props;

    return (
        <header className="main__header">
            <h1>{name}</h1>
            <h2>{description}</h2>
        </header>
    );
}
