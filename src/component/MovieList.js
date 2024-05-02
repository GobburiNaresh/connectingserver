// MovieList.js
import React from 'react';
import Movie from './Movie';
import './MovieList.css';

const MovieList = (props) => {
    const deleteHandler = (id) => {
        props.onDelete(id);
    };

    return (
        <ul className='movies-list'>
            {props.movies.map((movie) => (
                <Movie
                    key={movie.id}
                    id={movie.id}
                    title={movie.title}
                    releaseDate={movie.releaseDate}
                    openingText={movie.openingText}
                    onDelete={deleteHandler}
                />
            ))}
        </ul>
    );
};

export default MovieList;
