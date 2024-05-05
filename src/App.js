import { useEffect } from "react";
import "./assets/App.css";
import SearchIcon from "./assets/search.svg";
import MovieCard from "./MovieCard";
import { useState } from "react";

const API_URL = 'http://www.omdbapi.com?apikey=edf87b2a';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    setMovies(data.Search);
  };

  useEffect(() => {
    searchMovies("avengers");
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      searchMovies(searchTerm);
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`app ${isDarkMode ? 'light' : 'dark'}`}>
      <h1 aria-label="MovieLand" tabIndex={0}>
      Movie Nexus
      </h1>

      <div aria-label="search for movies" tabIndex={0} className="search">
        <input
          placeholder="Search for a movie..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        <img
          aria-label="click to search for movies"
          tabIndex={0}
          src={SearchIcon}
          alt="search-icon"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>

      <div className="toggle-container">
          <span>  </span>
        <label className="switch">
          <input type="checkbox" onChange={toggleDarkMode} />
          <span className="slider round"></span>
        </label>
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
};

export default App;
