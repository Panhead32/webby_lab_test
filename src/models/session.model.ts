import { Table, Column, Model, DataType, ForeignKey } from 'sequelize-typescript';
import User from './user.model';

@Table({
    tableName: 'sessions',
    timestamps: true,
})
export default class Session extends Model {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    userId: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    token: string;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    })
    isActive: boolean;

    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    expiresAt: Date;
} 