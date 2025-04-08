import { IMovie } from '../../types';

export namespace IMovieRepository {
    export namespace Create {
        export interface Params {
            title: string;
            year: number;
            format: string;
            actors: string[];
        }

        export type Response = IMovie;
    }

    export namespace FindById {
        export interface Params {
            id: number;
        }

        export type Response = IMovie;
    }

    export namespace FindAll {
        export interface Params {
            title?: string;
            actor?: string;
            search?: string;
            sort?: string;
            order?: string;
            limit?: number;
            offset?: number;
        }

        export type Response = IMovie[];
    }

    export namespace Delete {
        export interface Params {
            id: number;
        }

        export type Response = boolean;
    }

    export namespace Count {
        export type Params = FindAll.Params;
        export type Response = number;
    }

    export namespace Import {
        export type Params = FindAll.Params;
        export type Response = number;
    }


}