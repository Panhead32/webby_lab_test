import { Table, Column, Model, DataType, BelongsToMany } from 'sequelize-typescript'
import Movie from './movie.model';
import { IActor } from '../types/actor';

@Table({
    tableName: 'actors',
    timestamps: true
})
export default class Actor extends Model implements IActor {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name: string

    @BelongsToMany(() => Movie, {
        through: 'movie_actors',
        foreignKey: 'actorId',
        otherKey: 'movieId',
    })
    movies: Movie[]
}
