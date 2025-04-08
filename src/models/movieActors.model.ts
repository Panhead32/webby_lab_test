import { Table, Column, Model, DataType, ForeignKey, Unique } from 'sequelize-typescript'
import Movie from './movie.model'
import Actor from './actor.model'


@Table({
    tableName: 'movie_actors',
    timestamps: true
})
export default class MovieActors extends Model {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number

    @ForeignKey(() => Movie)
    @Column({
        type: DataType.INTEGER,
    })
    movieId: number

    @ForeignKey(() => Actor)
    @Column({
        type: DataType.INTEGER,
    })
    actorId: number

}
