import { Op } from 'sequelize';

import { IMovieRepository } from './types';
import { Movie, Actor } from '../models';

export default class MovieRepository {
    static async create(movieData: IMovieRepository.Create.Params): Promise<IMovieRepository.Create.Response> {
        const { actors, ...movieFields } = movieData;

        const movie = await Movie.create(movieFields);

        const actorInstances = [];
        for (const actorData of actors) {
            const [actor] = await Actor.findOrCreate({
                where: { name: actorData },
                defaults: { name: actorData }
            });
            actorInstances.push(actor);
        }

        await movie.$add('actors', actorInstances);

        return {
            ...movie.toJSON(),
            actors: actorInstances
        }

    }

    static async findById(params: IMovieRepository.FindById.Params): Promise<IMovieRepository.FindById.Response | null> {
        const movie = await Movie.findByPk(params.id, {
            include: [{
                model: Actor,
                through: { attributes: [] }
            }]
        });

        if (movie) {
            return movie.toJSON();
        }
        return null;
    }

    static async findAll(filters: IMovieRepository.FindAll.Params): Promise<IMovieRepository.FindAll.Response> {
        const { where, include } = this.buildQueryOptions(filters);

        const options: any = {
            where,
            include
        };

        if (filters?.sort) {
            const order = filters.order?.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
            options.order = [[filters.sort, order]];
        }

        if (filters?.limit) {
            options.limit = Number(filters.limit);
            if (filters?.offset) {
                options.offset = Number(filters.offset);
            }
        }

        const movies = await Movie.findAll(options);
        return movies.map(movie => movie.toJSON());
    }

    static async count(params: IMovieRepository.Count.Params): Promise<IMovieRepository.Count.Response> {
        const { where, include } = this.buildQueryOptions(params);

        const options: any = {
            where,
            include,
            distinct: true
        };

        const result = await Movie.count(options);
        return typeof result === 'number' ? result : (result.length || 0);
    }


    static async delete(params: IMovieRepository.Delete.Params): Promise<IMovieRepository.Delete.Response> {
        const deleted = await Movie.destroy({
            where: { id: params.id },
            cascade: true
        });
        return deleted > 0;
    }

    private static buildQueryOptions(params: IMovieRepository.FindAll.Params | IMovieRepository.Count.Params) {
        const where: any = {};
        const include: any[] = [];

        const actorInclude: any = {
            model: Actor,
            through: { attributes: [] }
        };

        if (params?.search) {
            const searchValue = `%${params.search}%`;

            where[Op.or] = [
                { title: { [Op.like]: searchValue } },
                { '$actors.name$': { [Op.like]: searchValue } }
            ];

        } else {
            if (params?.title) {
                where.title = params.title;
            }

            if (params?.actor) {
                actorInclude.where = { name: params.actor };
            }
        }

        include.push(actorInclude);

        return { where, include };
    }

} 