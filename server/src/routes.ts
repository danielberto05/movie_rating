import express from 'express';
import MoviesController from './controllers/MoviesController';
import UsersRatingsController from './controllers/UsersRatingsController';

const routes = express.Router();
const moviesController = new MoviesController();
const userRatingController = new UsersRatingsController();

routes.get('/', (request, response) => {
    return response.json({ message: "Server\'s up"})
})

routes.get('/movies', moviesController.index);
routes.post('/movies', moviesController.create);

routes.get('/rating', userRatingController.index);
routes.post('/rating', userRatingController.create);

export default routes;
