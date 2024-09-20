import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

import express from 'express';
import dotenv from 'dotenv';

// import routes
import movieRoutes from './routes/movie.js';

// import middleware
import createLog from './middleware/createLog.js';

// load environnement variables
dotenv.config();
const PORT = process.env.PORT || 5000;

// construct path
const __filename = fileURLToPath(import.meta.url);
const PATH = dirname(__filename);

// initialize express
const app = express();

// parse request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// use middleware
app.use(createLog);

// use routes
app.use('/api', movieRoutes);

// handle 404
app.use('*', (req, res) => {
    res.status(404).sendFile(path.join(PATH, 'views', '404.html'));
});

// handle error
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('server is broken');
});

// listen the server
app.listen(PORT, () => {
    console.log(`Server running on port: https://localhost:${PORT}`);
});
