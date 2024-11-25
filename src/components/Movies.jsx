export function ListOfMovies({ movies }) {
  return (
    <ul className="movies">
      {movies.map(movie => (
        <li className="movie" key={movie.id}>
          <h3>{movie.title}</h3>
          <p>{movie.year}</p>
          <img src={movie.poster} alt={movie.title} />
          <img className="blurred-img" src={movie.poster} alt={movie.title} />
        </li>
      ))}
    </ul>
  )
}

export function NoMovieResults() {
  return <p>No se han encontrado películas</p>
}

export function Movies({ movies }) {
  const hasMovies = movies?.length > 0

  return hasMovies ? (
    <ListOfMovies movies={movies} />
  ) : (
    <p>No se han encontrado películas...</p>
  )
}
