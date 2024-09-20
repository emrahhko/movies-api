import express from 'express';
import movieControllers from '../controllers/movie.js';

const router = express.Router();

const { getMovies, getMovie, createMovie, updateMovie, deleteMovie } =
    movieControllers;

// Routes
router.get('/', getMovies);
router.get('/:id', getMovie);
router.post('/', createMovie);
router.put('/:id', updateMovie);
router.delete('/:id', deleteMovie);

export default router;
