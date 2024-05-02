// Movie.js
import React from 'react';
import './Movie.css';

const Movie = (props) => {
    const deleteHandler = () => {
        props.onDelete(props.id);
    };

    return (
        <li className='movie'>
            <h2>{props.title}</h2>
            <h2>{props.releaseDate}</h2>
            <p>{props.openingText}</p>
            <button onClick={deleteHandler}>Delete</button>
        </li>
    );
};

export default Movie;
