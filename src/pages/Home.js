import MovieCard from "../components/MovieCard";
import { useState, useEffect } from "react";
import "../css/Home.css";
import { searchMovies, getPopularMovies } from "../services/api";   


function Home() {

    const [searchQuery, setSearchQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
     
    
    useEffect(() => {
        const loadPopularMovies = async () => { 
            try{
            const popularMovies = await getPopularMovies();
            setMovies(popularMovies);
            } catch (error) {
                console.error("Error fetching popular movies:", error);
                setError("Failed to load popular movies.");
            } finally {
                setLoading(false);
            }
        }
        loadPopularMovies();
    }, []);
    
    const handleSearch = async (event) => {
        event.preventDefault();
        if(!searchQuery.trim()) return // Prevent search if the input is empty
        if (loading) return; // Prevent search if already loading
        setLoading(true);

        try {
            const searchResults = await searchMovies(searchQuery);
            setMovies(searchResults);
            setError(null); // Clear any previous error
        } catch (error) {
            setError("Failed to load movies.");
            console.error("Error fetching movies:", error);
        }
        finally{
            setLoading(false); 
        }
    }

  return (
    <div className="home">
        <form className="search-form" onSubmit={handleSearch}>
            <input type="text" placeholder="Search for a movie..." className="search-input" value={searchQuery} onChange={e => setSearchQuery(e.target.value)}/>
            <button type="submit" className="serach-button">Search</button>
        </form>

        {error && <div className="error-message">{error}</div>}

        {loading ? (<div className="loading">Loading movies...</div>) : <div className="movies-grid">
        {movies.map((movie) => 
        <MovieCard movie={movie} key={movie.id} />)}
        </div> }
        
      
    </div>
  );
}
export default Home;