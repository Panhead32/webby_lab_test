import { Table, Column, Model, DataType } from 'sequelize-typescript'
import type { IUser } from '../types/user'

@Table({
    tableName: 'users',
    timestamps: true,
})
export default class User extends Model implements IUser {
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
    email: string

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    password: string

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name: string
}