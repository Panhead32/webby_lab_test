import { Table, Column, Model, DataType, BelongsToMany } from 'sequelize-typescript'
import type { IMovie } from '../types/movie'
import Actor from './actor.model'

@Table({
    tableName: 'movies',
    timestamps: true
})
export default class Movie extends Model implements IMovie {
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
    title: string

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    year: number

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    format: string

    @BelongsToMany(() => Actor, {
        through: 'movie_actors',
        foreignKey: 'movieId',
        otherKey: 'actorId',
    })
    actors: Actor[]
}
