import { IMovieRepository } from '../../repositories/types/movie.repository.type';
import { IMovie } from '../../types/movie';
export namespace IMovieService {
    export namespace Add {
        export type Params = IMovieRepository.Create.Params;

        export type Response = IMovieRepository.Create.Response;
    }

    export namespace Delete {
        export type Params = IMovieRepository.Delete.Params;

        export interface Response {
            success: boolean;
            message: string;
        }
    }

    export namespace GetById {
        export type Params = IMovieRepository.FindById.Params;

        export interface Response {
            movie: IMovieRepository.FindById.Response | null;
            error?: string;
        }
    }

    export namespace GetAll {
        export type Params = IMovieRepository.FindAll.Params;

        export interface Response {
            total: number;
            data: IMovieRepository.FindAll.Response;
        }
    }

    export namespace Import {
        export interface Params {
            fileBuffer: Buffer;
        }

        export interface Response {
            data: Omit<IMovie, 'actors'>[];
            count: number;
            errors?: string[];
        }
    }






}
