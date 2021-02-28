import { Request, Response } from 'express';

import db from '../database/connection';

export default class MoviesController {
    async index(request: Request, response: Response) {
        const filters = request.query;

        const title = filters ? filters.title ? filters.title : '' : '';
        const genre = filters ? filters.genre ? filters.genre : '' : '';
        const release_year = filters ? filters.release_year ? filters.release_year : '' : '';
        const mpaa_rating = filters ? filters.mpaa_rating ? filters.mpaa_rating : '' : '';

        const movies = await db('movies')
            .where('movies.title', 'LIKE', '%' + title + '%')
            .where('movies.genre', 'LIKE', '%' + genre + '%')
            .where('movies.release_year', 'LIKE' , '%' + release_year + '%')
            .where('movies.mpaa_rating', 'LIKE' , '%' + mpaa_rating + '%')
            .select(['movies.*']);

        const users_ratings = await db('users_ratings')
            .select(['users_ratings.*']);
        
        console.log(users_ratings);
        let new_movies = movies.map(movie => {
            const ratings = users_ratings.filter(rating => { return rating.movie_id == movie.id; });
            const value_ratings = ratings.map(rating => {return rating.rating});
            const reducer = (rating: number, currentValue: number) => rating + currentValue;
            const reduce_ratings = value_ratings.reduce(reducer) / value_ratings.length

            movie["ratings"] = reduce_ratings.toFixed(2)

            return movie
        })

        return response.json(new_movies);
    }

    async create(request: Request, response: Response) {
        const {
            title,
            director,
            release_year,
            genre,
            mpaa_rating
        } = request.body;

        const trx = await db.transaction();

        try {
            await trx('movies').insert({
                title,
                director, 
                release_year,
                genre,
                mpaa_rating
            });

            await trx.commit();

            return response.status(201).send();
        } catch (err) {
            await trx.rollback();
            console.error(err);

            return response.status(500).json({
                error: 'Unexpected error while inserting movie'
            });
        }
    }
}