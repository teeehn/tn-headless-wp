import React from 'react';

export const MainHeader = props => {

    const {
        description,
        name
    } = props;

    return (
        <header>
            <h1>{name}</h1>
            <h2>{description}</h2>
        </header>
    );
}
