// App.js
import './App.css';
import MovieList from './component/MovieList';
import React, { useState, useEffect, useCallback } from 'react';
import AddMovie from './component/AddMovie';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMovieHandler = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch('https://react-fetchmovies-1b76d-default-rtdb.firebaseio.com/Movies.json');
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const data = await response.json();
      const loadedMovies = [];

      for (const key in data) {
        loadedMovies.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate
        });
      }
      setMovies(loadedMovies);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMovieHandler();
  }, [fetchMovieHandler]);

  async function addMovieHandler(movie) {
    const response = await fetch('https://react-fetchmovies-1b76d-default-rtdb.firebaseio.com/Movies.json', {
      method: 'POST',
      body: JSON.stringify(movie),
      headers: {
        'Content-type': 'Application/json'
      }
    });
    const data = await response.json();
    console.log(data);
    fetchMovieHandler(); // Fetch movies again after adding a new one
  }

  const deleteMovieHandler = async (id) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://react-fetchmovies-1b76d-default-rtdb.firebaseio.com/Movies/${id}.json`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Something went wrong');
      }
      setMovies((prevMovies) => prevMovies.filter((movie) => movie.id !== id));
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  };

  let content = <p>No movies found</p>;
  if (movies.length > 0) {
    content = <MovieList movies={movies} onDelete={deleteMovieHandler} />;
  }
  if (isLoading) {
    content = <p>Loading...</p>;
  }
  if (error) {
    content = <p>{error}</p>;
  }

  return (
    <>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </>
  );
}

export default App;
