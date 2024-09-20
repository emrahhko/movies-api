import findMovie from '../utils/findMovie.js';

let movies = [
    {
        id: '1',
        name: 'Sicario',
        genre: 'Thriller',
        year: 2015
    },
    {
        id: '2',
        name: 'In Bruges',
        genre: 'Comedy drama',
        year: 2008
    },
    {
        id: '3',
        name: 'The Game',
        genre: 'Thriller',
        year: 1997
    },
    {
        id: '4',
        name: 'Rounders',
        genre: 'Thriller',
        year: 1998
    },
    {
        id: '5',
        name: 'Finding Nemo',
        genre: 'Animation',
        year: 2003
    }
];

const movieControllers = {
    getMovies: (req, res) => {
        res.status(200).json(movies);
    },
    getMovie: (req, res) => {
        const { id } = req.params;
        const movieExist = findMovie(movies, id);
        if (movieExist) {
            res.status(200).json(movieExist);
        } else {
            res.status(404).json({ message: 'Movie does not exist' });
        }
    },
    createMovie: (req, res) => {
        const { name, genre, year } = req.body;
        if (!name || !genre || !year) {
            res.status(400).json({
                message: 'please provide name, genre and year'
            });
        } else {
            const newMovie = {
                id: String(movies.length + 1),
                name,
                genre,
                year
            };
            movies.push(newMovie);
            res.status(201).json(newMovie);
        }
    },
    updateMovie: (req, res) => {
        const { id } = req.params;
        const { name, genre, year } = req.body;

        const movieExist = findMovie(movies, id);
        if (movieExist) {
            if (!name || !genre || !year) {
                res.status(400).json({
                    message: 'Please provide name, genre and year'
                });
            } else {
                movieExist.name = name;
                movieExist.genre = genre;
                movieExist.year = year;
                res.status(200).json(movieExist);
            }
        } else {
            res.status(404).json({
                message: `Movie with id: ${id} does not exist`
            });
        }
    },
    deleteMovie: (req, res) => {
        const { id } = req.params;
        const movieExist = findMovie(movies, id);
        if (movieExist) {
            movies = movies.filter((movie) => movie.id !== id);
            res.status(200).json({
                message: `Movie with id ${id} deleted successfully`
            });
        } else {
            res.status(404).json({
                message: `Movie with id: ${id} does not exist`
            });
        }
    }
};

export default movieControllers;
