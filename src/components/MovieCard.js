import "../css/MovieCard.css";
import { imageURL } from "../services/api";
import { useMovieContext } from "../context/MovieContext";

function MovieCard({movie}){

    const { addToFavorites, removeFromFavorites, isFavorite } = useMovieContext(); 
    const favorite = isFavorite(movie.id);
    const onFavoriteClick = (e) => {
        e.preventDefault();
        if (favorite) {
            removeFromFavorites(movie.id);
        } else {
            addToFavorites(movie);
        }
    };


    // function onFavouriteClick(e) {
    // alert("This feature is not implemented yet.");
    // }

    return (
        <div className="movie-card">
            <div className="movie-poster">
                <img src={`${imageURL}${movie.poster_path}`} alt={movie.title} />
                <div className="movie-overlay">
                <button className={`favorite-btn ${favorite ? "active" : ""}`} onClick={onFavoriteClick}>♡</button>
                </div>
            </div>
            <div className="movie-info">
                <h3>{movie.title}</h3>
                <p>{movie.release_date.split('-')[0]}</p>
            </div>
        </div>
    );
}

export default MovieCard;