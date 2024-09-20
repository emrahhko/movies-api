const findMovie = (movies, id) => {
    return movies.find((movie) => movie.id === id);
};

export default findMovie;
