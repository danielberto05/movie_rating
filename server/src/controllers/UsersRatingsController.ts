import { Request, Response } from 'express';

import db from '../database/connection';

export default class MoviesController {
    async index(request: Request, response: Response) {
        const filters = request.query;

        const movie_id = filters ? filters.movie_id ? filters.movie_id : '' : '';

        const users_ratings = await db('users_ratings')
            .where('users_ratings.movie_id', '=', Number(movie_id))
            .select(['users_ratings.*']);

        return response.json(users_ratings);
    }

    async create(request: Request, response: Response) {
        const {
            rating,
            movie_id
        } = request.body;

        const trx = await db.transaction();

        try {
            await trx('users_ratings').insert({
                rating,
                movie_id
            });

            await trx.commit();

            return response.status(201).send();
        } catch (err) {
            await trx.rollback();
            console.error(err);

            return response.status(500).json({
                error: 'Unexpected error while inserting rating'
            });
        }
    }
}