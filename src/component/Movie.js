import React from 'react';

import './Movie.css';

const Movie = (props) => {
    return(
        <li className='movie'>
            <h2>{props.title}</h2>
            <h2>{props.releaseDate}</h2>
            <h2>{props.openingText}</h2>
        </li>
    )

}

export default Movie;