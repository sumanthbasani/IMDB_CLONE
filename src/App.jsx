// src/App.jsx
import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // Optional: You can create this file for styling

const App = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (query) {
      try {
        const response = await axios.get(`https://www.omdbapi.com/?s=${query}&apikey=b9db2d14`);
        setMovies(response.data.Search || []);
      } catch (error) {
        console.error("Error fetching data from OMDB API", error);
      }
      setQuery('');
    }
  };

  return (
    <div>
      <h1>IMDb Clone</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for movies..."
        />
        <button type="submit">Search</button>
      </form>
      <div>
        {movies && movies.length > 0 ? (
          movies.map((movie) => (
            <div key={movie.imdbID} style={{ margin: '20px', textAlign: 'center' }}>
              <h3>{movie.Title}</h3>
              <p>{movie.Year}</p>
              <img src={movie.Poster} alt={movie.Title} style={{ width: '150px' }} />
            </div>
          ))
        ) : (
          <p>No movies found.</p>
        )}
      </div>
    </div>
  );
};

export default App;