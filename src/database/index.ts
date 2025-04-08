import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
import path from 'path';

class MyDB {
    private static instance: MyDB;
    private sequelize: Sequelize;

    private constructor(config: SequelizeOptions = {
        models: [path.join(__dirname, '../models/*.model.{ts,js}')],
        dialect: 'sqlite',
        storage: './data/database.sqlite',
        logging: console.log,
    }) {
        this.sequelize = new Sequelize(config);
    }

    public static getInstance(config?: SequelizeOptions): MyDB {
        if (!MyDB.instance) {
            MyDB.instance = new MyDB(config);
        }
        return MyDB.instance;
    }

    public getSequelize(): Sequelize {
        return this.sequelize;
    }

    public async initialize(): Promise<void> {
        try {
            await this.sequelize.authenticate();
            console.log('Database connection has been established successfully.');
            await this.sequelize.sync({ alter: true, force: true });
            console.log('Database tables have been created successfully.');
        } catch (error) {
            console.error('Unable to connect to the database:', error);
            throw error;
        }
    }
}

export const Database = MyDB.getInstance;
export default MyDB.getInstance();
