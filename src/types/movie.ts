import { IActor } from './actor';

export interface IMovie {
    id: number;
    title: string;
    year: number;
    format: string;
    actors: IActor[];
    createdAt?: Date;
    updatedAt?: Date;
}
