import { MovieRepository } from '../repositories';
import { IMovie } from '../types/movie';
import { IMovieService } from './types';
import { IMovieRepository } from '../repositories/types';
import { parseMovieBlock } from '../utils/movie.utils';

export class MovieService {


    static async addMovie(movieData: IMovieService.Add.Params): Promise<IMovieService.Add.Response> {
        return MovieRepository.create(movieData);
    }

    static async deleteMovie(params: IMovieService.Delete.Params): Promise<IMovieService.Delete.Response> {
        const deleted = await MovieRepository.delete(params);

        if (!deleted) {
            return {
                success: false,
                message: 'Movie not found'
            }
        }

        return {
            success: true,
            message: 'Movie deleted successfully'
        }

    }

    static async getMovieById(params: IMovieService.GetById.Params): Promise<IMovieService.GetById.Response> {
        const movie = await MovieRepository.findById(params);

        if (!movie) {
            throw new Error('Movie not found');
        }

        return { movie };
    }

    static async getMovies(params: IMovieService.GetAll.Params): Promise<IMovieService.GetAll.Response> {
        const data = await MovieRepository.findAll(params);
        const total = await MovieRepository.count(params);
        return { total, data }
    }

    static async importMovies(params: IMovieService.Import.Params): Promise<IMovieService.Import.Response> {
        try {
            const content = params.fileBuffer.toString('utf8');

            const movieBlocks = content.split(/\n\s*\n/);
            const movies: IMovieRepository.Create.Params[] = [];
            const errors: string[] = [];

            movieBlocks.forEach((block, index) => {
                try {
                    const movie = parseMovieBlock(block.trim());
                    if (movie) {
                        movies.push(movie);
                    }
                } catch (error) {
                    errors.push(`Error parsing movie at block ${index + 1}: ${error.message}`);
                }
            });



            const createdMovies: Omit<IMovie, 'actors'>[] = [];

            for (const movie of movies) {
                const { actors, ...createdMovie } = await MovieRepository.create(movie);
                createdMovies.push(createdMovie);
            }


            return {
                data: createdMovies,
                count: movies.length,
                errors
            };
        } catch (error) {
            throw new Error(`Failed to import movies: ${error.message}`);
        }
    }

} 